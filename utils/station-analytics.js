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
      logger.info("Latest Reading code is " + latestReading.code);

      if (!latestReading.code) {
        latestWeather = "";
      } else {
        latestWeather = conversions.convertCodeToWeather(latestReading.code);
      }
      logger.info("Latest Weather is " + latestWeather);
    }
    return latestWeather;
  },

  setLatestWeatherIcon() {
    let icon;
    let latestReading = station.readings[0];
    let latestWeatherIcon = document.getElementById("latestWeather");

    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];
    }

    if (latestReading.code) {
      if (latestReading.code == 100) {
        icon = "cloud rainbow icon";
      }
      if (latestReading.code == 200) {
        icon = "cloud sun icon";
      }
      if (latestReading.code == 300) {
        icon = "cloud icon";
      }
      if (latestReading.code == 400) {
        icon = "cloud sun rain icon";
      }
      if (latestReading.code == 500) {
        icon = "cloud showers heavy icon";
      }
      if (latestReading.code == 600) {
        icon = "cloud rain icon";
      }
      if (latestReading.code == 700) {
        icon = "snowflake icon";
      }
      if (latestReading.code == 800) {
        icon = "poo storm icon";
      }
      latestWeatherIcon.classList.add(icon);
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
