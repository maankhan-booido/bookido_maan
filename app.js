var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var mongoose = require("mongoose");
var mongo = require("mongodb");

// var path = require('path');

// for uploading files
const bodyParser = require("body-parser");
const crypto = require("crypto");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const methodOverride = require("method-override");

// for sessions
var session = require("express-session");
var sessionAuth = require("./middlewares/sessionAuth");

// importing router
var indexRouter = require("./routes/index");

var app = express();
app.use(session({ secret: "keyboard abc", cookie: { maxAge: 60000 } }));

//MIDDLEWARE
// view engine setup i.e. pug
app.set("views", path.join(__dirname, "views"));
app.use(bodyParser.json());
app.use(methodOverride("_method")); //tells that we need a query string when we make a delete request
app.set("view engine", "pug");
app.use(sessionAuth);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sessionAuth);

app.use(express.static(path.join(__dirname, "public"))); //makes the folder public
//directs it to the index.js file present in routes
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// Connecting Database
// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB through app.js");
//   })
//   .catch((error) => console.log(error.message));
mongoose
  .connect("mongodb://localhost/db_bookido", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => console.log(error.message));

module.exports = app;
