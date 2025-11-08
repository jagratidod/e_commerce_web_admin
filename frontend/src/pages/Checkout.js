import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Checkout.css';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        products: cart.map(item => ({
          productId: item._id,
          quantity: item.quantity
        })),
        shippingAddress: formData
      };

      const res = await api.post('/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      navigate(`/my-orders`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="container">
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button onClick={() => navigate('/')} className="btn btn-primary">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="container">
        <h1 className="page-title">Checkout</h1>
        <div className="checkout-content">
          <div className="checkout-form-section">
            <h2>Shipping Address</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-large"
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </form>
          </div>

          <div className="order-summary-section">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map(item => (
                <div key={item._id} className="order-item">
                  <div className="order-item-image">
                    {item.images && item.images.length > 0 ? (
                      <img src={item.images[0]} alt={item.name} />
                    ) : (
                      <div className="no-image">No Image</div>
                    )}
                  </div>
                  <div className="order-item-details">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                  <div className="order-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="order-total">
              <div className="summary-row">
                <span>Total:</span>
                <span className="total-amount">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

