"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store");

const reading = {
  index(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Reading",
      station: stationsStore.getStation(stationId),
      reading: stationsStore.getReading(stationId, readingId),
    };
    response.render("reading", viewData);
  },

  update(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    const reading = stationsStore.getReading(stationId, readingId);
    const newReading = {
      title: request.body.title,
      artist: request.body.artist,
      duration: Number(request.body.duration),
    };
    logger.debug(`Updating Reading ${readingId} from Station ${stationId}`);
    stationsStore.updateReading(reading, newReading);
    response.redirect("/station/" + stationId);
  },
};

module.exports = reading;
