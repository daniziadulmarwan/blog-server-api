const db = require("../models");

class UserController {
  index = async (req, res) => {
    const users = await db.user.findAll({
      order: [["createdAt", "ASC"]],
    });

    return res.status(200).json({
      message: "success get all users",
      data: users,
    });
  };

  show = async (req, res) => {
    const { id } = req.params;

    const user = await db.user.findOne({
      where: { id: id },
    });
    if (!user) {
      return res.status(422).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "success get user",
      data: user,
    });
  };
  update = async (req, res) => {
    const { id } = req.params;
    const { username } = req.body;

    const user = await db.user.update(
      {
        username,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!user) {
      return res.status(422).json({
        message: "user not found",
      });
    }

    return res.status(200).json({
      message: "success update user",
      data: user,
    });
  };
  delete = async (req, res) => {
    const { id } = req.params;

    await db.user.destroy({
      where: { id: id },
    });

    return res.status(200).json({
      message: "success delete data",
    });
  };
}

module.exports = new UserController();
