import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './MyOrders.css';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/orders/user/${user.id}`);
      setOrders(res.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return '#28a745';
      case 'Shipped':
        return '#17a2b8';
      case 'Processing':
        return '#ffc107';
      default:
        return '#dc3545';
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="orders-container">
      <div className="container">
        <h1 className="page-title">My Orders</h1>
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You have no orders yet</p>
            <Link to="/" className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order.orderId}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="order-status">
                    <span
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.orderStatus) }}
                    >
                      {order.orderStatus}
                    </span>
                    <span
                      className={`payment-badge ${order.paymentStatus === 'Completed' ? 'completed' : 'pending'}`}
                    >
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>

                <div className="order-items">
                  {order.products.map((item, index) => (
                    <div key={index} className="order-item">
                      <div className="order-item-image">
                        {item.productId?.images && item.productId.images.length > 0 ? (
                          <img src={item.productId.images[0]} alt={item.productId.name} />
                        ) : (
                          <div className="no-image">No Image</div>
                        )}
                      </div>
                      <div className="order-item-info">
                        <h4>{item.productId?.name || 'Product'}</h4>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: ${item.price.toFixed(2)}</p>
                      </div>
                      <div className="order-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="shipping-address">
                    <strong>Shipping Address:</strong>
                    <p>
                      {order.shippingAddress.name}, {order.shippingAddress.phone}
                    </p>
                    <p>
                      {order.shippingAddress.address}, {order.shippingAddress.city} - {order.shippingAddress.pincode}
                    </p>
                  </div>
                  <div className="order-total">
                    <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;

