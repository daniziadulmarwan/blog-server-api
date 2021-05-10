const express = require("express");
const router = express.Router();
const BlogController = require("../controllers/BlogController");
const { auth } = require("../middlewares/Auth");
const { validate } = require("../middlewares/BlogValidator");

router.get("/", auth, BlogController.index);
router.post("/", auth, validate, BlogController.create);
router.get("/:id", auth, BlogController.show);
router.put("/:id", auth, validate, BlogController.update);
router.delete("/:id", auth, BlogController.delete);

module.exports = router;
