# E-Sakay Backend API

Express.js backend for the E-Sakay React frontend application.

## 📁 Structure

```
backend/
├── server.js                 # Main entry point
├── package.json             # Dependencies
├── QUICK_START.md          # Setup guide
├── routes/
│   └── authRoutes.js        # Auth endpoints
├── controllers/
│   └── authController.js    # Business logic
├── models/
│   └── userModel.js         # User storage
└── middleware/
    ├── logger.js            # Request logging
    └── errorHandler.js      # Error handling
```

## 🚀 Quick Start

```bash
cd backend
npm install
npm start
```

Backend runs on **http://localhost:4001**

## 📡 API Endpoints

- **POST** `/api/register` - Register new user
- **POST** `/api/login` - Login user
- **GET** `/api/dashboard?userId=1` - Get dashboard data
- **GET** `/api/users` - Get all users
- **GET** `/health` - Health check

See QUICK_START.md for detailed setup instructions.
