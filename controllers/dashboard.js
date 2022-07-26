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
    logger.info("dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const stations = stationsStore.getMemberStations(loggedInMember.id);

    // Station sorting
    const sortedStations = stations.sort((a, b) => (a.name > b.name ? 1 : -1));
    console.log("Sorted Stations by Name: ", sortedStations, "--------------");

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
    logger.info("about to render", stationsStore.getAllStations());
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
      lng: Number(request.body.lng),
      readings: [],
    };
    logger.debug("Creating a new Station", newStation);
    stationsStore.addStation(newStation);
    response.redirect("/dashboard");
  },

  // Delete Station
  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting station ${stationId}`);
    stationsStore.removeStation(stationId);
    response.redirect("/dashboard");
  },
};

module.exports = dashboard;
