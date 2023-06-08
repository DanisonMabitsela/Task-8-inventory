import React, { useState, useEffect } from "react";

const CarForm = ({ addCar, updateCar, clearForm }) => {
  const [owner, setOwner] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registration, setRegistration] = useState("");
  const [colour, setColour] = useState("");
  const [address, setAddress] = useState("");
  

  useEffect(() => {
    if (updateCar) {
      setOwner(updateCar.owner);
      setMake(updateCar.make);
      setModel(updateCar.model);
      setRegistration(updateCar.registration);
      setColour(updateCar.colour);
    }
  }, [updateCar]);

 

  const handleSubmit = (e) => {
    e.preventDefault();

    if (updateCar) {
      // Perform update logic
      const updatedCar = {
        
        make,
        model,
        registration,
        colour,
        owner,
        address
      };
      // Pass the updated car to the updateCar function in App.js
      updateCar(updateCar._id, updatedCar);
      clearForm();
    } else {
      // Perform add logic
      if (!isNaN(model)) {
      const newCar = {
        
        make,
        model,
        registration,
        colour,
        owner,
        address
      };
      addCar(newCar);
      clearForm();
    } else {
      alert("Model has to be numeric")
    }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="owner"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Make"
        value={make}
        onChange={(e) => setMake(e.target.value)}
      />
      <input
        type="text"
        placeholder="Model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
      />
      <input
        type="text"
        placeholder="Registration"
        value={registration}
        onChange={(e) => setRegistration(e.target.value)}
      />
      <input
        type="text"
        placeholder="colour"
        value={colour}
        onChange={(e) => setColour(e.target.value)}
      />
      <input
        type="text"
        placeholder="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <button type="submit">{updateCar ? "Update Car" : "Add Car"}</button>
    </form>
  );
};

export default CarForm;