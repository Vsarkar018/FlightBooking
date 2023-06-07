const Airports = require("../models/airportModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../Error/index");

const addAirport = async (req, res) => {
  const { name, city, country } = req.body;
  if (!name || !city || !country) {
    throw new BadRequest("Details Incomplete");
  }
  const airport = await Airports.create({ name, city, country });
  res.status(StatusCodes.OK).json(airport);
};

const getAllAirports = async (req, res) => {
  const airports = await Airports.find();
  res.status(StatusCodes.OK).json(airports);
};

const getAirport = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { country: { $regex: req.query.search, $options: "i" } },
          { city: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const airport = await Airports.find(keyword);
  res.status(StatusCodes.OK).json(airport);
};

const patchAirport = async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("Airport ID is not Present");
  }
  if (!req.body) {
    throw new BadRequest("Details not present");
  }
  const airport = await Airports.findByIdAndUpdate(req.params.id, ...req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json(airport);
};

const deleteAirport = async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("Airport ID is not Present");
  }
  await Airports.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json("AirPort Deleted successfullly");
};

module.exports = {
  addAirport,
  getAirport,
  getAllAirports,
  patchAirport,
  deleteAirport,
};
