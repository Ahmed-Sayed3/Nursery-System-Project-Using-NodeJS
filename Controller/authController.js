const jwt = require("jsonwebtoken");
const teacherSchema = require("./../Model/teachermodel");


exports.login = (request, response, next) => {
  const emailad = "Ahmed25sayed@gmail.com"
  const passwordad = "123"
  const role = "admin"
  if (request.body.email == emailad && request.body.password == passwordad) {
    let token = jwt.sign({ _id: "1", role: role }, "gisTrack", { expiresIn: "3h" });
    console.log(token)
    response.status(200).json({ data: "Authenticated", token, role });
  } else {
    teacherSchema.findOne({
      email: request.body.email,
      password: request.body.password,
    })
    .then((object) => {
      if (!object) {
        throw new Error("incorrect userName or password");
      } else {
        let teacherEmail = object.email
        let teacherrole = "teacher"
        let token = jwt.sign(
          {
            id: object._id,
            role: teacherrole,
            email: teacherEmail
          },
          "gisTrack",
          { expiresIn: "3h" }
        );

        response.status(200).json({ data: "Authenticated", teacherrole, token, teacherEmail });
      }
    }).catch((error) => next(error));
  }
};