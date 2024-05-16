const jwt = require("jsonwebtoken");
const techerSchema = require("../Model/teachermodel")
module.exports = (request, repsonse, next) => {
  try {
      
    let token = request.get("authorization").split(" ")[1];
    let decodedToken = jwt.verify(token, "gisTrack");
    request.token = decodedToken;
    next();
  } catch (error) {
    let errorObject = new Error("not authenicated");
    errorObject.status = 401;
    next(errorObject);
  }
};

module.exports.isAdmin = (request, response, next) => {
  if (request.token.role == "admin") next();
  else {
    let errorObject = new Error("not Authorized");
    errorObject.status = 403;
    next(errorObject);
  }
};


module.exports.isTeacherOrAdmin = (request, response, next) => {
  if(request.token.role=="admin"){
    next();
  }
  else if (request.token.email === request.body.email) {
    next()}
  else {
    let errorObject = new Error("not Authorized");
    errorObject.status = 403;
    next(errorObject);
  }
};




