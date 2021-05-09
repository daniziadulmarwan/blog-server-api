const { check, validationResult } = require("express-validator");

const validate = [
  check("username")
    .isString()
    .withMessage("username must be a string")
    .isLength({ min: 6 })
    .withMessage("username min 6 character"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("password min 6 character"),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }

    return next();
  },
];

module.exports = { validate };
