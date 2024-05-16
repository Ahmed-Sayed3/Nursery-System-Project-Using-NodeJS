const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  //_id:{ type: mongoose.ObjectId },
  fullname: String,
  email: String,
  password: String,
  image: String,
});
mongoose.model("teachers", schema);
module.exports = mongoose.model("teachers", schema);
