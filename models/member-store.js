"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const memberStore = {
  store: new JsonStore("./models/member-store.json", { members: [] }),
  collection: "members",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  updateMember(member, updatedMember) {
    member.firstName = updatedMember.firstName;
    member.lastName = updatedMember.lastName;
    member.email = updatedMember.email;
    member.password = updatedMember.password;
    member.avatar = updatedMember.avatar;
    member.id = member.id;
    this.store.save();
  },
};

module.exports = memberStore;
