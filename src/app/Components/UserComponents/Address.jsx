import React, { useState, useEffect } from 'react';
import BASE_URL from '@/appConfig';
import AddAddressComponent from './AddAddressComponent';
import UpdateAddressComponent from './UpdateAddressComponent'; // Import the Update Address Component
import './address.css'

const ShowAddressComponent = () => {
  const [address, setAddress] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // For toggling edit mode
  const [token, setToken] = useState('');

  // Get the token from cookies
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const savedToken = getCookie('token');
    setToken(savedToken || ''); // Set token to empty string if not found
  }, []);

  // Fetch the address from the API
  useEffect(() => {
    const fetchAddress = async () => {
      if (!token) {
        console.warn('Token is not available yet.');
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/api/customer/getAddress`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          console.error('Error fetching address:', response.statusText);
          setAddress(null); // Handle failure
          return;
        }

        const data = await response.json();
        if (data.success) {
          setAddress(data.data);
        } else {
          setAddress(null);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    fetchAddress();
  }, [token]);

  // Handle the Add Address click
  const handleAddAddressClick = () => {
    setIsAdding(true);
  };

  // Handle address added successfully (from AddAddressComponent)
  const handleAddressAdded = (newAddress) => {
    setAddress(newAddress);
    setIsAdding(false); // Close the form after adding the address
  };

  // Handle edit address (to update an existing address)
  const handleEditAddressClick = () => {
    setIsEditing(true); // Show the edit form
  };

  // Handle address updated successfully (from UpdateAddressComponent)
  const handleAddressUpdated = (updatedAddress) => {
    setAddress(updatedAddress);
    setIsEditing(false); // Close the form after updating the address
  };

  // Handle canceling the update
  const handleCancelUpdate = () => {
    setIsEditing(false); // Close the form without making changes
  };

  return (
    <div className="container">
      <h2>Your Address</h2>
      <hr style={{margin:'10px  0px'}}/>
      <div className="address-container">

        {address ? (
          <div className="address-display">
            <div  className="address-details">

              {address.street && <p><strong>Street:</strong> {address.street}</p>}
              {address.city && <p><strong>City:</strong> {address.city}</p>}
              {address.state && <p><strong>State:</strong> {address.state}</p>}
              {address.postalCode && <p><strong>Postal Code:</strong> {address.postalCode}</p>}
              {address.country && <p><strong>Country:</strong> {address.country}</p>}
              {address.landmark && <p><strong>Landmark:</strong> {address.landmark}</p>}
              {address.addressType && <p><strong>Address Type:</strong> {address.addressType}</p>}
              {address.addressLine2 && <p><strong>Address Line 2:</strong> {address.addressLine2}</p>}
              {address.description && <p><strong>Description:</strong> {address.description}</p>}
              {address.isPrimary !== undefined && <p><strong>Primary Address:</strong> {address.isPrimary ? 'Yes' : 'No'}</p>}
              {address.geoCoordinates && address.geoCoordinates.latitude && address.geoCoordinates.longitude && (
                <p>
                  <strong>Coordinates:</strong> Latitude: {address.geoCoordinates.latitude}, Longitude: {address.geoCoordinates.longitude}
                </p>
              )}
            </div>
            <div className='address-form'>
                <p>{address.street}, {address.city}, {address.state}, {address.postalCode}, {address.country}, {address.landmark}, {address.addressType}, {address.addressLine2}, {address.description}</p>
              </div>

            {/* Button to update address */}
            <button onClick={handleEditAddressClick} className="edit-button">
              Update Address
            </button>
          </div>
        ) : (
          <div className="no-address">
            <p>You don&apos;t have an address saved yet.</p>
            <button onClick={handleAddAddressClick} className="add-button">
              Add Address
            </button>
          </div>
        )}

        {/* Conditionally render Add Address Form */}
        {isAdding && <AddAddressComponent onAddressAdded={handleAddressAdded} />}

        {/* Conditionally render Update Address Form */}
        {isEditing && (
          <UpdateAddressComponent
            address={address}
            onAddressUpdated={handleAddressUpdated}
            onCancel={handleCancelUpdate} // Pass the cancel function to the Update Address component
          />
        )}
      </div>
    </div>
  );
};

export default ShowAddressComponent;
