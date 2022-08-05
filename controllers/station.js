"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store.js");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station Id = ", stationId);

    let shortestReading = null;
    const station = stationsStore.getStation(stationId);

    // Algorithm to look for the shortest reading
    if (station.readings.length > 0) {
      shortestReading = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        if (station.readings[i].duration < shortestReading.duration) {
          shortestReading = station.readings[i];
        }
      }
    }

    console.log(shortestReading);
    const viewData = {
      title: "Station",
      station: stationsStore.getStation(stationId),
      shortestReading: shortestReading,
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
