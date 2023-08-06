require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(require("cors")())

const airportRouter = require("./routes/airportRoute");
const flightRouter = require("./routes/flightRoute");
const airlineRouter = require("./routes/airlineRoute")
const userRoutes = require("./routes/userRoutes")


const errorhandlerMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/error-handler");

app.use(express.static('./client/build'))

app.use("/api/v1/user",userRoutes)
app.use("/api/v1/airport", airportRouter);
app.use("/api/v1/flight", flightRouter);
app.use("/api/v1/airline",airlineRouter)
app.use(errorhandlerMiddleware);
app.use(notFound);

const connectDB = require("./db/connectDB");

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server listening on the port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
