const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema({
  userId: String,
  accountId: String,
  amount: Number,
});

const Transfer = mongoose.model("Transfer", transferSchema, "transfers");

module.exports = Transfer;
