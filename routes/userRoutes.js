const router = require("express").Router();
const { loginUser, registerUser } = require("../controller/userController");
router.route("/").post(registerUser);
router.route("/login").post(loginUser);
module.exports = router;
