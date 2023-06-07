const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({
  airline: { type: mongoose.Schema.Types.ObjectId, ref: "Airlines" },
  date: {
    type: Date,
    required: [true, "Please Provide Date of Journey"],
  },
  startFrom: { type: mongoose.Schema.Types.ObjectId, ref: "Airports" },
  destination: { type: mongoose.Schema.Types.ObjectId, ref: "Airports" },
  price: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Flights", flightSchema);
