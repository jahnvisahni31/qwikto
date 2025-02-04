import React, { useState, useEffect } from "react";
import axios from "axios";
import style from '../../Styles/item.module.css';
import BASE_URL from "@/appConfig";

const DeleteConfirmationModal = ({ item, onClose, onDeleteSuccess }) => {
  const [token, setToken] = useState("");
  const [error, setError] = useState(""); // For showing the error message

  // Fetch token from cookies
  // console.log(item._id)
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    const yourCookieValue = getCookie("token");
    setToken(yourCookieValue || ""); // Fallback to empty string if token is missing
  }, []);

  const handleDelete = async () => {
    setError(""); // Clear previous errors
    try {
      await axios.delete(`${BASE_URL}/api/item/deleteItem`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        data: {
          id: item._id, // Send the id in the request body
        },
      });

      onDeleteSuccess(); // Notify parent component of success
    } catch (error) {
      console.error("Error deleting item:", error);
      const errorMessage = error.response?.data?.message || "Failed to delete the item. Please try again.";
      setError(errorMessage);
      setTimeout(() => setError(""), 2000);
    }
  };


  return (
    <div className={style.modal}>
      <div className={style.deletContainer}>
        <h2>Are you sure you want to delete this item?</h2>
        <p>{item.name}</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button id={style.button} className={style.update_button} onClick={handleDelete}>OK</button>
        <button id={style.button} className={style.delete_button} onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
