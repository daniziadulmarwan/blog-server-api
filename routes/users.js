const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const { auth } = require("../middlewares/Auth");

router.get("/", auth, UserController.index);
router.get("/:id", auth, UserController.show);
router.put("/:id", auth, UserController.update);
router.delete("/:id", auth, UserController.delete);

module.exports = router;
