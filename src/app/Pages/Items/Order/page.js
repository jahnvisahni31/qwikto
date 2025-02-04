'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import style from './order.module.css';
import { useRouter } from 'next/navigation';
import SuccessAnimation from '../../../Components/SuccessAnimation'; // Import your SuccessAnimation component
import BASE_URL from '@/appConfig';

// Your OrderPage component
const OrderPage = () => {
  const searchParams = useSearchParams();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity
  const [token, setToken] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // Parse item data from the query string
  useEffect(() => {
    const itemData = searchParams.get('item');
    if (itemData) {
      setItem(JSON.parse(itemData));
    } else {
      router.back();
    }
  }, [searchParams, router]);

  // Fetch token from cookies
  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };
    setToken(getCookie('token'));
  }, []);

  // Handle quantity change
  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(value > 0 ? value : 1); // Ensure minimum quantity is 1
  };

  // Handle the back button click
  const handleBackButton = () => {
    router.back(); // Go back to the previous page
  };

  // Handle order submission
  const handleOrderSubmit = async () => {
    if (!item || !quantity || !token) {
      alert('Invalid order details or missing authentication token.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/order/orderItem`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          itemId: item._id, // Assuming `item.id` contains the item's unique ID
          quantity: quantity,
        }),
      });

      const data = await response.json();
      // console.log(data.message)
      if (response.ok) {
        setMessage('Order placed successfully!');
        setShowAnimation(true);

        // Redirect to home page after 2 seconds
        setTimeout(() => {
          setShowAnimation(false);
          router.push('/'); // Navigate to the home page
        }, 2000);
      } else {
        alert(`Failed to place order: ${data.message}`);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  if (!item) {
    return <div>Loading item details...</div>;
  }

  if (showAnimation) {
    return (
      <div className={style.container}>
        <div>
          <SuccessAnimation />
          <p>{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={style.order_page}>
        <h1 className={style.page_title}>Order Details</h1>
        <div className={style.order_details_container}>
          {/* Image Scroller */}
          <div className={style.image_scroller}>
            {item.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                className={style.product_image}
              />
            ))}
          </div>

          {/* Item Details */}
          <div className={style.item_detils_container}>
            <div className={style.item_details}>
              <p> {item.name}</p>
              <p> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Price:</strong> <span className={style.price}>₹{item.price}</span></p>
              <p className={style.status}>
                <strong>Stock Quantity:</strong> {item.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className={style.quantity_selector}>
              <label htmlFor="quantity" className={style.quantity_label}>
                <strong>Quantity:</strong>
              </label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={item.stockQuantity}
                value={quantity}
                onChange={handleQuantityChange}
                className={style.quantity_input}
              />
            </div>

            {/* Total Price */}
            <p className={style.total_price}><strong>Total:</strong> ₹{(quantity * item.price).toFixed(2)}</p>

            {/* Buttons */}
            <div className={style.button_container}>
              <button
                onClick={handleOrderSubmit}
                className={style.place_order_button}
              >
                Place Order
              </button>

              <button
                onClick={handleBackButton}
                className={style.back_button}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrap the component with Suspense
const OrderPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <OrderPage />
  </Suspense>
);

export default OrderPageWithSuspense;
