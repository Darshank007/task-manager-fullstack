# Quick Start Guide

Get the Task Manager application up and running in 5 minutes!

## Prerequisites

- Node.js (v16 or higher) - [Download](https://nodejs.org/)
- MongoDB - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud option)

## Step-by-Step Setup

### 1. Install Dependencies

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

### 2. Configure Backend

Create a `.env` file in the `backend` folder:

```bash
cd backend
```

**For Local MongoDB:**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
NODE_ENV=development
```

**For MongoDB Atlas (Cloud):**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Replace `<password>` and `<dbname>` in the connection string

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters_long
NODE_ENV=development
```

### 3. Start MongoDB (Local Only)

**Windows:**
```bash
# If MongoDB is installed as a service, it should start automatically
# Or run: mongod
```

**macOS:**
```bash
brew services start mongodb-community
# or
mongod
```

**Linux:**
```bash
sudo systemctl start mongod
# or
sudo service mongod start
```

### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
🚀 Server running on port 5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:3000/
```

### 5. Open the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### 6. Create Your First Account

1. Click "Sign up" or navigate to `/register`
2. Fill in:
   - Name: Your name
   - Email: your@email.com
   - Password: (minimum 6 characters)
3. Click "Sign Up"
4. You'll be automatically logged in and redirected to the dashboard

### 7. Create Your First Task

1. Click "+ Add New Task"
2. Fill in the task details
3. Click "Create Task"
4. Your task will appear in the dashboard!

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solution:**
- Make sure MongoDB is running
- Check your `MONGODB_URI` in `.env` file
- For local MongoDB, ensure it's running on port 27017

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
- Change `PORT` in backend `.env` file to another port (e.g., 5001)
- Update frontend `vite.config.js` proxy target if needed

### CORS Error

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:**
- Make sure backend is running on port 5000
- Check that frontend proxy is configured correctly in `vite.config.js`

### Module Not Found

**Error:** `Cannot find module 'xxx'`

**Solution:**
- Run `npm install` in the respective folder (backend or frontend)
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Check [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for API reference
- Review [PRODUCTION_SCALING.md](./PRODUCTION_SCALING.md) for production deployment

## Need Help?

- Check the error messages in the terminal
- Verify all environment variables are set correctly
- Ensure MongoDB is running (if using local)
- Make sure all dependencies are installed

Happy coding! 🚀

