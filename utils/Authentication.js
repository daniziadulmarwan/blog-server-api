const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class Authentication {
  static passwordHash = (password) => {
    return bcrypt.hash(password, 10);
  };

  static passwordCompare = (pass, encryptText) => {
    let result = bcrypt.compare(pass, encryptText);
    return result;
  };

  static generateToken = (id, username, password) => {
    const secretKey = process.env.JWT_SECRET_KEY || "fayha";
    const token = jwt.sign({ id, username, password }, secretKey);
    return token;
  };
}

module.exports = Authentication;
