const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { auth } = require("../middlewares/Auth");

router.get("/", auth, UserController.index);

module.exports = router;
