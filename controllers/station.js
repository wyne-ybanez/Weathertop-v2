"use strict";

const logger = require("../utils/logger.js");
const stationAnalytics = require("../utils/station-analytics.js");
const conversions = require("../utils/conversions.js");
const stationsStore = require("../models/station-store.js");
const axios = require("axios");
const uuid = require("uuid");
const { report } = require("../routes.js");
const { getLatestWindDirection, getMaxWindSpeed } = require("../utils/station-analytics.js");

const station = {
  // Station Index
  index(request, response) {
    let latestWeather;
    let latestWeatherIcon;
    let latestTemperature;
    let latestWindSpeed;
    let latestPressure;
    let latestWindDirection;

    let windChill;
    let windCompass;
    let fahrenheitValue;
    let BeaufortValue;

    let minTemperature;
    let maxTemperature;
    let minWindSpeed;
    let maxWindSpeed;
    let minPressure;
    let maxPressure;

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

      // Converted Values
      windChill = conversions.windChillCalculator(latestWindSpeed, latestTemperature);
      windCompass = conversions.convertToCompassDirection(latestWindDirection);
      fahrenheitValue = conversions.convertToFahrenheit(latestTemperature);
      BeaufortValue = conversions.convertToBeaufort(latestWindSpeed);

      // Min Max values
      minTemperature = stationAnalytics.getMinTemperature(station.readings);
      maxTemperature = stationAnalytics.getMaxTemperature(station.readings);
      minWindSpeed = stationAnalytics.getMinWindSpeed(station.readings);
      maxWindSpeed = stationAnalytics.getMaxWindSpeed(station.readings);
      minPressure = stationAnalytics.getMinPressure(station.readings);
      maxPressure = stationAnalytics.getMaxPressure(station.readings);
    }

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

        // Converted Values
        windChill: windChill,
        windCompass: windCompass,
        fahrenheitValue: fahrenheitValue,
        BeaufortValue: BeaufortValue,

        // Min Max values
        minTemperature: minTemperature,
        maxTemperature: maxTemperature,
        minWindSpeed: minWindSpeed,
        maxWindSpeed: maxWindSpeed,
        minPressure: minPressure,
        maxPressure: maxPressure,
      },
    };
    response.render("station", viewData);
  },

  // Delete Reading
  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationsStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  // addReading(request, response) {
  //   const stationId = request.params.id;
  //   const station = stationsStore.getStation(stationId);
  //   logger.debug("New Reading = ", newReading);
  //   stationsStore.addReading(stationId, newReading);
  //   response.redirect("/station/" + stationId);
  // },

  /* 
    Add Reading
    Obtain station ID and lat/lng values
    Request API data for location.
  */
  addreading(request, response) {
    logger.info("rendering new reading");
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);

    const newReading = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure),
    };
    stationsStore.addReading(stationId, newReading);
    logger.debug("New Reading = ", newReading);
    response.redirect("/station/" + stationId);

    // THIS IS NOT YET REQUIRED FOR BASELINE => EDIT
    //     let report = {};
    //     const lat = station.lat;
    //     const lng = station.lng;
    //     const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=3e4f8f021b82edfd153011f778cd9a72
    // `;
    //     const result = await axios.get(requestUrl);
    //     if (result.status == 200) {
    //       const reading = result.data.current;
    //       report.code = reading.weather[0].id;
    //       report.temperature = reading.temp;
    //       report.windSpeed = reading.wind_speed;
    //       report.pressure = reading.pressure;
    //       // report.windDirection = reading.wind_deg;
    //     }
    //     console.log(report);
  },
};

module.exports = station;
