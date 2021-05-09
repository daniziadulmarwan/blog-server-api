const express = require("express");
const router = express.Router();

const db = require("../models");

/* GET users listing. */
router.get("/", async (req, res) => {
  const users = await db.user.findAll({
    order: [["createdAt", "DESC"]],
  });

  return res.status(200).json({
    message: "success get all users",
    data: users,
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await db.user.findByPk(id);
  if (!user) {
    return res.status(421).json({
      message: "user not found",
    });
  }

  return res.status(200).json({
    message: "success get user",
    data: user,
  });
});

module.exports = router;
