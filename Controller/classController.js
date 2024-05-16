const classSchema = require("../Model/classmodel");
const teacherSchema = require("../Model/teachermodel");
const childSchema = require("../Model/childmodel");

exports.getAllClasses = (request, response, next) => {
  classSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.getClassById = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .then((classInfo) => {
      if (!classInfo) {
        throw new Error("No class with this id exists");
      } else {
        response.status(200).json({ classInfo });
      }
    })
    .catch((error) => {
      next(error);
    });
};

exports.addClass = (request, response, next) => {
  const supervisorId = request.body.supervisor; 
  const childrenIds = request.body.children; 
  teacherSchema.findById(supervisorId)
    .then((supervisor) => {
      if (!supervisor) {
        throw new Error('Supervisor not found');
      }

      childSchema.find({ _id: { $in: childrenIds } }).then((children) => {
        if (children.length !== childrenIds.length) {
          throw new Error('Invalid child ID');
        }
  const add = new classSchema(request.body);
      add
      .save()
          .then((data) => {
            response.status(201).json({ message: 'Class has been added', data });
          })
          .catch((error) => next(error));
      });
    })
    .catch((error) => next(error));
};


// exports.addClass = (request, response, next) => {

//   const add = new classSchema(request.body);
//   add
//     .save()
//     .then((data) => {
//       response.status(201).json({ data });
//     })
//     .catch((error) => next(error));
// };


exports.updateClass = (request, response, next) => {
  classSchema
    .findByIdAndUpdate({ _id: request.body._id }, request.body)
    .then((classInfo) => {
      if (!classInfo) {
        throw new Error("No class Record Found");
      } else {
        response.status(200).json({ message: "Data updated." });
      }
    })
    .catch((err) => next(err));
};

exports.deleteClass = (request, response, next) => {
  classSchema
    .deleteOne(request.body)
    .then((classInfo) => {
      if (!classInfo) {
        throw new Error("class doesn't exist");
      } else {
        response.status(200).json({ message: "class deleted" });
      }
    })
    .catch((err) => next(err));
};

exports.getClassChildrenInfo = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .populate({ path: "children", select: { fullname: 1 } })
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};

exports.getClassSupervisorInfo = (request, response, next) => {
  classSchema
    .findOne({ _id: request.params.id })
    .populate({ path: "supervisor", select: { fullname: 1 } })
    .then((data) => response.status(200).json({ data }))
    .catch((error) => next(error));
};


