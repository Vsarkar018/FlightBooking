const { BadRequest, Unauthorized } = require("../Error/index");
const User = require("../models/userModel");
const { StatusCodes } = require("http-status-codes");
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequest("Invalid Input");
  }
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new BadRequest("User already Exist");
  }
  const user = await User.create({ name, email, password});
    const token = user.CreateJwt();
    res.status(StatusCodes.OK).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Invalid Email or password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Account does not exist");
  }
  const isMatch = await user.ComparePassword(password);
  if (!isMatch) {
    throw new Unauthorized("Invalid Password");
  }
  const token = user.CreateJwt();
  res.status(StatusCodes.OK).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    phoneNumber: user.phoneNumber,
    token: token,
  });
};

module.exports = { registerUser, loginUser };
