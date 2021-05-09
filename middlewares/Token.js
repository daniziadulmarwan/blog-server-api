const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "not authenthicated",
    });
  }

  return next();
};

module.exports = { auth };
