const db = require("../models");

class UserController {
  index = async (req, res) => {
    const users = await db.user.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json({
      message: "success get all users",
      data: users,
    });
  };
}

module.exports = new UserController();
