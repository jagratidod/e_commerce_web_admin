import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Cart.css';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && cart.length > 0) {
      toast.info('Please login to view and manage your cart items');
    }
  }, [user, cart.length]);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed to checkout');
      navigate('/login');
      return;
    }
    if (cart.length === 0) {
      return;
    }
    navigate('/checkout');
  };

  // Show login prompt if user is not logged in
  if (!user) {
    return (
      <div className="cart-container">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <div className="empty-cart">
            <p>Please login to view your cart items</p>
            <p style={{ color: '#666', marginBottom: '20px' }}>
              {cart.length > 0 ? 'You have items in your cart. Login to continue.' : 'Login to start adding items to your cart.'}
            </p>
            <Link to="/login" className="btn btn-primary" style={{ marginRight: '10px' }}>
              Go to Login
            </Link>
            <Link to="/" className="btn btn-secondary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="container">
          <h1 className="page-title">Shopping Cart</h1>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="container">
        <h1 className="page-title">Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item._id} className="cart-item">
                <div className="cart-item-image">
                  {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.name} />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}
                </div>
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="cart-item-quantity">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Total:</span>
              <span className="total-amount">${getCartTotal().toFixed(2)}</span>
            </div>
            <button
              className="btn btn-primary btn-large"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            <Link to="/" className="btn btn-secondary" style={{ marginTop: '10px', display: 'block', textAlign: 'center' }}>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

