"use strict";

const _ = require("lodash");

const stationsStore = {
  stationsCollection: require("./station-store.json").stationsCollection,

  getAllStations() {
    return this.stationsCollection;
  },

  getStation(id) {
    return _.find(this.stationsCollection, { id: id });
  },

  removeReading(id, readingId) {
    const station = this.getStation(id);
    _.remove(station.readings, { id: readingId });
  },
};

module.exports = stationsStore;

// "use strict";

// const _ = require("lodash");
// const JsonStore = require("./json-store");

// const stationsStore = {
//   store: new JsonStore("./models/station-store.json", {
//     stationsCollection: [],
//   }),
//   collection: "stationsCollection",

//   getAllStations() {
//     return this.store.findAll(this.collection);
//   },

//   addStation(station) {
//     this.store.add(this.collection, station);
//     this.store.save();
//   },

//   getStation(id) {
//     return this.store.findOneBy(this.collection, { id: id });
//   },

//   removeStation(id) {
//     const station = this.getStation(id);
//     this.store.remove(this.collection, station);
//     this.store.save();
//   },

//   getUserStations(userid) {
//     return this.store.findBy(this.collection, { userid: userid });
//   },
// };

// module.exports = stationsStore;
