"use strict";

const conversions = require("../utils/conversions.js");
const logger = require("./logger.js");

const stationAnalytics = {
  //=== Latest Values
  /**
      Get Latest Weather
     
      @param  station
      @return latestWeather, converted code to string
  */
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

  /**
      Get Latest Temperature
     
      @param  station
      @return latestTemperature
  */
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

  /**
      Get Latest WindSpeed
     
      @param  station
      @return latestWindSpeed
  */
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

  /**
      Get Latest WindDirection
     
      @param  station
      @return latestWindDirection
  */
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

  /**
      Get Latest Pressure
     
      @param  station
      @return latestPressure
  */
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

  //=== Process Analytics

  /**
  Process station analytics for latest reading.
 
  @param station
  @return max/min Temperature, max/min WindSpeed, max/min Pressure
 */
  processAnalytics(station) {
    if (station.readings.length > 0) {
      // Analytics: Max & Min Values (Temperature, Wind, Pressure)
      station.maxTemperature = stationAnalytics.getMaxTemperature(station.readings);
      station.minTemperature = stationAnalytics.getMinTemperature(station.readings);
      station.maxWindSpeed = stationAnalytics.getMaxWindSpeed(station.readings);
      station.minWindSpeed = stationAnalytics.getMinWindSpeed(station.readings);
      station.maxPressure = stationAnalytics.getMaxPressure(station.readings);
      station.minPressure = stationAnalytics.getMinPressure(station.readings);
    }
  },
};

module.exports = stationAnalytics;
