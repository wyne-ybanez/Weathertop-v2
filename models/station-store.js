"use strict";

const { identity } = require("lodash");
const _ = require("lodash");
const JsonStore = require("./json-store");

const stationsStore = {
  store: new JsonStore("./models/station-store.json", {
    stationsCollection: [],
  }),
  collection: "stationsCollection",

  // Station functions

  getAllStations() {
    return this.store.findAll(this.collection);
  },

  getStation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserStations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addStation(station) {
    this.store.add(this.collection, station);
    this.store.save();
  },

  removeStation(id) {
    const station = this.getStation(id);
    this.store.remove(this.collection, station);
    this.store.save();
  },

  removeAllStations() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  // Reading functions

  addReading(id, reading) {
    const station = this.getStation(id);
    station.readings.push(reading);

    // let duration = 0;
    // for (let i = 0; i < station.readings.length; i++) {
    //   duration += station.readings[i].duration;
    // }

    // station.duration = duration;
    // let title;
    // let latestWeather;
    // let temperature;
    // let windSpeed;
    // let pressure;

    station.title = station.readings.slice(-1).title;
    // station.latestWeather = station.readings.slice(-1).latestWeather;
    station.temperature = station.readings.slice(-1).temperature;
    station.windSpeed = station.readings.slice(-1).windSpeed;
    station.pressure = station.readings.slice(-1).pressure;

    this.store.save();
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    const readings = station.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  getReading(id, readingId) {
    const station = this.store.findOneBy(this.collection, { id: id });
    const readings = station.readings.filter((reading) => reading.id == readingId);
    return readings[0];
  },

  updateReading(reading, updatedReading) {
    reading.code = updatedReading.code;
    reading.temperature = updatedReading.temperature;
    reading.windSpeed = updatedReading.windSpeed;
    reading.pressure = updatedReading.pressure;
    this.store.save();
  },
};

module.exports = stationsStore;
