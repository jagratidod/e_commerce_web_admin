import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import './Admin.css';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get('/orders');
      setOrders(res.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, orderStatus, paymentStatus) => {
    try {
      await api.put(`/orders/${orderId}/status`, {
        orderStatus,
        paymentStatus
      });
      toast.success('Order status updated');
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="admin-container">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Manage Orders</h1>
          <Link to="/admin/dashboard" className="btn btn-secondary">
            Back to Dashboard
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="no-data">No orders found</div>
        ) : (
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Order Status</th>
                  <th>Payment Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td>{order.orderId}</td>
                    <td>
                      <div>
                        <strong>{order.userId?.name || 'N/A'}</strong>
                        <br />
                        <small>{order.userId?.email || ''}</small>
                      </div>
                    </td>
                    <td>
                      {order.products.length} item(s)
                      <button
                        className="btn-link"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View Details
                      </button>
                    </td>
                    <td>${order.totalAmount.toFixed(2)}</td>
                    <td>
                      <select
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value, order.paymentStatus)
                        }
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, order.orderStatus, e.target.value)
                        }
                        className="status-select"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setSelectedOrder(order)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {selectedOrder && (
          <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Order Details - {selectedOrder.orderId}</h2>
                <button
                  className="close-btn"
                  onClick={() => setSelectedOrder(null)}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                <div className="order-detail-section">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {selectedOrder.userId?.name}</p>
                  <p><strong>Email:</strong> {selectedOrder.userId?.email}</p>
                </div>

                <div className="order-detail-section">
                  <h3>Shipping Address</h3>
                  <p>{selectedOrder.shippingAddress.name}</p>
                  <p>{selectedOrder.shippingAddress.address}</p>
                  <p>
                    {selectedOrder.shippingAddress.city} - {selectedOrder.shippingAddress.pincode}
                  </p>
                  <p>Phone: {selectedOrder.shippingAddress.phone}</p>
                </div>

                <div className="order-detail-section">
                  <h3>Order Items</h3>
                  <div className="order-items-list">
                    {selectedOrder.products.map((item, index) => (
                      <div key={index} className="order-item-detail">
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
                          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="order-detail-section">
                  <h3>Order Summary</h3>
                  <p><strong>Total Amount:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
                  <p><strong>Order Status:</strong> {selectedOrder.orderStatus}</p>
                  <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>
                  <p><strong>Order Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;

