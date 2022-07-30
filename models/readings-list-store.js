"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const readingsListStore = {
  store: new JsonStore("./models/readings-list-store.json", {
    readingsListCollection: [],
  }),
  collection: "readingsListCollection",

  getAllReadings() {
    return this.store.findAll(this.collection);
  },

  addReading(reading) {
    this.store.add(this.collection, reading);
    this.store.save();
  },

  getReading(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  removeReading(id) {
    const reading = this.getReading(id);
    this.store.remove(this.collection, reading);
    this.store.save();
  },

  getUserReadings(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = readingsListStore;
