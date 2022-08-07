"use strict";

const logger = require("../utils/logger.js");
const stationAnalytics = require("../utils/station-analytics.js");
const stationsStore = require("../models/station-store.js");
const axios = require("axios");
const uuid = require("uuid");
const { report } = require("../routes.js");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station Id = ", stationId);

    const station = stationsStore.getStation(stationId);

    let shortestReading = stationAnalytics.getShortestReading(station);
    console.log(shortestReading);

    const duration = stationAnalytics.getStationDuration(station);
    console.log(duration);

    const viewData = {
      title: "Station",
      station: stationsStore.getStation(stationId),
      stationSummary: {
        shortestReading: stationAnalytics.getShortestReading(station),
        duration: stationAnalytics.getStationDuration(station),
      },
    };
    response.render("station", viewData);
  },

  // addReading(request, response) {
  //   const stationId = request.params.id;
  //   const station = stationsStore.getStation(stationId);
  //   logger.debug("New Reading = ", newReading);
  //   stationsStore.addReading(stationId, newReading);
  //   response.redirect("/station/" + stationId);
  // },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationsStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  async addreading(request, response) {
    logger.info("rendering new reading");
    let report = {};

    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const lat = station.lat;
    const lng = station.lng;

    const requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=3e4f8f021b82edfd153011f778cd9a72
`;
    const result = await axios.get(requestUrl);

    if (result.status == 200) {
      const reading = result.data.current;
      report.code = reading.weather[0].id;
      report.temperature = reading.temp;
      report.windSpeed = reading.wind_speed;
      report.pressure = reading.pressure;
      // report.windDirection = reading.wind_deg;

      const newReading = {
        id: uuid.v1(),
        code: report.code,
        temperature: report.temperature,
        wind_speed: report.windSpeed,
        pressure: report.pressure,
      };
    }
    console.log(report);

    // const viewData = {
    //   title: "Weather Report",
    //   reading: report,
    // };
    response.redirect("/station/", stationId);
  },
};

module.exports = station;
