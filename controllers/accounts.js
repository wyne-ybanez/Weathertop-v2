"use strict";

const memberStore = require("../models/member-store");
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service",
    };
    response.render("login", viewData);
  },

  logout(request, response) {
    response.cookie("member", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to WeatherTop",
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie("member", member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    console.log(memberEmail);
    return memberStore.getMemberByEmail(memberEmail);
  },

  account(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      member: loggedInMember,
    };
    console.log(loggedInMember);
    response.render("accounts", viewData);
  },

  /**
   * Update user account details.
   *
   * @param firstname User desired first name
   * @param lastname  User desired last name
   * @param email     User desired email
   * @param password  User desired password
   */
  async updateDetails(request, response) {
    // Get the member in question
    let member = await accounts.getCurrentMember(request);

    let updatedMember = await {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      // Member ID remains the same
      id: member.id,
    };

    console.log(updatedMember);

    // Changes cookie to new details
    response.cookie("member", updatedMember.email);

    logger.debug(`Updating Member ${member}`);
    memberStore.updateMember(member, updatedMember);
    response.redirect("/accounts");
  },
};

module.exports = accounts;
