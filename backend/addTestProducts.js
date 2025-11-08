/**
 * Script to add test products to the database
 * Run: node addTestProducts.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dodavinash2:1234567890@mongodbcluster.dsk6r.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=MongoDBCluster';

const testProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality. Perfect for music lovers and professionals.',
    price: 79.99,
    category: 'Electronics',
    stock: 50,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500']
  },
  {
    name: 'Smart Watch Pro',
    description: 'Feature-rich smartwatch with heart rate monitor, GPS tracking, and water resistance. Compatible with iOS and Android devices.',
    price: 199.99,
    category: 'Electronics',
    stock: 30,
    images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500']
  },
  {
    name: 'Leather Laptop Bag',
    description: 'Stylish and durable leather laptop bag with padded compartments. Fits laptops up to 15.6 inches. Perfect for business professionals.',
    price: 89.99,
    category: 'Accessories',
    stock: 25,
    images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500']
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precision tracking and long battery life. Compatible with Windows, Mac, and Linux.',
    price: 29.99,
    category: 'Electronics',
    stock: 100,
    images: ['https://images.unsplash.com/photo-1527814050087-3793815479db?w=500']
  },
  {
    name: 'Mechanical Keyboard',
    description: 'RGB backlit mechanical keyboard with Cherry MX switches. Perfect for gaming and typing. Durable and responsive.',
    price: 129.99,
    category: 'Electronics',
    stock: 40,
    images: ['https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500']
  },
  {
    name: 'USB-C Hub',
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Perfect for laptops with limited ports.',
    price: 49.99,
    category: 'Accessories',
    stock: 60,
    images: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500']
  },
  {
    name: 'Portable Power Bank',
    description: '20000mAh power bank with fast charging support. Can charge multiple devices simultaneously. Essential for travel.',
    price: 39.99,
    category: 'Accessories',
    stock: 75,
    images: ['https://images.unsplash.com/photo-1609091839311-d5365f5bf95a?w=500']
  },
  {
    name: 'Webcam HD 1080p',
    description: 'High-definition webcam with built-in microphone and auto-focus. Perfect for video calls, streaming, and online meetings.',
    price: 69.99,
    category: 'Electronics',
    stock: 35,
    images: ['https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500']
  },
  {
    name: 'Standing Desk Mat',
    description: 'Ergonomic anti-fatigue standing desk mat. Provides comfort and support for long work hours. Easy to clean.',
    price: 34.99,
    category: 'Accessories',
    stock: 45,
    images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500']
  },
  {
    name: 'Monitor Stand with Storage',
    description: 'Adjustable monitor stand with built-in storage compartments. Helps organize your workspace and improve posture.',
    price: 54.99,
    category: 'Accessories',
    stock: 20,
    images: ['https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500']
  }
];

async function addTestProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing products (optional - comment out if you want to keep existing)
    // await Product.deleteMany({});
    // console.log('🗑️  Cleared existing products\n');

    // Check if products already exist
    const existingCount = await Product.countDocuments();
    if (existingCount > 0) {
      console.log(`ℹ️  Found ${existingCount} existing products. Adding new products...\n`);
    }

    // Insert products
    const insertedProducts = await Product.insertMany(testProducts);
    console.log(`✅ Successfully added ${insertedProducts.length} products:\n`);

    insertedProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.name} - $${product.price} (Stock: ${product.stock})`);
    });

    console.log(`\n📊 Total products in database: ${await Product.countDocuments()}`);
    console.log('\n✅ Test products added successfully!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding products:', error);
    process.exit(1);
  }
}

addTestProducts();


