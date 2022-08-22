"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store");
const accounts = require("./accounts");
const uuid = require("uuid");
// const { response } = require("express");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "WeatherTop Dashboard",
      member: loggedInMember,
      stations: stationsStore.getMemberStations(loggedInMember.id),
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
