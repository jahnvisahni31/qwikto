'use client';
import { useState, useEffect } from 'react';
import styles from '../../Styles/addItem.module.css';
import BASE_URL from '@/appConfig';

export default function AddItem() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    vendorPrice: '',
    category: '',
    sku: '',
    stockQuantity: '',
    status: 'active',
    images: [],
    vendor: '',
  });
  const [imageInput, setImageInput] = useState('');
  const [message, setMessage] = useState('');
  const [token, setCookieValue] = useState('');
  // const [vendorId, setVendorId] = useState('');


  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    const yourCookieValue = getCookie('token');
    setCookieValue(yourCookieValue);
  }, []);
  useEffect(() => {
    const fetchCurrentData = async () => {
      try {

        const response = await fetch(`${BASE_URL}/api/loginSignup/currentUser`, {
          method: "Get",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        const newData = await response.json();
        if (response.ok) {
          setFormData((prev) => ({ ...prev, vendor: newData.user._id }));
        }

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCurrentData();
  }, [token])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddImage = () => {
    if (!imageInput.trim()) {
      setMessage('Please enter a valid image URL.');
      setTimeout(() => setMessage(""), 2000);
      return; // Do nothing if the input is empty
    }

    if (formData.images.length < 5) {
      setFormData({ ...formData, images: [...formData.images, imageInput] });
      setImageInput('');
    } else {
      setMessage('You can upload a maximum of 5 images.');
      setTimeout(() => setMessage(""), 2000);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/api/item/addItem`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Item added successfully!');
        setTimeout(() => setMessage(""), 2000);
        setFormData({
          name: '',
          description: '',
          vendorPrice: '',
          category: '',
          sku: '',
          stockQuantity: '',
          status: 'active',
          images: [],
          vendor: '',
        });
      } else {
        setMessage(result.message || 'Error adding item.');
        setTimeout(() => setMessage(""), 2000);

      }
    } catch (error) {
      setMessage('An error occurred while adding the item.');
      setTimeout(() => setMessage(""), 2000);
      console.error(error);
    }
  };

  return (
    <div className={styles.addItemContainer}>
      <h2>Add New Item</h2>
      <hr style={{ margin: '10px 0px' }} />
      {message && <p className={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Item Name</label>
          <input
            type="text"
            name="name"
            placeholder='Item name'
            value={formData.name}
            onChange={handleInputChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Price (₹)</label>
          <input
            type="number"
            name="vendorPrice" // Changed from 'price' to 'vendorPrice'
            placeholder="Price"
            value={formData.vendorPrice}
            onChange={handleInputChange}
            className={styles.input}
            min="0"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={styles.input}
            required
          >
            <option value="" disabled>Select a category</option>
            <option value="Fruits">Fruits</option>
            <option value="Flower">Flower</option>
            <option value="Leaves">Leaves</option>
            <option value="Root Vegetables">Root Vegetables</option>
            <option value="Pods & Seeds">Pods & Seeds</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stockQuantity"
            placeholder='Stock Quantity'
            value={formData.stockQuantity}
            onChange={handleInputChange}
            className={styles.input}
            min="0"
            required
          />
        </div>
        {/* <div className={styles.formGroup}>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className={styles.select}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div> */}
        <div className={styles.formGroup}>
          <label>Images (URLs)</label>
          <div style={{ gap: '20px' }}>
            <input
              type="url"
              placeholder="Image URL"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className={styles.input}
            />
            <button
              type="button"
              onClick={handleAddImage}
              disabled={formData.images.length >= 5}
              className={styles.button}
            >
              Add Image
            </button>
          </div>
          <ul className={styles.list}>
            {formData.images.map((image, index) => (
              <li key={index} className={styles.listItem}>
                <img src={image} alt={`Image ${index + 1}`} width={50} />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className={styles.button}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            placeholder='Description'
            value={formData.description}
            onChange={handleInputChange}
            className={styles.textarea}
            required
          />
        </div>
        <button type="submit" className={styles.button}>
          Add Item
        </button>
      </form>
    </div>
  );
}
