import React, { useState, useEffect } from 'react';
import BASE_URL from '@/appConfig';
import { TextField, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel, Button, Box, CircularProgress, Typography } from '@mui/material';

const AddAddressComponent = ({ onAddressAdded }) => {
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState('');
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        landmark: '',
        addressType: 'home',
        description: '',
        addressLine2: '',
        isPrimary: false,
        geoCoordinates: { latitude: '', longitude: '' },
    });

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
        setToken(getCookie('token'));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'latitude' || name === 'longitude') {
            setFormData((prevState) => ({
                ...prevState,
                geoCoordinates: {
                    ...prevState.geoCoordinates,
                    [name]: value,
                },
            }));
        } else {
            setFormData((prevState) => ({ ...prevState, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/customer/addAddress`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setMessage('Address added successfully!');
                setTimeout(() => setMessage(''), 2000);
                onAddressAdded(formData); // Show the newly added address
            } else {
                setMessage(data.message);
                setTimeout(() => setMessage(''), 2000);
            }
        } catch (error) {
            console.error('Error adding address:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        onAddressAdded(null);
    };

    return (
        <Box className="address-form-container" sx={{ maxWidth: 600, margin: '0 auto' }}>
            <Typography variant="h5" gutterBottom>
                Add New Address
            </Typography>
            <form onSubmit={handleSubmit} className="address-form">
                <TextField
                    label="Street"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Postal Code"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Address Line 2"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Address Type</InputLabel>
                    <Select
                        name="addressType"
                        value={formData.addressType}
                        onChange={handleChange}
                        label="Address Type"
                    >
                        <MenuItem value="home">Home</MenuItem>
                        <MenuItem value="office">Office</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={3}
                    margin="normal"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            name="isPrimary"
                            checked={formData.isPrimary}
                            onChange={(e) =>
                                setFormData((prevState) => ({
                                    ...prevState,
                                    isPrimary: e.target.checked,
                                }))
                            }
                        />
                    }
                    label="Set as Primary Address"
                />
                <Box display="flex" gap={2} marginBottom={2}>
                    <TextField
                        label="Latitude"
                        name="latitude"
                        type="number"
                        value={formData.geoCoordinates.latitude}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        label="Longitude"
                        name="longitude"
                        type="number"
                        value={formData.geoCoordinates.longitude}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Button type="submit" variant="contained" color="primary" disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Submit'}
                    </Button>
                    <Button type="button" variant="outlined" color="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Box>
                {message && (
                    <Typography variant="body2" color="textSecondary" align="center" marginTop={2}>
                        {message}
                    </Typography>
                )}
            </form>
        </Box>
    );
};

export default AddAddressComponent;
