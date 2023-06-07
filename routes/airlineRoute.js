const router = require("express").Router()

const {addAirline} = require('../controller/airlineController')

router.route("/").post(addAirline)


module.exports = router