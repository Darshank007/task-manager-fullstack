# Project Structure

Complete file structure of the Task Manager application.

```
task-manager/
│
├── backend/                          # Backend API Server
│   ├── models/                       # MongoDB Models
│   │   ├── User.js                   # User schema with password hashing
│   │   └── Task.js                   # Task schema with user reference
│   │
│   ├── routes/                       # API Routes
│   │   ├── auth.js                   # Authentication routes (register, login, profile)
│   │   └── tasks.js                  # Task CRUD routes (protected)
│   │
│   ├── middleware/                   # Express Middleware
│   │   └── auth.js                   # JWT authentication middleware
│   │
│   ├── utils/                        # Utility Functions
│   │   └── generateToken.js          # JWT token generation
│   │
│   ├── server.js                     # Express server entry point
│   ├── package.json                  # Backend dependencies
│   └── .gitignore                    # Backend gitignore
│
├── frontend/                         # React Frontend Application
│   ├── src/
│   │   ├── components/               # React Components
│   │   │   ├── TaskCard.jsx         # Individual task card component
│   │   │   ├── TaskForm.jsx         # Task create/edit form
│   │   │   ├── TaskList.jsx         # Task list container
│   │   │   └── TaskFilters.jsx      # Search and filter component
│   │   │
│   │   ├── context/                  # React Context
│   │   │   └── AuthContext.jsx      # Authentication state management
│   │   │
│   │   ├── pages/                    # Page Components
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   └── Dashboard.jsx        # Main dashboard with tasks
│   │   │
│   │   ├── services/                 # API Services
│   │   │   └── api.js               # Axios API client and task functions
│   │   │
│   │   ├── App.jsx                   # Main app component with routing
│   │   ├── main.jsx                  # React entry point
│   │   └── index.css                 # Global styles with Tailwind
│   │
│   ├── index.html                    # HTML template
│   ├── package.json                  # Frontend dependencies
│   ├── vite.config.js                # Vite configuration
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── postcss.config.js             # PostCSS configuration
│   └── .gitignore                    # Frontend gitignore
│
├── README.md                         # Main project documentation
├── QUICK_START.md                    # Quick setup guide
├── API_DOCUMENTATION.md              # Complete API reference
├── PRODUCTION_SCALING.md             # Production deployment guide
├── PROJECT_STRUCTURE.md              # This file
└── .gitignore                        # Root gitignore

```

## Key Files Explained

### Backend

- **server.js**: Main Express server, connects to MongoDB, sets up middleware and routes
- **models/User.js**: User schema with email validation, password hashing, and comparison methods
- **models/Task.js**: Task schema with user reference, status enum, and timestamps
- **routes/auth.js**: Handles user registration, login, and profile retrieval
- **routes/tasks.js**: CRUD operations for tasks (all protected, user-specific)
- **middleware/auth.js**: JWT verification middleware for protecting routes
- **utils/generateToken.js**: Generates JWT tokens with 30-day expiration

### Frontend

- **App.jsx**: Main routing component with protected and public routes
- **context/AuthContext.jsx**: Global authentication state, login/logout functions, token management
- **pages/Dashboard.jsx**: Main dashboard with task management, search, and filters
- **pages/Login.jsx**: Login form with validation
- **pages/Register.jsx**: Registration form with password confirmation
- **components/TaskForm.jsx**: Reusable form for creating/editing tasks
- **components/TaskCard.jsx**: Individual task display with edit/delete actions
- **components/TaskList.jsx**: Grid layout for task cards
- **components/TaskFilters.jsx**: Search and status filter controls
- **services/api.js**: Centralized API functions using Axios

## Data Flow

1. **Authentication Flow:**
   - User registers/logs in → Backend validates → Returns JWT token
   - Token stored in localStorage → Sent with every API request
   - Protected routes verify token → Attach user to request

2. **Task Management Flow:**
   - User creates task → Frontend sends to API → Backend saves with user ID
   - User views tasks → Backend filters by user ID → Returns only user's tasks
   - User updates/deletes → Backend verifies ownership → Performs operation

## Technology Stack

### Backend
- **Express**: Web framework
- **MongoDB + Mongoose**: Database and ODM
- **JWT**: Authentication tokens
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS
- **Axios**: HTTP client
- **Context API**: State management

## Security Features

- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens for stateless authentication
- Protected routes with middleware
- User-specific data isolation
- Input validation on both client and server

## Scalability Features

- Modular code structure
- Separation of concerns
- Reusable components
- Centralized API service
- Environment-based configuration
- Database indexing for performance

