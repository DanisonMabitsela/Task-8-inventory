var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Car = require('../models/carSchema');

router.get('/api/cars', async function(req, res, next) {
  
  let result = await Car.find();
  res.json(result);
 
});

router.get('/api/cars5', async function(req, res, next) {
  const currentYear = new Date().getFullYear();
  const fiveYearsAgo = currentYear - 5;

  try {
    const result = await Car.find({ age: { $lt: fiveYearsAgo } });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
