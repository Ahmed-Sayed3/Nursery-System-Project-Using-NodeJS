const express = require("express");
const controller = require("../Controller/classController");
const router = express.Router();
const validate = require("../MiddleWare/validations/validation");
const validator = require("../MiddleWare/validations/validator");
router
  .route("/class")
  .get(controller.getAllClasses)
  .post(validate.classValidation, validator, controller.addClass)
  .put(validate.classValidation, validator, controller.updateClass)
  .delete(controller.deleteClass);

router.get("/class/:id", controller.getClassById);
router.get("/class/child/:id", controller.getClassChildrenInfo);
router.get("/class/teacher/:id", controller.getClassSupervisorInfo);

module.exports = router;
