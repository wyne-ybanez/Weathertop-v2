"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store");

const reading = {
  index(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const readingId = request.params.readingid;

    const viewData = {
      title: "Edit Reading",
      station: stationsStore.getStation(stationId),
      reading: stationsStore.getReading(stationId, readingId),
    };
    logger.info(`Editing reading - reading ID: ${readingId} from station: ${station.name}, ID: ${stationId}`);
    response.render("reading", viewData);
  },

  update(request, response) {
    const stationId = request.params.id;
    const station = stationsStore.getStation(stationId);
    const readingId = request.params.readingid;
    const reading = stationsStore.getReading(stationId, readingId);

    const newReading = {
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      pressure: Number(request.body.pressure),
      windDirection: Number(request.body.windDirection),
    };

    stationsStore.updateReading(reading, newReading);
    logger.info(`Updating reading - reading ID: ${readingId} from station: ${station.name}, ID: ${stationId}`);
    response.redirect("/station/" + stationId);
  },
};

module.exports = reading;
