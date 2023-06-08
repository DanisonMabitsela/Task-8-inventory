import React, { useState, useEffect } from "react";
import axios from "axios";
import Cars from "./components/cars";
import CarList from "./components/carList";

import "./App.css";

const App = () => {
  const [cars, setCars] = useState([]);
  const [editCar, setEditCar] = useState(null);
  const [carAge, setCarAge] = useState([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await axios.get("/getCars/api/cars");
      console.log(response);
      setCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCar = async (car) => {
    try {
      console.log(car);
      const response = await axios.post("/newCars/add", car);
      console.log(response);
      setCars([...cars, response.data.carObj]);
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  const updateCar = async (carId, updatedData) => {
    try {
      console.log("Update is working");
      console.log(updatedData);

      // Make a PUT request to update the car using axios
      const response = await axios.put(
        `/updateCar/updateOne/${carId}`,
        updatedData
      );
      console.log(response);
      const { message, carObj } = response.data;

      console.log(message);
      console.log("Updated car object:", carObj);

      fetchCars();
    } catch (error) {
      console.error("An error occurred while updating the car:", error);
      // Handle the error appropriately
    }
  };

  const deleteCar = async (carId) => {
    try {
      console.log("hello");
      await axios.delete(`/deleteCar/cars/${carId}`);
      fetchCars();
    } catch (error) {
      console.log(error);
    }
  };

  const findCarByAge = async () => {
    try {
      const response = await axios.get("/getCars/api/cars5");
      console.log(response);
      console.log("hello");
      setCars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const clearForm = () => {
    setEditCar(null);
  };

  return (
    <div>
      <h1>Car Inventory</h1>

      <h2>Add Car</h2>
      <Cars addCar={addCar} editCar={editCar} clearForm={clearForm} />

      <h2>Car List</h2>
      <CarList cars={cars} updateCar={updateCar} deleteCar={deleteCar} />
    </div>
  );
};

export default App;
