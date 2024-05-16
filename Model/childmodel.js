const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  _id: Number,
  fullname: String,
  age: Number,
  level: {
    type: String,
    enum: ["preKG", "KG1", "KG2"],
    default: null,
  },
  Address: { city: String, street: String, building: String },
});
mongoose.model("child", schema);
module.exports = mongoose.model("child", schema);
