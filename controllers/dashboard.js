"use strict";

const logger = require("../utils/logger");
const readingsListStore = require("../models/readings-list-store");
const uuid = require("uuid");
const { response } = require("express");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const viewData = {
      title: "WeatherTop Dashboard",
      readingslist: readingsListStore.getAllReadings(),
    };
    response.render("dashboard", viewData);
  },

  addReading(request, response) {
    const reading = {
      id: uuid.v1(),
      title: request.body.title,
    };
    readingsListStore.addReading(reading);
    response.redirect("/dashboard");
  },

  deleteReading() {
    const readingId = request.params.id;
    logger.info(`Deleting reading ${readingId}`);
    readingsListStore.removeReading(readingId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
