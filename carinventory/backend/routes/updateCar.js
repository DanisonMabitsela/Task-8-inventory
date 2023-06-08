var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Car = require("../models/carSchema");

// Update a single car
router.put("/updateOne/:id", async function (req, res, next) {
  const id = req.params.id;
  const registration = req.body.registration;
  const owner = req.body.owner;
  const colour = req.body.colour;
  const make = req.body.make;
  const model = req.body.model;
  const address = req.body.address;

  try {
    const updatedCar = await Car.findByIdAndUpdate(id, {
      make,
      model,
      registration,
      owner,
      colour,
      address,
    });
    res.send({ message: "Car updated", carObj: updatedCar });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update multiple cars
router.put("/updateMany", async function (req, res, next) {
  const make = req.body.make;
  const model = req.body.model;
  const registration = req.body.registration;
  const owner = req.body.owner;
  const colour = req.body.colour;
  const address = req.body.address;

  try {
    const updateResult = await Car.updateMany(
      {},
      { make, model, registration, owner, colour, address }
    );
    res.send({ message: "Cars updated", carsUpdated: updateResult.nModified });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
