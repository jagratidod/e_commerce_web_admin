# E-Commerce Platform with Admin Panel (MERN Stack)

A full-stack e-commerce web application built with MongoDB, Express.js, React.js, and Node.js. This application features a complete user-facing shopping experience and a comprehensive admin dashboard for managing products and orders.

## 🚀 Features

### User Features
- **Product Browsing**: Browse products with filtering by category, search functionality, and sorting options
- **Product Details**: View detailed product information with image gallery
- **Shopping Cart**: Add products to cart, update quantities, and remove items
- **Checkout**: Secure checkout process with shipping address form
- **Order Management**: View order history and track order status
- **Authentication**: User registration and login with JWT-based authentication

### Admin Features
- **Dashboard**: View statistics (total products, orders, revenue, pending orders)
- **Product Management**: Full CRUD operations for products with multiple image uploads
- **Order Management**: View all orders, update order status, and view order details
- **Protected Routes**: Admin-only access to admin panel

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (for image uploads)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd "E-commerce Mern app"
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb+srv://dodavinash2:1234567890@mongodbcluster.dsk6r.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=MongoDBCluster
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5001
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Note**: Replace the Cloudinary credentials with your own. If you don't have Cloudinary set up, you can use a placeholder service or modify the code to use local storage.

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5001/api
```

### 4. Create Admin User and Add Test Products

Before starting the servers, create an admin user and add test products:

```bash
cd backend
node createAdmin.js
node addTestProducts.js
```

This will:
- Create an admin user (see credentials below)
- Add 10 test products to the database

### 5. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5001`
- You should see: `MongoDB Connected Successfully`
- You should see: `Server running on port 5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

The frontend will start on `http://localhost:3000`
- The browser should automatically open
- If not, manually navigate to `http://localhost:3000`

## 📁 Project Structure

```
E-commerce Mern app/
├── backend/
│   ├── middleware/
│   │   ├── auth.js          # JWT authentication middleware
│   │   └── upload.js        # Multer configuration for file uploads
│   ├── models/
│   │   ├── User.js          # User model
│   │   ├── Product.js       # Product model
│   │   └── Order.js         # Order model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── products.js      # Product CRUD routes
│   │   ├── orders.js        # Order routes
│   │   └── admin.js         # Admin dashboard routes
│   ├── utils/
│   │   └── cloudinary.js    # Cloudinary image upload utility
│   └── server.js            # Express server setup
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js    # Navigation component
│       │   ├── PrivateRoute.js  # Protected route component
│       │   └── AdminRoute.js    # Admin-only route component
│       ├── context/
│       │   ├── AuthContext.js   # Authentication context
│       │   └── CartContext.js   # Shopping cart context
│       ├── pages/
│       │   ├── Home.js          # Product listing page
│       │   ├── ProductDetail.js # Product details page
│       │   ├── Cart.js          # Shopping cart page
│       │   ├── Checkout.js      # Checkout page
│       │   ├── MyOrders.js      # User orders page
│       │   ├── Login.js         # Login page
│       │   ├── Register.js      # Registration page
│       │   └── admin/
│       │       ├── AdminDashboard.js  # Admin dashboard
│       │       ├── ManageProducts.js  # Product management
│       │       └── ManageOrders.js    # Order management
│       ├── utils/
│       │   └── api.js        # Axios API configuration
│       ├── App.js            # Main app component
│       └── index.js          # React entry point
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - Get all products (with pagination, search, filter, sort)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Add new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/categories/all` - Get all categories

### Orders
- `POST /api/orders` - Create new order (protected)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/user/:userId` - Get user's orders (protected)
- `GET /api/orders/:id` - Get single order (protected)
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics (admin only)

## 👤 Testing Credentials

### Admin User

After running `node createAdmin.js`, you can login with:

- **Email**: `admin@example.com`
- **Password**: `admin123`

**⚠️ Important**: Change the admin password immediately after first login!

### Regular User

You can create a regular user by:
1. Going to `http://localhost:3000/register`
2. Filling in the registration form
3. Or use these test credentials (if you create them):
   - **Email**: `user@example.com`
   - **Password**: `user123`

### Creating Admin User

Run the admin creation script:

```bash
cd backend
node createAdmin.js
```

This will create an admin user with the credentials above. If the user already exists, it will update their role to admin.

### Adding Test Products

Run the test products script:

```bash
cd backend
node addTestProducts.js
```

This adds 10 test products including:
- Electronics (Headphones, Smart Watch, Mouse, Keyboard, Webcam)
- Accessories (Laptop Bag, USB-C Hub, Power Bank, Desk Mat, Monitor Stand)

## 🔐 How to Login

### Step-by-Step Login Process

1. **Open the Application**
   - Navigate to `http://localhost:3000` in your browser

2. **Login as Admin**
   - Click on "Login" in the navigation bar
   - Enter email: `admin@example.com`
   - Enter password: `admin123`
   - Click "Login" button
   - You'll be redirected to the home page
   - You'll see "Admin" link in the navbar (admin users only)

3. **Login as Regular User**
   - Click on "Login" in the navigation bar
   - Enter your registered email and password
   - Click "Login" button
   - You'll be redirected to the home page

4. **Register New User**
   - Click on "Register" in the navigation bar
   - Fill in:
     - Name
     - Email
     - Password (minimum 6 characters)
     - Confirm Password
   - Click "Register" button
   - You'll be automatically logged in

### Accessing Admin Panel

1. Login with admin credentials
2. Click on "Admin" link in the navigation bar
3. You'll see the Admin Dashboard with:
   - Total Products
   - Total Orders
   - Total Revenue
   - Pending Orders
   - Recent Orders list

