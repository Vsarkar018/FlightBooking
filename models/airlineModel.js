const mongoose = require("mongoose");

const airlineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide airline name"],
  },
});

module.exports = mongoose.model("Airlines", airlineSchema);
