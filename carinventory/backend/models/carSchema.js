const mongoose = require("mongoose");
const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: Number,
    required: true,
  },
  registration: {
    type: String,
    required: true,
  },
  owner: {     
      type: String,
      required: true,
    },
    address: {
      
        type: String,
        required: true,
      },
      colour: {
        type: String,
        required: true,
      }
    },
  
  );

const Car = mongoose.model("Car", carSchema);

module.exports = Car;