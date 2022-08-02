"use strict";

const logger = require("../utils/logger");

const admin = {
  index(request, response) {
    logger.info("Admin page rendering");
    const viewData = {
      title: "Admin Page",
      stationslist: stationsStore.getAllStations(),
    };
    response.render("admin", viewData);
  },
};
