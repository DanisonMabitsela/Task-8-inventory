var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Car = require('../models/carSchema');

router.post('/add', function(req, res, next) {
  console.log(req.body);

  let newCar = new Car({
    make: req.body.make,
    model: req.body.model,
    registration: req.body.registration,
    owner: req.body.owner,
    colour: req.body.colour,
    address: req.body.address
  });

  newCar.save()
    .then((newCar) => {
      res.send({ message: "car added successfully", carObj: newCar });
    })
    .catch((err) => {
      res.send(err);
    });
});

module.exports = router;
