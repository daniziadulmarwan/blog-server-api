const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");
const { validate } = require("../middlewares/Auth");

router.post("/register", validate, AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;
