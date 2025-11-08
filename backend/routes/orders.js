const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Generate unique order ID
const generateOrderId = () => {
  return 'ORD' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
};

// Create new order
router.post('/', auth, async (req, res) => {
  try {
    const { products, shippingAddress } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Products are required' });
    }

    if (!shippingAddress || !shippingAddress.name || !shippingAddress.phone || 
        !shippingAddress.address || !shippingAddress.city || !shippingAddress.pincode) {
      return res.status(400).json({ message: 'Shipping address is required' });
    }

    let totalAmount = 0;
    const orderProducts = [];

    // Validate products and calculate total
    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }

      const itemTotal = product.price * item.quantity;
      totalAmount += itemTotal;

      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price
      });

      // Update stock
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      orderId: generateOrderId(),
      userId: req.user.id,
      products: orderProducts,
      totalAmount,
      shippingAddress,
      paymentStatus: 'Completed' // Simulated payment
    });

    await order.populate('products.productId', 'name images');

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's orders (must come before /:id to avoid route conflicts)
router.get('/user/:userId', auth, async (req, res) => {
  try {
    // Ensure user can only access their own orders
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const orders = await Order.find({ userId: req.params.userId })
      .populate('products.productId', 'name images')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (admin only) - must come before /:id
router.put('/:id/status', auth, adminAuth, async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (orderStatus) {
      if (!['Pending', 'Processing', 'Shipped', 'Delivered'].includes(orderStatus)) {
        return res.status(400).json({ message: 'Invalid order status' });
      }
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      if (!['Pending', 'Completed'].includes(paymentStatus)) {
        return res.status(400).json({ message: 'Invalid payment status' });
      }
      order.paymentStatus = paymentStatus;
    }

    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('products.productId', 'name images description');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Ensure user can only access their own orders or is admin
    if (order.userId._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (admin only) - must come last to avoid conflicts
router.get('/', auth, adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('userId', 'name email')
      .populate('products.productId', 'name images')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

