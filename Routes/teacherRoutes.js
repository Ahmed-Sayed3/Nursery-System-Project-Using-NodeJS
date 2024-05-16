const express = require("express");
const controller = require("../Controller/teacherController");
const router = express.Router();
const validate = require("../MiddleWare/validations/validation");
const validator = require("../MiddleWare/validations/validator");
const { isTeacherOrAdmin,isAdmin } = require("../MiddleWare/authenticationMV");


//isTeacher
router
  .route("/teachers")
  .get( isAdmin,controller.getAllTeachers)
  .post(isAdmin,validate.teacherValidation, validator, controller.addTeacher)
  .put(isTeacherOrAdmin,validate.teacherValidation, validator, controller.updateTeacher)
  .delete(isAdmin,controller.deleteTeacher);

router.get("/teachers/supervisors",isAdmin, controller.getAllSupervisors);
router.get("/teachers/:id", isAdmin,controller.getTeacherById);

module.exports = router;
