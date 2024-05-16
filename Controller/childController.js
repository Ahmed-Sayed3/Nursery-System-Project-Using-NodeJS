const childSchema = require("../Model/childmodel");
const classSchema=require("../Model/classmodel")
exports.getAllChildren = (request, response, next) => {
  childSchema
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.getChildById = (request, response, next) => {
  childSchema
    .findOne({ _id: request.params.id })
    .then((child) => {
      if (!child) {
        throw new Error("No child with this id exists");
      } else {
        response.status(200).json({ child });
      }
    })
    .catch((error) => {
      next(error);
    });
};



exports.addChild = (request, response, next) => {
  const add = new childSchema(request.body);
  add
    .save()
    .then((data) => {
      response.status(201).json({ data });
    })
    .catch((error) => next(error));
};


exports.updateChild = (request, response, next) => {
   const requestId=request.body._id;

  childSchema
    .findByIdAndUpdate({ _id:requestId }, request.body)
    .then((child) => {
      if (!child) {
        throw new Error("No child Record Found");
      } else {
        response.status(200).json({ message: "Data is updated successfully." });
      }
    })
    .catch((err) => next(err));
};
exports.deleteChild = (request, response, next) => {
  childSchema
    .deleteOne(request.body)
    .then((child) => {
      if (!child) {
        throw new Error("No child Record Found");
      } else {
        response.status(200).json({ message: "child deleted successfully" });
      }
    })
    .catch((err) => next(err));
};
