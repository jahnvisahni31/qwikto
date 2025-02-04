'use client';
import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import '../UserComponents/userCard.css';
import defaultImage from '../../Images/Icons/user.png';
import BASE_URL from "@/appConfig";

export default function CustomerCard(props) {
  const [mobile, setMobile] = useState(props.mobile); // Initialize state with props.mobile
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  // Update mobile when props.mobile changes
  useEffect(() => {
    setMobile(props.mobile);
  }, [props.mobile]);

  // Get token from cookies on component mount
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    setToken(getCookie("token"));
  }, []);

  const handleSubmit = async () => {
    if (!mobile) {
      setMessage("Mobile number cannot be empty");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const response = await fetch(`${BASE_URL}/api/customer/addOrUpdateMobile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token for authorization
      },
      body: JSON.stringify({ mobile }),
    });

    const data = await response.json();

    if (response.ok) {
      setMessage("Mobile number updated successfully!");
      setIsEditingMobile(false); // Exit edit mode
      setTimeout(() => setMessage(""), 2000);
      if (props.onMobileUpdate) {
        props.onMobileUpdate(mobile); // Update parent's mobile state if necessary
      } else {
        console.warn("onMobileUpdate function not provided!");
      }
    } else {
      setMessage(data.message || "Failed to update mobile number");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div className="userCardMainContainer">
      <div className="imagePairentContainer">
        <div className="imageBorderDiv">
          <img
            src={props.pic || defaultImage}
            alt="User"
            width={100}
            height={100}
          />
        </div>
      </div>
      <h2>{props.name}</h2>
      <p>{props.email}</p>

      {/* Mobile number section */}
      <div className="mobileSection">
        <input
          style={{ borderBottom: isEditingMobile ? '1px solid #000' : 'none' }}
          type="text"
          value={mobile || ''} // Ensure the value is always a string
          onChange={(e) => setMobile(e.target.value)}
          className="mobileInput"
          readOnly={!isEditingMobile} // Editable only if in edit mode
        />
        <div>
          <button
            onClick={() => {
              if (!isEditingMobile) {
                setIsEditingMobile(true);
              } else {
                handleSubmit();
              }
            }}
            className="editButton"
          >
            {isEditingMobile ? "Submit" : mobile ? "Update Mobile" : "Add Mobile"}
          </button>
          {isEditingMobile && (
            <button
              onClick={() => {
                setIsEditingMobile(false); // Cancel edit mode
                setMobile(props.mobile || ""); // Reset mobile to original value
              }}
              className="cancelButton"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Display feedback message */}
      <span className="message">{message}</span>

      <hr width="90%" style={{ margin: "10px", backgroundColor: "gray" }} />

      <ul className="listOfUsercard">
        <li onClick={() => props.onMenuClick("Order")}>Order</li>
        <li>Favorites</li>
        <li onClick={() => props.onMenuClick("ChangePassword")}>Change password</li>
        <li onClick={() => props.onMenuClick("Address")}>Address</li>
        <li onClick={props.logoutUser}>Sign Out</li>
      </ul>
    </div>
  );
}

CustomerCard.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  mobile: PropTypes.string,
  pic: PropTypes.string,
  onMobileUpdate: PropTypes.func.isRequired,
  onMenuClick: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
};
