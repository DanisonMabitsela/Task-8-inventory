var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const carSchema = require("./models/carSchema");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const newCars = require("./routes/newCars");
const getCars = require("./routes/getCars");
const updateCar = require("./routes/updateCar");
const deleteCar = require("./routes/deleteCar");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// Parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/newCars", newCars);
app.use("/getCars", getCars);
app.use("/updateCar", updateCar);
app.use("/deleteCar", deleteCar);

// Update multiple cars
app.put("/updateMany", async function (req, res, next) {
  const make = req.body.make;
  const model = req.body.model;
  const registration = req.body.registration;
  const owner = req.body.owner;
  const colour = req.body.colour;
  const address = req.body.address;

  try {
    const updateResult = await carSchema.updateMany(
      {},
      { make, model, registration, owner, colour, address }
    );
    res.send({ message: "Cars updated", carsUpdated: updateResult.nModified });
  } catch (err) {
    res.status(500).send(err);
  }
});

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

module.exports = app;
