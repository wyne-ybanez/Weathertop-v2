"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store.js");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station Id = ", stationId);
    const viewData = {
      title: "Station",
      station: stationsStore.getStation(stationId),
    };
    response.render("station", viewData);
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
