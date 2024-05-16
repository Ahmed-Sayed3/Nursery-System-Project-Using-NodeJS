const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  name: String,
  supervisor: { type: mongoose.ObjectId, ref: "teachers" },
  children: [{ type: Number, ref: "child" }],
});

module.exports = mongoose.model("class", schema);
