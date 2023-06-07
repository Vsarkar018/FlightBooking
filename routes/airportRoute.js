const router = require("express").Router();
const {
  addAirport,
  getAirport,
  getAllAirports,
  patchAirport,
  deleteAirport,
} = require("../controller/airportController");

router.route("/").post(addAirport).get(getAirport);
router.route("/:id").delete(deleteAirport).patch(patchAirport);
router.get("/all",getAllAirports)
module.exports = router;
