"use strict";

const logger = require("./logger.js");

const conversions = {
  // Convert Code to weather
  convertCodeToWeather(weatherCode) {
    let weather = "";
    while (weatherCode != 0) {
      switch (weatherCode) {
        case 100:
          weather = "Clear";
          break;
        case 200:
          weather = "Partial clouds";
          break;
        case 300:
          weather = "Cloudy";
          break;
        case 400:
          weather = "Light Showers";
          break;
        case 500:
          weather = "Heavy Showers";
          break;
        case 600:
          weather = "Rain";
          break;
        case 700:
          weather = "Snow";
          break;
        case 800:
          weather = "Thunder";
          break;
        default:
          console.log("Invalid code input.");
          logger.debug("Invalid code input");
          break;
      }
      return weather;
    }
    return weather;
  },

  processConversions(station) {
    // Initiate latestReadings
    let latestReading;

    if (station.readings.length > 0) {
      // Get the latest reading
      latestReading = station.readings.slice(-1);

      // Station Conversions
      station.latestWeather = convertCodeToWeather(latestReading.code);
      console.log(station.latestWeather);
      //   station.temperature = latestReading.temperature;
      //   station.wind = convertToBeaufort(latestReading.windSpeed);
      //   station.pressure = latestReading.pressure;
      //   station.windCompass = convertToCompassDirection(latestReading.windDirection);
      //   station.windChill = windChillCalculator(latestReading.windSpeed, latestReading.temperature);
      //   station.fahrenheitTemp = convertToFahrenheit(latestReading.temperature);
    }
  },
};

module.exports = conversions;
