const { check, validationResult } = require("express-validator");

const validate = [
  check("title")
    .isString()
    .withMessage("title must be a string")
    .isLength({ min: 6 })
    .withMessage("title min 6 character"),
  check("body").isLength({ min: 6 }).withMessage("body min 6 character"),
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
