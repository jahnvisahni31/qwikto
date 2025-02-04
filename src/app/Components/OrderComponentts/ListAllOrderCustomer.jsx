import React, { useEffect, useState } from 'react';
import './order.css';
import BASE_URL from '@/appConfig';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(false); // Loading state for cancellation
  const [editingOrder, setEditingOrder] = useState(null); // Track which order is being edited
  const [cancelReason, setCancelReason] = useState(''); // Track the cancellation reason

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const tokenFromCookie = getCookie('token');
    setToken(tokenFromCookie);

    const fetchOrders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/order/listAllOrdersForCustomer`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${tokenFromCookie}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok && data.status) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId) => {
    if (!cancelReason.trim()) {
      alert('Cancellation reason is required.');
      return;
    }

    setCancelLoading(true); // Show loader during cancellation
    try {
      const response = await fetch(`${BASE_URL}/api/order/cancelOrder`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, reason: cancelReason }),
      });

      const data = await response.json();
      if (response.ok) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, status: 'canceled', cancellationReason: cancelReason }
              : order
          )
        );

        setEditingOrder(null); // Clear editing state
        setCancelReason(''); // Clear reason input
      } else {
        alert(`Failed to cancel order: ${data.message}`);
      }
    } catch (error) {
      console.error('Error canceling order:', error);
      alert('An error occurred while canceling the order. Please try again.');
    } finally {
      setCancelLoading(false); // Hide loader after cancellation
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  return (
    <div className="order-list">
      <h1>All Orders</h1>
      <hr style={{margin:'5px 0px'}}/>
      {orders.length==0?'You dovnot have any orders yet':''}
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="order-item">
            <div className="order-details">
              <img
                src={order.item.images[0]}
                alt={order.item.name}
                className="order-image"
              />
              <div className="order-info">
                <p>{order.item.name}</p>
                <div>
                  <p>
                    <strong>Price:</strong> ₹{order.item.vendorPrice}
                  </p>
                  <p>
                    <strong>Category:</strong> {order.item.category}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Quantity:</strong> {order.quantity}
                  </p>
                  <p>
                    <strong>Total Price:</strong> ₹{order.totalPrice}
                  </p>
                </div>
                <p className={`status ${order.status}`}>
                  <strong>Status:</strong> {order.status}
                </p>
                {order.cancellationReason && (
                  <p className="cancellation-reason">
                    <strong>Cancellation Reason:</strong> {order.cancellationReason}
                  </p>
                )}
              </div>
            </div>
            {editingOrder === order._id ? (
              <div className="cancel-form">
                <input
                  type="text"
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter cancellation reason"
                  className="cancel-input"
                />
                <button
                  className="submit-cancel-button"
                  onClick={() => handleCancelOrder(order._id)}
                  disabled={cancelLoading}
                >
                  {cancelLoading ? 'Cancelling...' : 'Submit'}
                </button>
                <button
                  className="cancel-edit-button"
                  onClick={() => {
                    setEditingOrder(null);
                    setCancelReason('');
                  }}
                  disabled={cancelLoading}
                >
                  Cancel
                </button>
              </div>
            ) : (
              order.status !== 'canceled' && (
                <button
                  className="cancel-button"
                  onClick={() => setEditingOrder(order._id)}
                >
                  Cancel Order
                </button>
              )
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
