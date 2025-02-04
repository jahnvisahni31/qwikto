import React, { useState, useEffect } from "react";
import axios from "axios";
import style from '../../Styles/item.module.css';
import BASE_URL from "@/appConfig";

const UpdateItemForm = ({ item, onClose, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    name: item?.name || "",
    category: item?.category || "",
    vendorPrice: item?.vendorPrice || 0,
    image: item?.image?.[0] || "",
    id:item._id
  });

  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  // Fetch the token from cookies
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`); 
      if (parts.length === 2) return parts.pop().split(";").shift(); 
    };

    const fetchedToken = getCookie("token");
    setToken(fetchedToken || ""); // Fallback to empty string if token is missing
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      // Make the API request with the token in headers
      const response = await axios.put(
        `${BASE_URL}/api/item/updateItem`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("Update successful:", response.data);
      onUpdateSuccess(response.data.data); // Pass the updated item to the parent component
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Failed to update the item. Please try again.");
    }
  };

  return (
    <div className={style.modal}>
      <form onSubmit={handleSubmit}>
        <h2>Update Item</h2>
        <div>

          {error && <p style={{ color: "red" }}>{error}</p>}
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              aria-label="Item Name"
              required
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              aria-label="Item Category"
              required
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={formData.vendorPrice}
              onChange={handleChange}
              aria-label="Item Price"
              required
              min="0"
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              aria-label="Item Image URL"
            />
          </label>
        </div>
        <button id={style.button} className={style.update_button} type="submit">Update</button>
        <button  id={style.button} className={style.delete_button}  type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
