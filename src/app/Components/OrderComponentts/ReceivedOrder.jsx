import React, { useEffect, useState } from 'react';
import './order.css'; // Import your CSS file for styling
import BASE_URL from '@/appConfig';

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState('');
    const [showCancelForm, setShowCancelForm] = useState(false);
    const [cancellationReason, setCancellationReason] = useState('');
    const [selectedOrderId, setSelectedOrderId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };
        setToken(getCookie('token'));
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            if (token) {
                try {
                    const response = await fetch(`${BASE_URL}/api/order/listGetOrdersForVendor`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    const data = await response.json();
                    if (data.success) {
                        setOrders(data.orders);
                    } else {
                        console.error('Failed to fetch orders');
                    }
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            }
        };
        fetchOrders();
    }, [token]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'green';
            case 'pending':
                return 'orange';
            case 'canceled':
                return 'red';
            default:
                return 'gray';
        }
    };

    const handleAcceptOrder = async (orderId) => {
        if (!token) return;

        try {
            const response = await fetch(`${BASE_URL}/api/order/acceptOrder`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage('Order accepted successfully')
                setTimeout(() => setMessage(""), 2000);
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === orderId ? { ...order, status: 'accepted', updatedAt: new Date().toISOString() } : order
                    )
                );
            } else {
                setMessage(data.message || 'Failed to accept the order')
                setTimeout(() => setMessage(""), 2000);
            }
        } catch (error) {
            console.error('Error accepting order:', error);
            setMessage('An error occurred while accepting the order')
            setTimeout(() => setMessage(""), 2000);
        }
    };

    const handleCancelOrder = (orderId) => {
        setSelectedOrderId(orderId);
        setShowCancelForm(true);
    };

    const submitCancellation = async () => {
        if (!cancellationReason) {
            setMessage('Cancellation reason is required.')
            setTimeout(() => setMessage(""), 2000);
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/api/order/cancelOrder`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId: selectedOrderId, reason: cancellationReason }),
            });

            const data = await response.json();
            // console.log(data)
            if (data.success) {
                setMessage('Order canceled successfully')
                setTimeout(() => setMessage(""), 2000);
                setOrders((prevOrders) =>
                    prevOrders.map((order) =>
                        order._id === selectedOrderId ? { ...order, status: 'canceled', updatedAt: new Date().toISOString() } : order
                    )
                );
                setShowCancelForm(false);
                setCancellationReason('');
            } else {
                setMessage(data.message || 'Failed to cancel the order')
                setTimeout(() => setMessage(""), 2000);
            }
        } catch (error) {
            setMessage('An error occurred while canceling the order')
            setTimeout(() => setMessage(""), 2000);
        }
    };

    const closeCancelForm = () => {
        setShowCancelForm(false);
        setCancellationReason('');
    };

    return (
        <div className="order-list">
            <h1 className="order-list__title">Order List</h1>
            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <ul className="order-list__ul">
                    {orders.map((order) => (
                        <li key={order._id} className="order-list__item">
                            <div className="order-list__item-content">
                                <div className="order-list__item-info">
                                    <div className="order-list__item-image">
                                        <img src={order.item?.images?.[0] || '/default-image.jpg'} alt={order.item?.name || 'Item'} />
                                    </div>
                                    <div className="order-list__item-titlebasic_detailsContainer">
                                        <h2 className="order-list__item-title">{order.item?.name || 'No name available'}</h2>
                                        <div className="order-list__item-basic_detailsContainer">
                                            <p className="order-list__item-detail">
                                                <strong>Quantity:</strong> {order.quantity || 'N/A'}
                                            </p>
                                            <p className="order-list__item-detail">
                                                <strong>Status:</strong>
                                                <span
                                                    className="order-list__status"
                                                    style={{ color: getStatusColor(order.status || 'unknown') }}
                                                >
                                                    {order.status || 'Unknown'}
                                                </span>
                                            </p>
                                            <p className="order-list__item-detail">
                                                <strong>Price:</strong> ₹{order.item?.vendorPrice || 'N/A'}
                                            </p>
                                            <p className="order-list__item-detail">
                                                <strong>Total Price:</strong> ₹{order.totalPrice || 'N/A'}
                                            </p>
                                        </div>
                                        <p className="order-list__item-description">
                                            {order.item?.description || 'No description available'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="order-list__item-details">
                                <div className="order-list__customer-info">
                                    <p className="order-list__item-detail">
                                        <strong>Customer Name:</strong> {order.customer?.name || 'N/A'}
                                    </p>
                                    <p className="order-list__item-detail">
                                        <strong>Address:</strong>
                                        {`${order.customer?.address?.street || ''}, ${order.customer?.address?.addressLine2 || ''}, ${order.customer?.address?.city || ''}, ${order.customer?.address?.state || ''}, ${order.customer?.address?.country || ''}, ${order.customer?.address?.postalCode || ''}`}
                                    </p>
                                    <p className="order-list__item-detail">
                                        <strong>Landmark:</strong> {order.customer?.address?.landmark || 'N/A'}
                                    </p>
                                </div>
                                <div className="order-list__timestamps">
                                    <p className="order-list__item-detail">
                                        <strong>Order At:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A'}
                                    </p>
                                    <p className="order-list__item-detail">
                                        <strong>Status Change At:</strong> {order.updatedAt ? new Date(order.updatedAt).toLocaleString() : 'N/A'}
                                    </p>
                                </div>
                                {order.status === 'pending' && (
                                    <>
                                        <button
                                            className="order-list__accept-button"
                                            onClick={() => handleAcceptOrder(order._id)}
                                        >
                                            Accept Order
                                        </button>
                                        <button
                                            className="order-list__cancel-button"
                                            onClick={() => handleCancelOrder(order._id)}
                                        >
                                            Cancel Order
                                        </button>
                                    </>
                                )}
                                {order.status === 'canceled' && order.cancellationReason && (
                                    <p className="order-list__item-cancellationReasondetail">
                                        <strong>Cancellation Reason:</strong> {order.cancellationReason}
                                    </p>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {showCancelForm && (
                <div className="cancel-form">
                    <h2>Cancel Order</h2>
                    <p style={{ color: 'red' }}>{message}</p>
                    <textarea
                        placeholder="Enter cancellation reason"
                        value={cancellationReason}
                        onChange={(e) => setCancellationReason(e.target.value)}
                        style={{ maxWidth: '50vw', maxHeight: '100px' }}
                    ></textarea>
                    <div className="cancel-form__buttons">
                        <button className="order-list__accept-button" onClick={submitCancellation}>Submit</button>
                        <button className="order-list__cancel-button" onClick={closeCancelForm}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderList;
