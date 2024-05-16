const teacherSchema = require("../Model/teachermodel");
const classSchema = require("../Model/classmodel");

exports.getAllTeachers = (request, response, next) => {
  teacherSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.getTeacherById = (request, response, next) => {
  teacherSchema
    .findOne({ _id: request.params.id })
    .then((teacher) => {
      if (!teacher) {
        throw new Error("No matched teacher");
      } else {
        response.status(200).json({ teacher });
      }
    })
    .catch((error) => {
      next(error);
    });
};
exports.addTeacher = (request, response, next) => {
  const add = new teacherSchema(request.body);
  add
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};
exports.updateTeacher = (request, response, next) => {
  const teacherId = request.body._id; 
  teacherSchema
    .findByIdAndUpdate({ _id: teacherId }, request.body)
    .then((teacher) => {
      if (!teacher) {
        throw new Error("No matched Teacher");
      } else {
        response.status(200).json({ message: "Data  updated." });
      }
    })
    .catch((err) => next(err));
};
exports.deleteTeacher = (request, response, next) => {
  teacherSchema
    .deleteOne(request.body)
    .then((teacher) => {
      if (!teacher) {
        throw new Error("No matched Teacher.");
      } else {
        response.status(200).json({ message: "Teacher has been deleted" });
      }
    })
    .catch((err) => next(err));
};
exports.getAllSupervisors = (request, response, next) => {
  classSchema
    .find({})
    .populate({ path: "supervisor", select: { _id: 1 } })
    .then((data) =>
      response.status(200).json(
        data )
    )
    .catch((error) => next(error));
};
