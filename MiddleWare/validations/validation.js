const { body } = require("express-validator");

exports.teacherValidation = [
  body("_id").isMongoId().optional().withMessage("Invalid teacher id"),
  body("fullname").isString().optional().withMessage("Full name must be a string"),
  //body("password").isStrongPassword().withMessage("invalid password"),
  body("email").isEmail().optional().withMessage("invalid email"),
  body("image").isString().optional().withMessage("invalid image"),
];
exports.childValidation = [
  body("_id").isInt().withMessage("Invalid  child id"),
  body("fullname").isString().optional().withMessage("fullname should be string"),
  body("age").isInt().optional().withMessage("age should be int"),
  body("level").isString().optional().withMessage("preKG", "KG1", "KG2"),
  body("Address").isObject().optional().withMessage("address should be object"),
];
exports.classValidation = [
  body("_id").isInt().withMessage("Class Id should be number"),
  body("name").isString().optional().withMessage("Class Name is required!"),
  body("supervisor").isMongoId().withMessage("Supervisor ID should be mongoId"),
  body("children").isArray().withMessage("Children must be array of ids"),
];
