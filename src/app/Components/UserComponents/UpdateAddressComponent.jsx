import React, { useState } from 'react';
import BASE_URL from '@/appConfig';
import { TextField, FormControl, InputLabel, MenuItem, Select, CircularProgress, Typography } from '@mui/material';
import './address.css';

const UpdateAddressComponent = ({ address, onAddressUpdated, onCancel }) => {
    const [formData, setFormData] = useState({
        street: address.street || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.postalCode || '',
        country: address.country || '',
        landmark: address.landmark || '',
        addressType: address.addressType || '',
        description: address.description || '',
        addressLine2: address.addressLine2 || '',
        isPrimary: address.isPrimary || false,
        geoCoordinates: address.geoCoordinates || { latitude: '', longitude: '' },
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'latitude' || name === 'longitude') {
            setFormData({
                ...formData,
                geoCoordinates: {
                    ...formData.geoCoordinates,
                    [name]: value,
                },
            });
        } else if (type === 'checkbox') {
            setFormData({
                ...formData,
                [name]: checked,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/customer/updateAddress`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${document.cookie.split('token=')[1]}`,
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Address updated successfully!');
                onAddressUpdated(formData); // Notify parent about updated address
            } else {
                setMessage(data.message || 'Failed to update address.');
            }
        } catch (error) {
            console.error('Error updating address:', error);
            setMessage('An error occurred while updating the address.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="update-address-form">
            <Typography variant="h5" gutterBottom>
                Update Address
            </Typography>
            <TextField
                label="Street"
                variant="outlined"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                margin="normal"
                fullWidth
            />
            <TextField
                label="City"
                variant="outlined"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                margin="normal"
                fullWidth
            />
            <TextField
                label="State"
                variant="outlined"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                margin="normal"
                fullWidth
            />
            <TextField
                label="Postal Code"
                variant="outlined"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                margin="normal"
                fullWidth
            />
            <TextField
                label="Country"
                variant="outlined"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                margin="normal"
                fullWidth
            />
            <TextField
                label="Landmark"
                variant="outlined"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Address Line 2"
                variant="outlined"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <FormControl fullWidth margin="normal">
                <InputLabel>Address Type</InputLabel>
                <Select
                    name="addressType"
                    value={formData.addressType}
                    onChange={handleChange}
                >
                    <MenuItem value="home">Home</MenuItem>
                    <MenuItem value="office">Office</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Description"
                variant="outlined"
                name="description"
                value={formData.description}
                onChange={handleChange}
                margin="normal"
                fullWidth
                multiline
                rows={3}
            />
            <div className="checkbox-container">
                <label>
                    <input
                        type="checkbox"
                        name="isPrimary"
                        checked={formData.isPrimary}
                        onChange={handleChange}
                    />
                    Primary Address
                </label>
            </div>
            <TextField
                label="Latitude"
                variant="outlined"
                name="latitude"
                value={formData.geoCoordinates.latitude}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Longitude"
                variant="outlined"
                name="longitude"
                value={formData.geoCoordinates.longitude}
                onChange={handleChange}
                margin="normal"
                fullWidth
            />
            <div className="button-group">
                <button type="submit" className="submit_button" disabled={isLoading}>
                    {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                </button>
                <button type="button" className="cancel_button" onClick={onCancel}>
                    Cancel
                </button>
            </div>
            {message && (
                <Typography variant="body2" color="textSecondary" align="center" marginTop={2}>
                    {message}
                </Typography>
            )}
        </form>
    );
};

export default UpdateAddressComponent;
