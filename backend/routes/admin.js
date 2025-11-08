const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// All routes require admin authentication
router.use(auth, adminAuth);

// Get dashboard statistics
router.get('/dashboard', async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => {
      return sum + (order.paymentStatus === 'Completed' ? order.totalAmount : 0);
    }, 0);

    const pendingOrders = await Order.countDocuments({ orderStatus: 'Pending' });

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('userId', 'name email')
      .populate('products.productId', 'name')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalProducts,
        totalOrders,
        totalRevenue,
        pendingOrders
      },
      recentOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

