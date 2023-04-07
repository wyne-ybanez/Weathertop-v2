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
    logger.debug("Station Id = ", stationId);

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
      longitude: station.lng,
      stationSummary: {
        // Latest Station Values
        latestWeather: latestWeather,
        latestWeatherIcon: latestWeatherIcon,
        latestTemperature: latestTemperature,
        latestPressure: latestPressure,
      },
    };
    response.render("station", viewData);
  },

  /*
    Edit Station
    - Rename station
  */
  editStation(request, response) {
    const stationId = request.params.id;
    const viewData = {
      title: "Edit Station",
      station: stationsStore.getStation(stationId),
    };
    response.render("editstation", viewData);
  },

  /*
    Update Station
    - Rename station
  */
  updateStation(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const updatedStation = {
      name: request.body.name,
    };

    stationsStore.updateStation(station, updatedStation);
    response.redirect("/station/" + stationId);
  },

  /*
    Delete Reading
    - Takes StationID and ReadingID as arguments
  */
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationsStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  /*
    Add Reading Manually
    - Gets Data from add reading form
    - Makes API Call to add report labels & trends to trend graph
  */
  async addreading(request, response) {
    logger.info("rendering new reading");
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const date = new Date();

    // API Call
    let report = {};
    const lat = station.lat;
    const lng = station.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=3e4f8f021b82edfd153011f778cd9a72
    `;
    try {
      const result = await axios.get(requestUrl);

      if (result.status == 200) {
        const reading = result.data.current;

        let code;
        code = reading.weather[0].id;
        report.code = roundNearest100(code);
        report.date = date.toISOString().replace("T", " ").replace("Z", "");
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
      date: date.toISOString().replace("T", " ").replace("Z", ""),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
      tempTrend: report.tempTrend,
      trendLabels: report.trendLabels,
    };

    stationsStore.addReading(stationId, newReading);
    logger.debug("New Reading = ", newReading);
    response.redirect("/station/" + stationId);
  },

  /*
    Add Reading Automatically
    - Obtain station ID and lat/lng values
    - Request API for location data, then adds to readings
  */
  async addAutoReading(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const date = new Date();

    let report = {};
    const lat = station.lat;
    const lng = station.lng;
    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=3e4f8f021b82edfd153011f778cd9a72
    `;
    try {
      const result = await axios.get(requestUrl);

      if (result.status == 200) {
        const reading = result.data.current;

        let code;
        code = reading.weather[0].id;
        report.code = roundNearest100(code);
        report.date = date.toISOString().replace("T", " ").replace("Z", "");
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

    stationsStore.addReading(stationId, report);
    logger.debug("New Reading = ", report);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
