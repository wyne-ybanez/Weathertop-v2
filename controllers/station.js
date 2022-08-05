"use strict";

const logger = require("../utils/logger.js");
const stationAnalytics = require("../utils/station-analytics.js");
const stationsStore = require("../models/station-store.js");
const uuid = require("uuid");

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
      shortestReading: shortestReading,
      duration: duration,
    };
    response.render("station", viewData);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    logger.debug("New Reading = ", newReading);
    stationsStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationsStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },
};

module.exports = station;
