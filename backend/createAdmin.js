/**
 * Helper script to create an admin user
 * Run this script once to create an admin user:
 * node createAdmin.js
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://dodavinash2:1234567890@mongodbcluster.dsk6r.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=MongoDBCluster';

async function createAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    const existingAdmin = await User.findOne({ email: adminEmail });
    
    if (existingAdmin) {
      if (existingAdmin.role === 'admin') {
        console.log('Admin user already exists:', adminEmail);
      } else {
        existingAdmin.role = 'admin';
        await existingAdmin.save();
        console.log('User updated to admin:', adminEmail);
      }
    } else {
      const admin = await User.create({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      console.log('Admin user created successfully:', adminEmail);
    }

    console.log('\nAdmin Credentials:');
    console.log('Email:', adminEmail);
    console.log('Password:', adminPassword);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();


