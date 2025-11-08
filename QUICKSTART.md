# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env file):**
Create `backend/.env` with:
```env
MONGODB_URI=mongodb+srv://dodavinash2:1234567890@mongodbcluster.dsk6r.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=MongoDBCluster
JWT_SECRET=your_super_secret_jwt_key_change_in_production
PORT=5000
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend (.env file):**
Create `frontend/.env` with:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Create Admin User

```bash
cd backend
node createAdmin.js
```

This will create an admin user with:
- Email: `admin@example.com`
- Password: `admin123`

**⚠️ Change the password after first login!**

### Step 4: Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Step 5: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api

## 📝 Testing the Application

1. **Register a new user** at `/register`
2. **Login** with your credentials
3. **Browse products** on the home page
4. **Add products to cart** and proceed to checkout
5. **Login as admin** to access the admin panel at `/admin/dashboard`

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes `0.0.0.0/0` (or your current IP)
- Verify the connection string is correct

### Cloudinary Setup (Optional)
If you don't have Cloudinary set up yet:
1. Sign up at https://cloudinary.com (free tier available)
2. Get your credentials from the dashboard
3. Add them to `backend/.env`

**Note**: Image uploads will fail without Cloudinary credentials. You can still test other features.

### Port Already in Use
- Change `PORT` in `backend/.env`
- Update `REACT_APP_API_URL` in `frontend/.env` accordingly

## ✅ Features to Test

### User Features
- ✅ Product browsing with filters
- ✅ Product search
- ✅ Shopping cart
- ✅ Checkout process
- ✅ Order history
- ✅ User authentication

### Admin Features
- ✅ Dashboard statistics
- ✅ Product management (CRUD)
- ✅ Order management
- ✅ Status updates

## 🎯 Next Steps

1. Add your Cloudinary credentials for image uploads
2. Create some test products via admin panel
3. Test the complete order flow
4. Customize the design and branding

For detailed documentation, see [README.md](./README.md)


