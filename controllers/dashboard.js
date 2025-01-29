"use strict";

const logger = require("../utils/logger");
const stationsStore = require("../models/station-store");
const accounts = require("./accounts");
const uuid = require("uuid");
const { processConversions } = require("../utils/conversions");
const { processAnalytics, processTrendAnalytics } = require("../utils/station-analytics");
// const { response } = require("express");

const dashboard = {
  // Index
  index(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const stations = stationsStore.getMemberStations(loggedInMember.id);

    // Station sorting
    const sortedStations = stations.sort((a, b) => (a.name > b.name ? 1 : -1));

    // Loop through all the stations,
    // For each station, output the Conversions & Analytics
    for (let station of sortedStations) {
      processConversions(station);
      processAnalytics(station);
      processTrendAnalytics(station);
    }

    const viewData = {
      title: "WeatherTop Dashboard",
      member: loggedInMember,
      stations: sortedStations,
    };
    response.render("dashboard", viewData);
  },

  // Add Station
  addStation(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newStation = {
      id: uuid.v1(),
      memberid: loggedInMember.id,
      name: request.body.name,
      lat: Number(request.body.lat),
      lon: Number(request.body.lon),
      readings: [],
    };
    logger.info("Creating a new Station", newStation);
    stationsStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  // Delete Station
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.info(`Deleting station ${stationId}`);
    stationsStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
