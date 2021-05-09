const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "not authorizationed",
    });
  }

  let secretKey = process.env.JWT_SECRET_KEY || "fayha";
  const token = req.headers.authorization.split(" ")[1];

  try {
    const credential = jwt.verify(token, secretKey);
    if (!credential) {
      return res.status(400).json({
        message: "invalid token",
      });
    }

    req.app.locals.credential = credential;
    return next();
  } catch (error) {
    res.json({
      error,
    });
  }
};

module.exports = { auth };
