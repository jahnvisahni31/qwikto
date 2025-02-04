'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import UpdateItemForm from "./UpdateItemForm";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import style from '../../Styles/item.module.css';
import BASE_URL from "@/appConfig";
import ItemDetails from "./ItemDetails";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [token, setCookieValue] = useState("");

  // Fetch token from cookies
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    const yourCookieValue = getCookie("token");
    setCookieValue(yourCookieValue);
  }, []);

  // Fetch items using token
  useEffect(() => {
    const fetchItems = async () => {
      if (!token) return; // Wait until token is available
      try {
        const response = await axios.get(`${BASE_URL}/api/item/allItemsVendor`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token
          },
        });
        setItems(response.data.data);  // Set fetched items to state
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };

    fetchItems();
  }, [token]);



  // Handle Update
  const handleUpdate = (item) => {
    setSelectedItem(item);
    setShowUpdateForm(true);
  };

  // Handle Delete
  const handleDelete = (item) => {
    setSelectedItem(item);
    setShowDeleteModal(true);
  };

  // Open Item Details
  const handleSeeMore = (item) => {
    setSelectedItem(item);
    setShowDetails(true);
  };

  // Update the item in the list after a successful update
  const updateItemInList = (updatedItem) => {
    if (!updatedItem || !updatedItem._id) {
      console.error("Invalid updated item:", updatedItem);
      return; // Avoid proceeding if updatedItem is invalid
    }
    // Find the index of the item in the list
    const updatedItems = items.map((item) =>
      item._id === updatedItem._id ? updatedItem : item
    );
    // console.log("Updated items list:", updatedItems); // Log to verify
    setItems(updatedItems);  // Update the state with the updated list
  };

  // Remove the item from the list after a successful delete
  const removeItemFromList = (itemId) => {
    const filteredItems = items.filter((item) => item._id !== itemId);
    setItems(filteredItems); // Set the filtered list to state
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'active':
        return { color: 'green', fontWeight: 'bold' };
      case 'inactive':
        return { color: 'gray', fontStyle: 'italic' };
      case 'out_of_stock':
        return { color: 'red', textDecoration: 'underline' };
      default:
        return { color: 'black' };
    }
  };

  return (
    <div>
      <h1 className={style.itemList_heading}>Item List</h1>
      <hr />
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        <ul className={style.item_ist}>
          {items.map((item) => (
            <li key={item._id}>
              {item.images && item.images.length > 0 ? (
                <img
                  src={item.images[0]}
                  alt={item.name} ItemDetails
                  style={{ width: "70px" }}
                />
              ) : (
                <p>No images available</p>
              )}
              <div className={style.itemDtails}>
                <h3>{item.name}</h3>
                <p>Category: {item.category}</p>
                <p>Price: {item.vendorPrice}</p>
                <p>
                  Status: <b style={getStatusStyle(item.status)}>{item.status}</b>
                </p>
                <div>
                  <button className={style.update_button} onClick={() => handleUpdate(item)}>Update</button>
                  <button className={style.delete_button} onClick={() => handleDelete(item)}>Delete</button>
                  <button className={style.seeMore_button} onClick={() => handleSeeMore(item)}>See More</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {showUpdateForm && (
        <UpdateItemForm
          item={selectedItem}
          onClose={() => setShowUpdateForm(false)}
          onUpdateSuccess={(updatedItem) => {
            updateItemInList(updatedItem); // Ensure updatedItem is correctly passed
            setShowUpdateForm(false);
            setSelectedItem(null); // Reset selectedItem after update
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteConfirmationModal
          item={selectedItem}
          onClose={() => setShowDeleteModal(false)}
          onDeleteSuccess={() => {
            removeItemFromList(selectedItem._id);
            setShowDeleteModal(false);
            setSelectedItem(null); // Reset selectedItem after deletion
          }}
        />
      )}
      {showDetails && (
        <ItemDetails
          item={selectedItem}
          onClose={() => {
            setShowDetails(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

export default ItemList;
