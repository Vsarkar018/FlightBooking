const mongoose = require("mongoose");
const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: { type: String, require: true },
});

module.exports = mongoose.model("Airports", airportSchema);
