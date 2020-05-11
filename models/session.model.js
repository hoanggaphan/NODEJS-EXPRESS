const mongoose = require("mongoose");

const sessionChema = new mongoose.Schema({
  cart: Object,
});

const Session = mongoose.model("Session", sessionChema, "sessions");

module.exports = Session;
