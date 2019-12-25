const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contrySchema = new Schema({
  name: String,
  space_program: String,
  date_of_creation: String
});

module.exports = mongoose.model("Countries", contrySchema);
