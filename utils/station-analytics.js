"use strict";

const conversions = require("../utils/conversions.js");
const logger = require("./logger.js");

const stationAnalytics = {
  getShortestReading(station) {
    // Algorithm for the shortest reading
    let shortestReading = null;
    if (station.readings.length > 0) {
      shortestReading = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].duration < shortestReading.duration) {
          shortestReading = station.readings[i];
        }
      }
    }
    return shortestReading;
  },

  getLatestWeather(station) {
    let latestWeather;
    let latestReading;

    if (station.readings) {
      latestReading = station.readings[0];

      if (station.readings.length > 1) {
        latestReading = station.readings[station.readings.length - 1];
      }
      logger.info("Latest Reading is " + latestReading);
      logger.debug("Latest Reading code is " + latestReading.code);

      if (!latestReading.code) {
        latestWeather = "";
      } else {
        latestWeather = conversions.convertCodeToWeather(latestReading.code);
      }
      logger.info("Latest Weather is " + latestWeather);
    }
    return latestWeather;
  },

  getLatestTemperature(station) {
    let latestTemperature;
    let latestReading;

    if (station.readings) {
      latestReading = station.readings[0];

      if (station.readings.length > 1) {
        latestReading = station.readings[station.readings.length - 1];
      }
      logger.debug("Latest Temperature is " + latestReading.temperature);

      if (latestReading.temperature) {
        latestTemperature = latestReading.temperature;
      }
      return latestTemperature;
    }
  },

  getLatestWindSpeed(station) {
    let latestWindSpeed;
    let latestReading;

    if (station.readings) {
      latestReading = station.readings[0];

      if (station.readings.length > 1) {
        latestReading = station.readings[station.readings.length - 1];
      }
      logger.debug("Latest WindSpeed is " + latestReading.windSpeed);

      if (latestReading.windSpeed) {
        latestWindSpeed = latestReading.windSpeed;
      }
      return latestWindSpeed;
    }
  },

  getLatestPressure(station) {
    let latestPressure;
    let latestReading;

    if (station.readings) {
      latestReading = station.readings[0];

      if (station.readings.length > 1) {
        latestReading = station.readings[station.readings.length - 1];
      }
      logger.debug("Latest Pressure is " + latestReading.pressure);

      if (latestReading.pressure) {
        latestPressure = latestReading.pressure;
      }
      return latestPressure;
    }
  },

  getStationDuration(station) {
    let stationDuration = 0;
    for (let i = 0; i < station.readings.length; i++) {
      let reading = station.readings[i];
      stationDuration = stationDuration + reading.duration;
    }
    return stationDuration;
  },
};

module.exports = stationAnalytics;
