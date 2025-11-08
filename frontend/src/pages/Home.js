import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import api from '../utils/api';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sort: 'createdAt',
    page: 1
  });
  const [pagination, setPagination] = useState({});
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [filters]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: filters.page,
        limit: 12,
        ...(filters.category !== 'all' && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
        ...(filters.sort && { sort: filters.sort })
      });

      const res = await api.get(`/products?${params}`);
      setProducts(res.data.products);
      setPagination({
        currentPage: res.data.currentPage,
        totalPages: res.data.totalPages,
        totalProducts: res.data.totalProducts
      });
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/products/categories/all');
      setCategories(res.data);
    } catch (error) {
      console.error('Failed to fetch categories');
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value, page: 1 });
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/login');
      return;
    }
    if (product.stock <= 0) {
      toast.error('Product out of stock');
      return;
    }
    addToCart(product, 1);
    toast.success('Product added to cart!');
  };

  if (loading && products.length === 0) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="home-container">
      <div className="container">
        <h1 className="page-title">Products</h1>

        {/* Filters */}
        <div className="filters">
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Search:</label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label>Sort:</label>
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="createdAt">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="no-products">No products found</div>
        ) : (
          <>
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  <Link to={`/product/${product._id}`}>
                    <div className="product-image">
                      {product.images && product.images.length > 0 ? (
                        <img src={product.images[0]} alt={product.name} />
                      ) : (
                        <div className="no-image">No Image</div>
                      )}
                    </div>
                    <div className="product-info">
                      <h3>{product.name}</h3>
                      <p className="product-price">${product.price.toFixed(2)}</p>
                      <p className="product-stock">
                        {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                      </p>
                    </div>
                  </Link>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-secondary"
                  onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
                  disabled={filters.page === 1}
                >
                  Previous
                </button>
                <span>
                  Page {pagination.currentPage} of {pagination.totalPages}
                </span>
                <button
                  className="btn btn-secondary"
                  onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
                  disabled={filters.page === pagination.totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;

