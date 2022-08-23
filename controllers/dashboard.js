"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store");
const accounts = require("./accounts");
const uuid = require("uuid");
const { processConversions } = require("../utils/conversions");
const { processAnalytics } = require("../utils/station-analytics");
// const { response } = require("express");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const stations = stationsStore.getMemberStations(loggedInMember.id);

    // Loop through all the stations,
    // For each station, output the Conversions & Analytics
    for (let station of stations) {
      processConversions(station);
      // processAnalytics(station);
    }

    const viewData = {
      title: "WeatherTop Dashboard",
      member: loggedInMember,
      stations: stations,
      // stationSummary: {
      //   // Latest Station Values
      //   latestWeather: latestWeather,
      //   latestWeatherIcon: latestWeatherIcon,
      //   latestTemperature: latestTemperature,
      //   latestPressure: latestPressure,

      //   // Converted Values
      //   windChill: windChill,
      //   windCompass: windCompass,
      //   fahrenheitValue: fahrenheitValue,
      //   BeaufortValue: BeaufortValue,

      //   // Min Max values
      //   minTemperature: minTemperature,
      //   maxTemperature: maxTemperature,
      //   minWindSpeed: minWindSpeed,
      //   maxWindSpeed: maxWindSpeed,
      //   minPressure: minPressure,
      //   maxPressure: maxPressure,
      // },
    };
    logger.info("about to render", stationsStore.getAllStations());
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newStation = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      name: request.body.name,
      lat: Number(request.body.lat),
      lng: Number(request.body.lng),
      readings: [],
    };
    logger.debug("Creating a new Station", newStation);
    stationsStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting station ${stationId}`);
    stationsStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
