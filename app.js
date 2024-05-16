const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const teacherRoute = require("./Routes/teacherRoutes");
const childRoute = require("./Routes/childRoutes");
const classRoute = require("./Routes/classRoutes");
const authenticationRoute = require("./Routes/authRoute");
const authenticationMW = require("./MiddleWare/authenticationMV");
const server = express();
const port = process.env.PORT || 8080;

// mongo port 27017 or  27028 or 27029 any one 
mongoose.connect("mongodb://127.0.0.1:27017/nurserySystem").then(() => {
  console.log("db connected");
  server.listen(port, () => {
    console.log("I am listening....................", port);
  });
})
  .catch((error) => {
    console.log(error);
  });

server.use(morgan("dev"));
server.use(cors());
server.use(express.json());
server.use(authenticationRoute);
server.use(authenticationMW);

// -------------------EndPoint----------
server.use(teacherRoute);
server.use(childRoute);
server.use(classRoute);
//---------------------------------------

server.use((request, response) => {
  response.status(404).json({ message: "Not Found" });
});

server.use((error, request, response, next) => {
  response
    .status(error.status || 500)
    .json({ message: "something went wrong.." + error });
});
