import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { toast } from 'react-toastify';
import './Admin.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/dashboard');
      setStats(res.data.stats);
      setRecentOrders(res.data.recentOrders);
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-container">
      <div className="container">
        <div className="admin-header">
          <h1 className="page-title">Admin Dashboard</h1>
          <div className="admin-links">
            <Link to="/admin/products" className="btn btn-primary">
              Manage Products
            </Link>
            <Link to="/admin/orders" className="btn btn-primary">
              Manage Orders
            </Link>
          </div>
        </div>

        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total Products</h3>
              <p className="stat-value">{stats.totalProducts}</p>
            </div>
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p className="stat-value">{stats.totalOrders}</p>
            </div>
            <div className="stat-card">
              <h3>Total Revenue</h3>
              <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
            </div>
            <div className="stat-card">
              <h3>Pending Orders</h3>
              <p className="stat-value">{stats.pendingOrders}</p>
            </div>
          </div>
        )}

        <div className="recent-orders-section">
          <h2>Recent Orders</h2>
          {recentOrders.length === 0 ? (
            <p className="no-data">No recent orders</p>
          ) : (
            <div className="orders-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order._id}>
                      <td>{order.orderId}</td>
                      <td>{order.userId?.name || 'N/A'}</td>
                      <td>${order.totalAmount.toFixed(2)}</td>
                      <td>
                        <span className={`status-badge ${order.orderStatus.toLowerCase()}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

