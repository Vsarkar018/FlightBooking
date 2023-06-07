const Airlines = require("../models/airlineModel");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../Error/index");

const addAirline = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    throw new BadRequest("AirLine is not Present");
  }
  const airline = await Airlines.create(req.body);
  res.status(StatusCodes.OK).json(airline);
};

const getAllAirlines = async (req, res) => {
  const airlines = await Airlines.find();
  res.status(StatusCodes.OK).json(airlines);
};

const getAirline = async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("Airline is not Present");
  }
  const airline = await Airlines.find(req.params.id);
  res.status(StatusCodes.OK).json(airline);
};

const deleteAirline = async (req, res) => {
  if (!req.params.id) {
    throw new BadRequest("Airline is not Present");
  }
  await Airports.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json("AirPort Deleted successfullly");
};

module.exports = {
  addAirline,
  getAirline,
  getAllAirlines,
  deleteAirline,
};
