"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store");
const accounts = require("./accounts");
const uuid = require("uuid");
// const { response } = require("express");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      user: loggedInUser,
      stations: stationsStore.getUserStations(loggedInUser.id),
    };
    logger.info("about to render", stationsStore.getAllStations());
    response.render("dashboard", viewData);
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
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
