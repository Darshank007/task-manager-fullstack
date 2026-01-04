# Task Manager - Full-Stack Web Application

A scalable full-stack task management application with authentication, built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **Authentication System**
  - User registration and login
  - JWT-based authentication
  - Password hashing with bcrypt
  - Protected routes

- **Task Management Dashboard**
  - Create, Read, Update, Delete tasks
  - User-specific tasks (each user sees only their tasks)
  - Search and filter tasks by title and status
  - Responsive, modern UI with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management for authentication

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
.
├── backend/
│   ├── models/
│   │   ├── User.js          # User model
│   │   └── Task.js          # Task model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   └── tasks.js         # Task CRUD routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── utils/
│   │   └── generateToken.js # JWT token generation
│   ├── server.js            # Express server entry point
│   ├── package.json
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── TaskFilters.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── services/
│   │   │   └── api.js       # API service functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

To scale this application for production, I would separate frontend and backend deployments, use environment-based configuration, introduce role-based access control, implement pagination and indexing for database queries, add rate limiting and request validation, and deploy the backend behind a load balancer with caching (Redis) and containerization using Docker.


## 🚦 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Set up Backend**

   ```bash
   cd backend
   npm install
   ```

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskmanager
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

   **For MongoDB Atlas (cloud):**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
   ```

3. **Set up Frontend**

   ```bash
   cd ../frontend
   npm install
   ```

   Optionally, create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   # On Windows
   mongod

   # On macOS/Linux
   sudo systemctl start mongod
   # or
   brew services start mongodb-community
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:5000
   ```

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   # App runs on http://localhost:3000
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Get Profile
```http
GET /auth/profile
Authorization: Bearer <token>
```

**Response:**
```json
{
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Task Endpoints

All task endpoints require authentication (Bearer token in Authorization header).

#### Get All Tasks
```http
GET /tasks?search=title&status=pending
Authorization: Bearer <token>
```

**Query Parameters:**
- `search` (optional): Search tasks by title (case-insensitive)
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)

**Response:**
```json
{
  "count": 2,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete project",
      "description": "Finish the task manager app",
      "status": "in-progress",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>
```

#### Create Task
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "status": "pending"
}
```

**Response:**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Update Task
```http
PUT /tasks/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}
```

#### Delete Task
```http
DELETE /tasks/:id
Authorization: Bearer <token>
```

**Response:**
```json
{
  "message": "Task deleted successfully"
}
```

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 12
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Backend middleware ensures only authenticated users can access protected endpoints
- **User Isolation**: Tasks are user-specific; users can only access their own tasks
- **Input Validation**: Server-side validation for all inputs

## 🎨 UI Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Real-time Updates**: Instant feedback on all actions
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls

## 🚀 Production Deployment Considerations

### Backend

1. **Environment Variables**
   - Use strong, random `JWT_SECRET` (minimum 32 characters)
   - Use environment-specific MongoDB connection strings
   - Set `NODE_ENV=production`

2. **Security**
   - Enable HTTPS
   - Use CORS with specific origins
   - Rate limiting (e.g., `express-rate-limit`)
   - Input sanitization (e.g., `express-validator`)
   - Helmet.js for security headers

3. **Database**
   - Use MongoDB Atlas or managed MongoDB service
   - Enable database backups
   - Set up connection pooling
   - Add database indexes for performance

4. **Performance**
   - Enable gzip compression
   - Use Redis for session/token caching
   - Implement pagination for large datasets
   - Add database query optimization

5. **Monitoring**
   - Error tracking (e.g., Sentry)
   - Logging (e.g., Winston, Morgan)
   - Health check endpoints
   - API monitoring

### Frontend

1. **Build Optimization**
   ```bash
   npm run build
   ```
   - Deploy `dist` folder to CDN or static hosting

2. **Environment Variables**
   - Set `VITE_API_URL` to production API URL
   - Never commit `.env` files

3. **Performance**
   - Code splitting
   - Lazy loading routes
   - Image optimization
   - Bundle size optimization

4. **Security**
   - Store JWT in httpOnly cookies (more secure than localStorage)
   - Implement CSRF protection
   - Content Security Policy (CSP)

5. **Hosting Options**
   - **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
   - **Backend**: Heroku, AWS EC2, DigitalOcean, Railway, Render

### Scaling Strategies

1. **Horizontal Scaling**
   - Load balancer for multiple backend instances
   - Stateless API design (JWT tokens)
   - Database replication (MongoDB replica sets)

2. **Caching**
   - Redis for session/token storage
   - CDN for static assets
   - API response caching where appropriate

3. **Database Optimization**
   - Indexes on frequently queried fields
   - Connection pooling
   - Read replicas for read-heavy operations

4. **Microservices** (Future)
   - Separate auth service
   - Separate task service
   - API Gateway

5. **Real-time Features** (Future)
   - WebSocket support (Socket.io)
   - Server-Sent Events (SSE)

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration
- [ ] User login
- [ ] Protected route access
- [ ] Create task
- [ ] Update task
- [ ] Delete task
- [ ] Search functionality
- [ ] Filter by status
- [ ] Logout functionality
- [ ] Error handling

### Future Testing Improvements

- Unit tests (Jest)
- Integration tests
- E2E tests (Cypress, Playwright)
- API tests (Postman, Supertest)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

Built as a full-stack task management application demonstration.

---

**Note**: This is a demonstration project. For production use, implement additional security measures, testing, and monitoring as outlined in the deployment considerations.

