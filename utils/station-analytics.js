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

  getLatestWindDirection(station) {
    let latestWindDirection;
    let latestReading;

    if (station.readings) {
      latestReading = station.readings[0];

      if (station.readings.length > 1) {
        latestReading = station.readings[station.readings.length - 1];
      }
      logger.debug("Latest WindDirection is " + latestReading.windDirection);

      if (latestReading.windSpeed) {
        latestWindDirection = latestReading.windDirection;
      }
      return latestWindDirection;
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

  //=== Min Values
  /**
      Get minimum Temperature reading.
     
      @param  readings (Array)
      @return Reading minTempReading, the reading with the minimum temp value
  */
  getMinTemperature(readings) {
    let minTempReading = null;
    if (readings.length > 0) {
      minTempReading = readings[0];
      for (const reading of readings) {
        if (reading.temperature < minTempReading.temperature) {
          minTempReading = reading;
        }
      }
    }
    return minTempReading.temperature;
  },

  /**
      Get minimum Wind Speed reading.
     
      @param  readings (Array)
      @return Reading minWindReading, the reading with the minimum windSpeed value
  */
  getMinWindSpeed(readings) {
    let minWindReading = null;
    if (readings.length > 0) {
      minWindReading = readings[0];
      for (const reading of readings) {
        if (reading.windSpeed < minWindReading.windSpeed) {
          minWindReading = reading;
        }
      }
    }
    return minWindReading.windSpeed;
  },

  /**
      Get minimum Pressure reading.
     
      @param  readings (Array)
      @return Reading minWindReading, the reading with the minimum windSpeed value
  */
  getMinPressure(readings) {
    let minPressureReading = null;
    if (readings.length > 0) {
      minPressureReading = readings[0];
      for (const reading of readings) {
        if (reading.pressure < minPressureReading.pressure) {
          minPressureReading = reading;
        }
      }
    }
    return minPressureReading.pressure;
  },

  //=== Max Values
  /**
      Get maximum Temperature reading.
     
      @param  readings (Array)
      @return maxTempReading, the reading with the maximum temp value
  */
  getMaxTemperature(readings) {
    let maxTempReading = null;
    if (readings.length > 0) {
      maxTempReading = readings[0];
      for (const reading of readings) {
        if (reading.temperature > maxTempReading.temperature) {
          maxTempReading = reading;
        }
      }
    }
    return maxTempReading.temperature;
  },

  /**
      Get maximum Wind Speed reading.
     
      @param  readings (Array)
      @return maxWindSpeed, the reading with the maximum windSpeed value
  */
  getMaxWindSpeed(readings) {
    let maxWindReading = null;
    if (readings.length > 0) {
      maxWindReading = readings[0];
      for (const reading of readings) {
        if (reading.windSpeed > maxWindReading.windSpeed) {
          maxWindReading = reading;
        }
      }
    }
    return maxWindReading.windSpeed;
  },

  /**
      Get maximum Pressure reading.
     
      @param  readings (Array)
      @return maxPressureReading, the reading with the maximum Pressure value
  */
  getMaxPressure(readings) {
    let maxPressureReading = null;
    if (readings.length > 0) {
      maxPressureReading = readings[0];
      for (const reading of readings) {
        if (reading.pressure > maxPressureReading.pressure) {
          maxPressureReading = reading;
        }
      }
    }
    return maxPressureReading.pressure;
  },
};

module.exports = stationAnalytics;
