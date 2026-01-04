# API Documentation

Complete API reference for the Task Manager application.

## Base URL

```
Development: http://localhost:5000/api
Production: https://your-api-domain.com/api
```

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User

Create a new user account.

**Endpoint:** `POST /auth/register`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Field Validation:**
- `name` (required): String, trimmed
- `email` (required): Valid email format, unique
- `password` (required): Minimum 6 characters

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1MDdmMWY3N2JjZjg2Y2Q3OTk0MzkwMTEiLCJpYXQiOjE3MDQwNjcyMDAsImV4cCI6MTcwNjY1OTIwMH0...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Error Responses:**

**400 - Bad Request:**
```json
{
  "message": "Please provide name, email, and password"
}
```

**400 - User Exists:**
```json
{
  "message": "User already exists with this email"
}
```

---

### 2. Login

Authenticate user and receive JWT token.

**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
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

**Error Responses:**

**400 - Bad Request:**
```json
{
  "message": "Please provide email and password"
}
```

**401 - Unauthorized:**
```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Get User Profile

Get current authenticated user's profile.

**Endpoint:** `GET /auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
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

**Error Responses:**

**401 - Unauthorized:**
```json
{
  "message": "Not authorized, no token provided"
}
```

**401 - Invalid Token:**
```json
{
  "message": "Not authorized, invalid token"
}
```

---

## Task Endpoints

All task endpoints require authentication. Tasks are user-specific - users can only access their own tasks.

### 1. Get All Tasks

Retrieve all tasks for the authenticated user with optional filtering.

**Endpoint:** `GET /tasks`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `search` (optional): Search tasks by title (case-insensitive)
- `status` (optional): Filter by status (`pending`, `in-progress`, `completed`)

**Example Requests:**
```
GET /tasks
GET /tasks?search=project
GET /tasks?status=completed
GET /tasks?search=project&status=in-progress
```

**Success Response (200):**
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
    },
    {
      "_id": "507f1f77bcf86cd799439013",
      "title": "Review code",
      "description": "Code review for team",
      "status": "pending",
      "user": "507f1f77bcf86cd799439011",
      "createdAt": "2024-01-02T00:00:00.000Z",
      "updatedAt": "2024-01-02T00:00:00.000Z"
    }
  ]
}
```

**Error Responses:**

**401 - Unauthorized:**
```json
{
  "message": "Not authorized, no token provided"
}
```

---

### 2. Get Single Task

Retrieve a specific task by ID.

**Endpoint:** `GET /tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Task ID (MongoDB ObjectId)

**Success Response (200):**
```json
{
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Complete project",
    "description": "Finish the task manager app",
    "status": "in-progress",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**

**404 - Not Found:**
```json
{
  "message": "Task not found"
}
```

---

### 3. Create Task

Create a new task.

**Endpoint:** `POST /tasks`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Task",
  "description": "Task description (optional)",
  "status": "pending"
}
```

**Field Validation:**
- `title` (required): String, trimmed
- `description` (optional): String, defaults to empty string
- `status` (optional): One of `pending`, `in-progress`, `completed`. Defaults to `pending`

**Success Response (201):**
```json
{
  "message": "Task created successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439014",
    "title": "New Task",
    "description": "Task description",
    "status": "pending",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-03T00:00:00.000Z",
    "updatedAt": "2024-01-03T00:00:00.000Z"
  }
}
```

**Error Responses:**

**400 - Bad Request:**
```json
{
  "message": "Title is required"
}
```

---

### 4. Update Task

Update an existing task.

**Endpoint:** `PUT /tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `id`: Task ID (MongoDB ObjectId)

**Request Body:**
```json
{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}
```

**Note:** All fields are optional. Only include fields you want to update.

**Success Response (200):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "507f1f77bcf86cd799439012",
    "title": "Updated Task",
    "description": "Updated description",
    "status": "completed",
    "user": "507f1f77bcf86cd799439011",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-03T00:00:00.000Z"
  }
}
```

**Error Responses:**

**400 - Invalid Status:**
```json
{
  "message": "Invalid status. Must be: pending, in-progress, or completed"
}
```

**404 - Not Found:**
```json
{
  "message": "Task not found"
}
```

---

### 5. Delete Task

Delete a task.

**Endpoint:** `DELETE /tasks/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `id`: Task ID (MongoDB ObjectId)

**Success Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Responses:**

**404 - Not Found:**
```json
{
  "message": "Task not found"
}
```

---

## Error Handling

All endpoints follow consistent error response format:

**Standard Error Response:**
```json
{
  "message": "Error message description"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (authentication required/invalid)
- `404` - Not Found
- `500` - Internal Server Error

**Development Mode:**
In development mode, error responses may include stack traces:
```json
{
  "message": "Error message",
  "stack": "Error stack trace..."
}
```

---

## Postman Collection

### Setup Instructions

1. **Import Collection**
   - Create a new Postman collection
   - Add all endpoints listed above

2. **Environment Variables**
   Create a Postman environment with:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (will be set after login)

3. **Authentication Flow**
   - First, call `POST /auth/register` or `POST /auth/login`
   - Copy the `token` from response
   - Set `token` in environment variables
   - Use `{{token}}` in Authorization header for protected routes

4. **Authorization Header Template**
   ```
   Authorization: Bearer {{token}}
   ```

### Example Postman Requests

**Register:**
```
POST {{base_url}}/auth/register
Body (raw JSON):
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Login:**
```
POST {{base_url}}/auth/login
Body (raw JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```

**Get Tasks:**
```
GET {{base_url}}/tasks
Headers:
  Authorization: Bearer {{token}}
```

**Create Task:**
```
POST {{base_url}}/tasks
Headers:
  Authorization: Bearer {{token}}
Body (raw JSON):
{
  "title": "Test Task",
  "description": "This is a test task",
  "status": "pending"
}
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production, consider:
- Rate limiting on authentication endpoints
- Rate limiting per IP/user
- Suggested: 100 requests per 15 minutes per user

---

## CORS

The API is configured to accept requests from:
- Development: `http://localhost:3000`
- Production: Configure in backend `server.js` CORS settings

---

## Notes

- All timestamps are in ISO 8601 format (UTC)
- Task IDs are MongoDB ObjectIds
- JWT tokens expire after 30 days
- Passwords are hashed using bcrypt with 12 salt rounds
- Tasks are automatically filtered by authenticated user

