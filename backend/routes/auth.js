const express = require("express");
const router = express.Router();

// Routes Imports ===============================================
const { sendOTP } = require("../controllers/Auth/sendOtp");
const { signup } = require("../controllers/Auth/signup");
const { login } = require("../controllers/Auth/login");
const { updatePasswordToken } = require("../controllers/Auth/updatePasswordToken");
const { updatePassword } = require("../controllers/Auth/updatePassword");



// Routes =======================================================
router.post("/sendotp", sendOTP);
router.post("/signup", signup);
router.post("/login", login);

// Update Routes ===================================
router.post("/updatePasswordToken", updatePasswordToken);
router.post("/updatePassword", updatePassword);

module.exports = router;
