const { StatusCodes } = require("http-status-codes");
const Flights = require("../models/flightModel");
const { BadRequest } = require("../Error/index");

const addFlight = async (req, res) => {
  const { airline, date, startFrom, destination, price } = req.body;
  if (!airline || !date || !startFrom || !destination || !price) {
    throw new BadRequest("Incomplete Date Provided");
  }
  const flight = await Flights.create(req.body);
  res.status(StatusCodes.OK).json(flight);
};

const getFlight = async (req, res) => {
  const { date, from, to } = req.query;
  console.log(date, from, to);
  if (!date || !from || !to) {
    throw new BadRequest("Incomplete Data Provided");
  }
  const flight = await Flights.find({
    date: date,
    startFrom: from,
    destination: to,
  })
    .populate("airline")
    .populate("startFrom")
    .populate("destination");
  res.status(StatusCodes.OK).json(flight);
};
module.exports = { getFlight, addFlight };
