"use strict";

const logger = require("./logger.js");

const conversions = {
  /** 
    Convert Code to weather
    
    @param weatherCode (int)
    @return weather (string)
  */
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
          weather = "";
          console.log("Invalid code input. " + weatherCode);
          logger.debug("Invalid code input " + weatherCode);
          break;
      }
      return weather;
    }
    return weather;
  },

  /**  
    Set Weather Icons

    @param latestWeather (string)
    @return latestWeatherIcon (strong)
  */
  setLatestWeatherIcon(latestWeather) {
    let latestWeatherIcon = "";

    if (latestWeather) {
      if (latestWeather == "Clear") {
        latestWeatherIcon = "cloud rainbow icon";
      }
      if (latestWeather == "Partial clouds") {
        latestWeatherIcon = "cloud sun icon";
      }
      if (latestWeather == "Cloudy") {
        latestWeatherIcon = "cloud icon";
      }
      if (latestWeather == "Light Showers") {
        latestWeatherIcon = "cloud sun rain icon";
      }
      if (latestWeather == "Heavy Showers") {
        latestWeatherIcon = "cloud showers heavy icon";
      }
      if (latestWeather == "Rain") {
        latestWeatherIcon = "cloud rain icon";
      }
      if (latestWeather == "Snow") {
        latestWeatherIcon = "snowflake icon";
      }
      if (latestWeather == "Thunder") {
        latestWeatherIcon = "poo storm icon";
      }
      return latestWeatherIcon;
    }
  },

  /** 
    Converts Celcius to Farenheit

    @param celcius value (double)
    @return farenheit (double)
  */
  convertToFahrenheit(celciusValue) {
    // Formula for converting celcius to fahrenheit = ( X * 1.8 ) + 32
    let fahrenheitValue = celciusValue * 1.8 + 32;
    return fahrenheitValue;
  },

  /** 
    kM/hr to Beaufort Conversion
    
    @param windSpeed (int or double)
    @return int for Beaufort value
  */
  convertToBeaufort(windSpeed) {
    let BeaufortValue = 11;
    let BeaufortLabel = new Map();

    if (windSpeed == 1.0) {
      BeaufortValue = 0;
      BeaufortLabel.set(BeaufortValue, "Calm");
    } else if (windSpeed > 1.0 && windSpeed <= 5.0) {
      BeaufortValue = 1;
      BeaufortLabel.set(BeaufortValue, "Light Air");
    } else if (windSpeed >= 6.0 && windSpeed <= 11.0) {
      BeaufortValue = 2;
      BeaufortLabel.set(BeaufortValue, "Light Breeze");
    } else if (windSpeed >= 12.0 && windSpeed <= 19.0) {
      BeaufortValue = 3;
      BeaufortLabel.set(BeaufortValue, "Gentle Breeze");
    } else if (windSpeed >= 20.0 && windSpeed <= 28.0) {
      BeaufortValue = 4;
      BeaufortLabel.set(BeaufortValue, "Moderate Breeze");
    } else if (windSpeed >= 29.0 && windSpeed <= 38.0) {
      BeaufortValue = 5;
      BeaufortLabel.set(BeaufortValue, "Fresh Breeze");
    } else if (windSpeed >= 39.0 && windSpeed <= 49.0) {
      BeaufortValue = 6;
      BeaufortLabel.set(BeaufortValue, "Strong Breeze");
    } else if (windSpeed >= 50.0 && windSpeed <= 61.0) {
      BeaufortValue = 7;
      BeaufortLabel.set(BeaufortValue, "Near Gale");
    } else if (windSpeed >= 62.0 && windSpeed <= 74.0) {
      BeaufortValue = 8;
      BeaufortLabel.set(BeaufortValue, "Gale");
    } else if (windSpeed >= 75.0 && windSpeed <= 88.0) {
      BeaufortValue = 9;
      BeaufortLabel.set(BeaufortValue, "Severe Gale");
    } else if (windSpeed >= 89.0 && windSpeed <= 102.0) {
      BeaufortValue = 10;
      BeaufortLabel.set(BeaufortValue, "Strong Storm");
    } else if (windSpeed >= 103.0 && windSpeed <= 117.0) {
      BeaufortLabel.set(BeaufortValue, "Violent Storm");
      return BeaufortValue;
    } else {
      /*
      Assuming that anything beyond 117km/hr is a violent storm,
      hence the value defaults at 11 bft.
     */
      console.log("Invalid wind speed input.");
      logger.error("Invalid wind speed input.");
      return BeaufortValue;
    }
    return BeaufortValue;
  },

  /** 
    Wind Direction compass.
    Converts wind degree range to compass direction.

    @param windDirection (double)
    @return String value for the Compass direction.
  */
  convertToCompassDirection(windDirection) {
    let compassDirection;

    if (windDirection > 348.75 && windDirection < 11.25) {
      compassDirection = "North";
    } else if (windDirection > 11.25 && windDirection < 33.75) {
      compassDirection = "North East";
    } else if (windDirection > 33.75 && windDirection < 56.25) {
      compassDirection = "North North East";
    } else if (windDirection > 56.25 && windDirection < 78.75) {
      compassDirection = "East North East";
    } else if (windDirection > 78.75 && windDirection < 101.25) {
      compassDirection = "East";
    } else if (windDirection > 101.25 && windDirection < 123.75) {
      compassDirection = "East South East";
    } else if (windDirection > 123.75 && windDirection < 146.25) {
      compassDirection = "South East";
    } else if (windDirection > 146.25 && windDirection < 168.75) {
      compassDirection = "South South East";
    } else if (windDirection > 168.75 && windDirection < 191.25) {
      compassDirection = "South";
    } else if (windDirection > 191.25 && windDirection < 213.75) {
      compassDirection = "South South West";
    } else if (windDirection > 213.75 && windDirection < 236.25) {
      compassDirection = "South West";
    } else if (windDirection > 236.25 && windDirection < 258.75) {
      compassDirection = "West South West";
    } else if (windDirection > 258.75 && windDirection < 281.25) {
      compassDirection = "West";
    } else if (windDirection > 281.25 && windDirection < 303.75) {
      compassDirection = "West North West";
    } else if (windDirection > 303.75 && windDirection < 326.25) {
      compassDirection = "North West";
    } else if (windDirection > 326.25 && windDirection < 348.75) {
      compassDirection = "North North West";
    }
    // Default value is North
    else {
      compassDirection = "North";
    }
    return compassDirection;
  },

  /**
    Wind Chill Calculator.
    Takes wind direction value from reading.
    
    @params windSpeed, temperature (both are expected to be doubles)
    @return String value for wind chill.
  */
  windChillCalculator(windSpeed, temperature) {
    const exponent = 0.16;
    let windChillValue =
      13.12 +
      0.6215 * temperature -
      11.37 * Math.pow(windSpeed, exponent) +
      0.3965 * temperature * Math.pow(windSpeed, exponent);
    let windChillValueRounded = Math.round(windChillValue * 100.0) / 100.0;
    return windChillValueRounded;
  },

  // Process all conversions
  processConversions(station) {
    let latestReading;

    // IF the stations readings is larger than 0
    // Get the latest reading, which is the last position of the array
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length - 1];

      station.latestWeather = conversions.convertCodeToWeather(latestReading.code);
      station.latestWeatherIcon = conversions.setLatestWeatherIcon(station.latestWeather);
      station.temperature = latestReading.temperature;
      station.BeaufortValue = conversions.convertToBeaufort(latestReading.windSpeed);
      station.pressure = latestReading.pressure;
      station.windCompass = conversions.convertToCompassDirection(latestReading.windDirection);
      station.windChill = conversions.windChillCalculator(latestReading.windSpeed, latestReading.temperature);
      station.fahrenheitValue = conversions.convertToFahrenheit(latestReading.temperature);
    }
  },
};

module.exports = conversions;
