const express = require("express");
const controller = require("../Controller/childController");
const router = express.Router();
const validate = require("../MiddleWare/validations/validation");
const validator = require("../MiddleWare/validations/validator");

router
  .route("/child")
  .get(controller.getAllChildren)
  .post(validate.childValidation, validator, controller.addChild)
  .put(validate.childValidation, validator, controller.updateChild)
  .delete(controller.deleteChild);

router.get("/child/:id", controller.getChildById);

module.exports = router;
