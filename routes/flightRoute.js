const router = require("express").Router();

const { getFlight, addFlight } = require("../controller/flightController");

router.route("/").get(getFlight).post(addFlight);

module.exports = router;
