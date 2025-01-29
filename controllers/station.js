"use strict";

const logger = require("../utils/logger.js");
const stationAnalytics = require("../utils/station-analytics.js");
const conversions = require("../utils/conversions.js");
const stationsStore = require("../models/station-store.js");
const axios = require("axios");
const uuid = require("uuid");
const { report } = require("../routes.js");
const { getLatestWindDirection, getMaxWindSpeed } = require("../utils/station-analytics.js");
const { roundNearest100 } = require("../utils/conversions.js");
const { processConversions } = require("../utils/conversions");
const { processAnalytics, processTrendAnalytics } = require("../utils/station-analytics");

const station = {
  /*
    Station Index
    - Performs calculations for latestWeather data
    - Processes conversions and analytics
  */
  index(request, response) {
    let latestWeather;
    let latestWeatherIcon;
    let latestTemperature;
    let latestWindSpeed;
    let latestPressure;
    let latestWindDirection;

    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);

    // if there are readings, then there are values for station summary
    if (station.readings.length > 0) {
      latestWeather = stationAnalytics.getLatestWeather(station);
      latestWeatherIcon = conversions.setLatestWeatherIcon(latestWeather);
      latestTemperature = stationAnalytics.getLatestTemperature(station);
      latestWindSpeed = stationAnalytics.getLatestWindSpeed(station);
      latestPressure = stationAnalytics.getLatestPressure(station);
      latestWindDirection = stationAnalytics.getLatestWindDirection(station);
    }

    // Process conversions, Analytivs and Trends for station
    processConversions(station);
    processAnalytics(station);
    processTrendAnalytics(station);

    const viewData = {
      name: station.name,
      station: stationsStore.getStation(stationId),
      latitude: station.lat,
      longitude: station.lon,
      stationSummary: {
        // Latest Station Values
        latestWeather: latestWeather,
        latestWeatherIcon: latestWeatherIcon,
        latestTemperature: latestTemperature,
        latestPressure: latestPressure,
      },
    };

    logger.info(`Render station: ${station.name}, ID: ${stationId}`);
    response.render("station", viewData);
  },

  /*
    Edit Station
  */
  editStation(request, response) {
    const stationId = request.params.id;
    const viewData = {
      title: "Edit Station",
      station: stationsStore.getStation(stationId),
    };

    logger.info(`Edit station process for station: ${station.name}, ID: ${stationId}`);
    response.render("editstation", viewData);
  },

  /*
    Update Station
  */
  updateStation(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const updatedStation = {
      name: request.body.name,
      lat: request.body.latitude,
      lon: request.body.longitude
    };

    logger.info(`Updating station: ${station.name}, ${stationId}`);
    stationsStore.updateStation(station, updatedStation);
    response.redirect("/station/" + stationId);
  },

  /*
    Delete Reading
    - Takes StationID and ReadingID as arguments
  */
  deleteReading(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const readingId = request.params.readingid;
    logger.info(`Deleting reading - reading ID: '${readingId}' from station: ${station.name}, ID: ${stationId} `);
    stationsStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  /*
    Add Reading Manually
    - Gets Data from add reading form
    - Makes API Call to add report labels & trends to trend graph
  */
  async addreading(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    logger.info(`Adding new reading to station: ${station.name}, ID: ${stationId}`);
    const date = new Date();
    const formattedDate = `${date.toLocaleString("en-GB")}`;

    // API Call
    let report = {};
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${station.lat}&lon=${station.lon}&units=metric&appid=3e4f8f021b82edfd153011f778cd9a72`;

    try {
      const result = await axios.get(requestUrl);

      if (result.status == 200) {
        const reading = result.data.current;

        let code;
        code = reading.weather[0].id;
        report.code = roundNearest100(code);
        report.date = formattedDate;
        report.id = uuid.v1();
        report.temperature = reading.temp;
        report.windSpeed = reading.wind_speed;
        report.pressure = reading.pressure;
        report.windDirection = reading.wind_deg;
        report.tempTrend = [];
        report.trendLabels = [];

        const trends = result.data.daily;
        for (let i = 0; i < trends.length; i++) {
          report.tempTrend.push(trends[i].temp.day);
          const date = new Date(trends[i].dt * 1000);
          report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
        }
      }
    } catch {
      // if API call fails, set labels and trends to empty array
      console.log(report);
      report.tempTrend = [];
      report.trendLabels = [];
    }

    // New Reading Data
    const newReading = {
      id: uuid.v1(),
      date: report.date,
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      tempTrend: report.tempTrend,
      trendLabels: report.trendLabels,
    };

    stationsStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  /*
    Add Reading Automatically
    - Obtain station ID and lat/lon values
    - Request API for location data, then adds to readings
  */
  async addAutoReading(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    logger.info(`Adding auto reading to station: ${station.name}, ${stationId}`);
    const date = new Date();
    const formattedDate = `${date.toLocaleString("en-GB")}`;

    let report = {};
    const requestUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${station.lat}&lon=${station.lon}&units=metric&appid=3e4f8f021b82edfd153011f778cd9a72`;

    try {
      const result = await axios.get(requestUrl);

      if (result.status == 200) {
       //  logger.info("API call successful");
        const reading = result.data.current;

        let code;
        code = reading.weather[0].id;
        report.code = roundNearest100(code);
        report.date = formattedDate;
        report.id = uuid.v1();
        report.temperature = reading.temp;
        report.windSpeed = reading.wind_speed;
        report.pressure = reading.pressure;
        report.windDirection = reading.wind_deg;
        report.tempTrend = [];
        report.trendLabels = [];

        const trends = result.data.daily;
        for (let i = 0; i < trends.length; i++) {
          report.tempTrend.push(trends[i].temp.day);
          const date = new Date(trends[i].dt * 1000);
          report.trendLabels.push(`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`);
        }

        stationsStore.addReading(stationId, report);
      }
    } catch {
      // if API call fails, set labels and trends to empty array
      logger.info("API call failed",  response ? response.data : response.message);
      report.tempTrend = [];
      report.trendLabels = [];
    }

    // logger.info("New Reading = ", report);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
