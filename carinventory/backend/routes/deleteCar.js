var express = require('express');
var router = express.Router();
const Car = require('../models/carSchema');
const objectId = require("mongodb").ObjectId;

router.delete('/cars/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCar = await Car.deleteOne({_id: id});

    if (deletedCar) {
      res.json({ message: "Car deleted successfully", carObj: deletedCar });
    } else {
      res.status(404).json({ message: "Car not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error", error: err });
  }
});

module.exports = router;
