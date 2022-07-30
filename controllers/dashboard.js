"use strict";

const logger = require("../utils/logger");
const readingsListStore = require("../models/readings-list-store");
const accounts = require("./accounts");
const uuid = require("uuid");
// const { response } = require("express");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      readingslist: readingsListStore.getUserReadings(loggedInUser.id),
    };
    response.render("dashboard", viewData);
  },

  addReading(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const reading = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
    };
    readingsListStore.addReading(reading);
    response.redirect("/dashboard");
  },

  deleteReading(request, response) {
    const readingId = request.params.id;
    logger.info(`Deleting reading ${readingId}`);
    readingsListStore.removeReading(readingId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
