import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      setProduct(res.data);
      if (res.data.images && res.data.images.length > 0) {
        setSelectedImage(0);
      }
    } catch (error) {
      toast.error('Product not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }
    if (product.stock <= 0) {
      toast.error('Product out of stock');
      return;
    }
    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }
    addToCart(product, quantity);
    toast.success('Product added to cart!');
  };

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="error">Product not found</div>;
  }

  return (
    <div className="product-detail-container">
      <div className="container">
        <div className="product-detail">
          <div className="product-images">
            {product.images && product.images.length > 0 ? (
              <>
                <div className="main-image">
                  <img src={product.images[selectedImage]} alt={product.name} />
                </div>
                {product.images.length > 1 && (
                  <div className="image-thumbnails">
                    {product.images.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        className={selectedImage === index ? 'active' : ''}
                        onClick={() => setSelectedImage(index)}
                      />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="no-image">No Image Available</div>
            )}
          </div>

          <div className="product-details">
            <h1>{product.name}</h1>
            <p className="product-category">Category: {product.category}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <p className="product-stock">
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </p>
            <p className="product-description">{product.description}</p>

            {product.stock > 0 && (
              <div className="quantity-selector">
                <label>Quantity:</label>
                <div className="quantity-controls">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1;
                      setQuantity(Math.min(Math.max(1, val), product.stock));
                    }}
                  />
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              className="btn btn-primary btn-large"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

