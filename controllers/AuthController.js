const db = require("../models");
const Authentication = require("../utils/Authentication");

class AuthController {
  register = async (req, res) => {
    let { username, password } = req.body;

    const userExist = await db.user.findOne({
      where: { username },
    });
    if (userExist) {
      return res.status(400).json({
        error: "username has been used",
      });
    }

    const hashedPassword = await Authentication.passwordHash(password);

    const user = await db.user.create({ username, password: hashedPassword });
    if (!user) {
      return res.status(400).json({
        error: "failed create user",
      });
    }

    return res.status(200).json({
      message: "success create user",
      data: user,
    });
  };

  login = async (req, res) => {
    // find the user
    const user = await db.user.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(400).json({
        error: "user not found",
      });
    }

    // check password
    let compare = await Authentication.passwordCompare(
      req.body.password,
      user.password
    );
    if (!compare) {
      return res.status(400).json({
        error: "password not match",
      });
    }

    // generate token
    let token = Authentication.generateToken(
      user.id,
      user.username,
      user.password
    );
    if (!token) {
      return res.status(400).json({
        error: "failed to generate token",
      });
    }

    return res.status(200).json({
      message: "success login",
      data: {
        token,
        user: user.username,
      },
    });
  };
}

module.exports = new AuthController();
