const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const astronautSchema = new Schema({
  name: String,
  gender: Boolean,
  birth_date: String,
  country_id: String
});

module.exports = mongoose.model("Astronaut", astronautSchema);
