  const { validationResult } = require("express-validator");

  module.exports = (request, response, next) => {
    let result = validationResult(request);
    if (result.errors.length > 0) {
      let message = result.errors.reduce(
        (current, errorMsg) => current + errorMsg.msg + ":",
        " "
      );
      let error = new Error(message);
      error.status = 422;
      next(error);
    } else {
      next();
    }
  };
