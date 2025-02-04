import React, { useState, useEffect } from "react";
import "./VendorAccount.css"; 
import '../../Styles/faltuStyle.css';
import BASE_URL from "@/appConfig";

const VendorAccount = () => {
  const [vendorDetails, setVendorDetails] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`); 
      if (parts.length === 2) return parts.pop().split(";").shift();
    };
    setToken(getCookie("token"));
  }, []);

  useEffect(() => {
    if (token) {
      const fetchVendorDetails = async () => {
        try {
          const response = await fetch(`${BASE_URL}/api/loginSignup/currentUser`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const data = await response.json();

          if (response.ok) {
            const user = data.user;
            setVendorDetails(user);
            setFormData({
              mobile: user.mobile || "",
              address: user.address || "",
              companyName: user.companyName || "",
              status: user.status || "active",
              socialMediaLinks: user.socialMediaLinks || { facebook: "", twitter: "" },
              deliveryArea: user.deliveryArea || [],
            });
          }else{
            setMessage(data.message || 'Failed to fetch data');
            setTimeout(() => setMessage(""), 2000);
          }
        } catch (error) {
          console.log("Error fetching vendor details:", error);
        }
      };

      fetchVendorDetails();
    }
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNestedInputChange = (e, field) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [name]: value,
      },
    });
  };

  const handleArrayChange = (e, index) => {
    const updatedArray = [...formData.deliveryArea];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, deliveryArea: updatedArray });
  };

  const addDeliveryArea = () => {
    setFormData({ ...formData, deliveryArea: [...formData.deliveryArea, ""] });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/vendor/update_venderDetails`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if(response.ok){
        setVendorDetails(data.data); // Update with the latest details
        setEditMode(false); // Exit edit mode
      }else{
        setMessage(data.message || 'Failed update data');
        setTimeout(() => setMessage(""), 2000);
      }
    } catch (error) {
      console.log("Error updating vendor details:", error);
    }
  };

  if (!vendorDetails) return <div>Loading...</div>;

  return (
    <div className="vendor-account">
      <h1>Vendor Account</h1>
      <hr/>
      <p>{message}</p>
      {!editMode ? (
        <div className="vendor-details">
          <div>
            <p><strong>Name:</strong> {vendorDetails.name}</p>
            <p><strong>Email:</strong> {vendorDetails.email}</p>
            <p><strong>Mobile:</strong> {vendorDetails.mobile}</p>
            <p><strong>Address:</strong> {vendorDetails.address}</p>
            <p><strong>Company:</strong> {vendorDetails.companyName}</p>
            <p><strong>Status:</strong> {vendorDetails.status}</p>
            <p><strong>Delivery Areas:</strong> {vendorDetails.deliveryArea?.join(", ") || "None"}</p>
            {/* <p>
              <strong>Social Media:</strong><br />
              Facebook: {vendorDetails.socialMediaLinks?.facebook || "N/A"}<br />
              Twitter: {vendorDetails.socialMediaLinks?.twitter || "N/A"}
            </p> */}
          </div>
          <button className="button" onClick={() => setEditMode(true)}>Edit Details</button>
        </div>
      ) : (
        <div className="edit-form">
          <h2>Edit Vendor Details</h2>
          <form>
            <div className="form-group">
              <label>Mobile:</label>
              <input
                type="text"
                name="mobile"
                className="input-text"
                value={formData.mobile || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                className="input-text"
                value={formData.address || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                className="input-text"
                value={formData.companyName || ""}
                onChange={handleInputChange}
              />
            </div>
            {/* <div className="form-group">
              <label>Status:</label>
              <select
                name="status"
                value={formData.status || ""}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div> */}
            <div className="form-group">
              <label>Delivery Areas:</label>
              {formData.deliveryArea.map((area, index) => (
                <input
                  key={index}
                  type="text"
                  value={area}
                  className="input-text"
                  onChange={(e) => handleArrayChange(e, index)}
                />
              ))}
              <button className="AddArea_Butt" type="button" onClick={addDeliveryArea}>
                Add Area
              </button>
            </div>
            <div className="form-group">
              <label>Facebook:</label>
              <input
                type="text"
                name="facebook"
                className="input-text"
                value={formData.socialMediaLinks.facebook || ""}
                onChange={(e) => handleNestedInputChange(e, "socialMediaLinks")}
              />
            </div>
            <div className="form-group">
              <label>Twitter:</label>
              <input
                type="text"
                name="twitter"
                className="input-text"
                value={formData.socialMediaLinks.twitter || ""}
                onChange={(e) => handleNestedInputChange(e, "socialMediaLinks")}
              />
            </div>
          </form>
          <div>
            <button className="save-button" onClick={handleUpdate}>Save</button>
            <button className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorAccount;