4. From the dashboard, you can:
   - Click "Manage Products" to add/edit/delete products
   - Click "Manage Orders" to view and update order statuses

## 🎨 Features Overview

### User Interface
- Responsive design for mobile and desktop
- Product filtering and search
- Shopping cart with quantity management
- Order tracking
- Form validation
- Loading states and error handling
- Toast notifications

### Admin Interface
- Dashboard with key metrics
- Product management with image uploads
- Order management with status updates
- Protected admin routes
- Real-time statistics

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes (user and admin)
- Token expiration handling
- Input validation
- File upload restrictions

## 📦 Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- Multer (file uploads)
- Cloudinary (image storage)
- CORS

### Frontend
- React.js
- React Router
- Axios
- React Context API
- React Toastify
- CSS3

## 🚧 Future Enhancements

- Payment gateway integration (Stripe/Razorpay)
- Product ratings and reviews
- Wishlist functionality
- Email notifications
- Advanced search and filters
- Product recommendations
- Order cancellation
- Return/Refund management

## 🧪 Testing Guide

### Testing Without Authentication

You can test the following features **without logging in**:

1. **Browse Products**
   - Go to `http://localhost:3000`
   - You should see 10 test products
   - Try filtering by category (Electronics/Accessories)
   - Try searching for products
   - Try sorting by price (Low to High, High to Low)

2. **View Product Details**
   - Click on any product card
   - View product images, description, price, and stock

3. **Shopping Cart**
   - Add products to cart (works without login)
   - Update quantities
   - Remove items
   - View cart total

### Testing With Authentication

**Login required for:**

1. **Checkout**
   - Add items to cart
   - Click "Proceed to Checkout"
   - You'll be redirected to login if not authenticated
   - After login, fill shipping address and place order

2. **My Orders**
   - View your order history
   - Track order status
   - View order details

3. **Admin Panel** (Admin only)
   - Access dashboard
   - Manage products
   - Manage orders

### Quick Test Flow

1. **Browse as Guest**
   ```
   → Open http://localhost:3000
   → Browse products
   → Add items to cart
   → View cart
   ```

2. **Login as User**
   ```
   → Click "Login"
   → Enter user credentials
   → Proceed to checkout
   → Place an order
   → View "My Orders"
   ```

3. **Login as Admin**
   ```
   → Click "Login"
   → Enter admin credentials (admin@example.com / admin123)
   → Click "Admin" in navbar
   → View dashboard statistics
   → Manage products
   → Manage orders
   ```

## 🐛 Troubleshooting

### Backend Not Starting
- Check if port 5001 is available: `lsof -i :5001`
- If port is in use, change PORT in `backend/.env`
- Check MongoDB connection string is correct
- Verify `.env` file exists in backend directory

### Frontend Not Starting
- Check if port 3000 is available
- Verify `.env` file exists in frontend directory
- Check `REACT_APP_API_URL` matches backend port
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

### MongoDB Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (all IPs) or your current IP
- Verify the connection string is correct
- Check if the database name is correct (`ecommerce`)

### 403 Forbidden Error
- Verify backend is running on port 5001
- Check frontend `.env` has correct API URL: `http://localhost:5001/api`
- Restart both backend and frontend servers
- Clear browser cache and hard refresh (Cmd+Shift+R / Ctrl+Shift+R)

### Products Not Showing
- Verify test products were added: `node backend/addTestProducts.js`
- Check browser console for errors
- Verify API is accessible: `curl http://localhost:5001/api/products`

### Image Upload Issues
- Verify Cloudinary credentials in `.env`
- Check file size limits (max 5MB per image)
- Ensure image formats are supported (jpeg, jpg, png, gif, webp)
- Note: Image uploads will fail without valid Cloudinary credentials

### CORS Issues
- Backend CORS is configured for `http://localhost:3000`
- If using different port, update CORS in `backend/server.js`
- Check browser console for CORS errors

### Port Already in Use
- Backend default port: 5001 (change in `backend/.env`)
- Frontend default port: 3000 (React will prompt to use different port)
- Update `REACT_APP_API_URL` in frontend `.env` if backend port changes

## 📝 Quick Reference

### Server URLs
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api
- **Health Check**: http://localhost:5001/api/health

### Default Credentials
- **Admin Email**: `admin@example.com`
- **Admin Password**: `admin123`

### Useful Commands

```bash
# Create admin user
cd backend && node createAdmin.js

# Add test products
cd backend && node addTestProducts.js

# Start backend (development mode with auto-reload)
cd backend && npm run dev

# Start frontend
cd frontend && npm start

# Start backend (production mode)
cd backend && npm start
```

### API Testing

Test the API endpoints using curl:

```bash
# Get all products
curl http://localhost:5001/api/products

# Get single product (replace :id with actual product ID)
curl http://localhost:5001/api/products/:id

# Get categories
curl http://localhost:5001/api/products/categories/all

# Health check
curl http://localhost:5001/api/health

# Login (POST request)
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'
```

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Created as part of a MERN stack e-commerce project.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

## ⚠️ Important Notes

### Development vs Production

This is a development project. For production use, ensure:
- Strong JWT secret keys (change default `JWT_SECRET`)
- Environment variables are properly secured (never commit `.env` files)
- Database credentials are protected
- HTTPS is enabled
- Input sanitization is implemented
- Rate limiting is configured
- Error handling is comprehensive
- Change default admin password immediately
- Use environment-specific configurations

### Security Reminders
- Default admin password should be changed after first login
- Never commit `.env` files to version control
- Use strong JWT secrets in production
- Enable HTTPS in production
- Implement proper error handling to avoid exposing sensitive information

