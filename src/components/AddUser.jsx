import React, { useState } from "react";

import "./AddUser.css";

export const AddUser = ({ closeModal, onSubmit, defaultValue, onUpdate }) => {
  const fullName = defaultValue
    ? defaultValue.firstName + " " + defaultValue.lastName
    : "";

  const [formState, setFormState] = useState(
    {
      ...defaultValue,
      customerName: defaultValue ? fullName : "",
      city: defaultValue ? defaultValue.company.address.city : "",
    } || {
      customerName: fullName,
      phone: "",
      gender: "Select Gender",
      university: "",
      city: "",
    }
  );
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (
      formState.customerName &&
      formState.phone &&
      formState.gender &&
      formState.university &&
      formState.city
    ) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onUpdate(formState, defaultValue.id);
    closeModal();
  };

  let isEditMode;
  if (defaultValue === false) {
    isEditMode = false;
  } else {
    isEditMode = true;
  }

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name</label>
            <input
              name="customerName"
              onChange={handleChange}
              value={formState.customerName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              name="phone"
              onChange={handleChange}
              value={formState.phone}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              onChange={handleChange}
              value={formState.gender}
            >
              <option value="" selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="university">University</label>
            <input
              name="university"
              onChange={handleChange}
              value={formState.university}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input name="city" onChange={handleChange} value={formState.city} />
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button
            type="submit"
            className="btn"
            onClick={isEditMode ? handleUpdateUser : handleSubmit}
          >
            {isEditMode ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
