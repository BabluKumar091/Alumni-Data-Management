# Alumni-Data-Management

A comprehensive MERN stack application for managing alumni data at JIET Jodhpur. This platform allows alumni to register, update their profiles, and connect with fellow graduates, while providing administrators with tools to manage users and alumni records.

## 🌟 Features

### 👥 User Management
- **Secure Authentication**: JWT-based login and registration
- **Role-based Access**: Admin and Student roles with different permissions
- **Email Validation**: Restricted to JIET Jodhpur college emails (@jietjodhpur.ac.in)
- **Profile Management**: Complete user profile with personal and professional details

### 🎓 Alumni Management
- **Alumni Profiles**: Detailed profiles including contact information, education, and career details
- **CRUD Operations**: Create, Read, Update, and Delete alumni records
- **Search & Filter**: Easy navigation through alumni database
- **Responsive Design**: Modern, mobile-friendly interface

### 🔐 Admin Features
- **User Administration**: View all users, change roles, delete accounts
- **Alumni Oversight**: Full control over alumni data management
- **Dashboard Access**: Administrative panel for system management

### 🎨 User Interface
- **Modern Design**: Clean, professional UI with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation**: Easy-to-use interface with clear user flows

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Declarative routing for React
- **Axios** - HTTP client for API requests
- **Framer Motion** - Animation library for React
- **React Icons** - Popular icon library
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing library

### Development Tools
- **ESLint** - JavaScript linting utility
- **Git** - Version control system
- **VS Code** - Code editor

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** (v4.4 or higher) - [Download here](https://www.mongodb.com/try/download/community)
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/BabluKumar091/Alumni-Data-Management.git
cd Alumni-Data-Management
```

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Update MongoDB connection string and JWT secret
```

### 3. Frontend Setup
```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with backend URL
# VITE_BACKEND_URL=http://localhost:5000
```

### 4. Database Setup
```bash
# Make sure MongoDB is running
# Default connection: mongodb://localhost:27017/alumni
```

## 🎯 Usage

### Development Mode

#### Start Backend Server
```bash
cd server
npm start
# Server will run on http://localhost:5000
```

#### Start Frontend Development Server
```bash
cd client
npm run dev
# Frontend will run on http://localhost:5173
```

### Production Build

#### Build Frontend
```bash
cd client
npm run build
```

#### Start Production Server
```bash
cd server
npm start
```

## 📡 API Endpoints

### Authentication Routes (`/api/users`)
- `POST /register` - Register new user
- `POST /login` - User login
- `GET /profile` - Get user profile (authenticated)
- `GET /` - Get all users (admin only)
- `PUT /:id/role` - Update user role (admin only)
- `DELETE /:id` - Delete user (admin only)

### Alumni Routes (`/api/alumni`)
- `GET /` - Get all alumni
- `GET /:id` - Get specific alumni by ID
- `POST /` - Create new alumni (admin only)
- `PUT /:id` - Update alumni (admin only)
- `DELETE /:id` - Delete alumni (admin only)

### Health Check
- `GET /api/health` - Server health check

## 📁 Project Structure

```
Alumni-Data-Management/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api/                     # API service functions
│   │   │   ├── alumniApi.js         # Alumni API calls
│   │   │   └── userApi.js           # User API calls
│   │   ├── components/              # Reusable React components
│   │   │   ├── AlumniCard.jsx       # Alumni display card
│   │   │   ├── Footer.jsx           # Site footer
│   │   │   ├── Loader.jsx           # Loading spinner
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   └── Sidebar.jsx          # Sidebar navigation
│   │   ├── context/                 # React context providers
│   │   │   └── AuthContext.jsx      # Authentication context
│   │   ├── pages/                   # Page components
│   │   │   ├── AddAlumni.jsx        # Add alumni form
│   │   │   ├── AdminUsers.jsx       # Admin user management
│   │   │   ├── AlumniList.jsx       # Alumni listing page
│   │   │   ├── AlumniProfile.jsx    # Individual alumni profile
│   │   │   ├── Dashboard.jsx        # User dashboard
│   │   │   ├── EditAlumni.jsx       # Edit alumni form
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── Login.jsx            # Login page
│   │   │   ├── Register.jsx         # Registration page
│   │   │   └── ViewAlumni.jsx       # View alumni details
│   │   ├── routes/                  # Routing configuration
│   │   │   └── AppRoutes.jsx        # Application routes
│   │   ├── utils/                   # Utility functions
│   │   │   └── helpers.jsx          # Helper functions
│   │   ├── App.css                 # Global styles
│   │   ├── App.jsx                 # Main App component
│   │   ├── index.css               # CSS reset and globals
│   │   └── main.jsx                # Application entry point
│   ├── .env                        # Environment variables
│   ├── .env.example                # Environment template
│   ├── eslint.config.js            # ESLint configuration
│   ├── index.html                  # HTML template
│   ├── package.json                # Frontend dependencies
│   ├── README.md                   # Frontend documentation
│   └── vite.config.js              # Vite configuration
├── server/                         # Backend Node.js application
│   ├── config/                     # Configuration files
│   │   └── db.js                   # Database connection
│   ├── controllers/                # Route controllers
│   │   ├── alumniController.js     # Alumni business logic
│   │   └── userController.js       # User business logic
│   ├── middleware/                 # Express middleware
│   │   ├── adminMiddleware.js      # Admin authorization
│   │   ├── authMiddleware.js       # Authentication middleware
│   │   └── errorHandler.js         # Error handling
│   ├── models/                     # Mongoose models
│   │   ├── Alumni.js               # Alumni data model
│   │   └── User.js                 # User data model
│   ├── routes/                     # API routes
│   │   ├── alumniRoutes.js         # Alumni endpoints
│   │   └── userRoutes.js           # User endpoints
│   ├── .env                        # Server environment variables
│   ├── package.json                # Backend dependencies
│   ├── README.md                   # Backend documentation
│   └── server.js                   # Server entry point
├── .gitignore                      # Git ignore rules
└── README.md                       # Project documentation
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
DATABASE=mongodb://localhost:27017/alumni
JWT_SECRET=your_secure_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:5000
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Bablu Kumar**
- GitHub: [@BabluKumar091](https://github.com/BabluKumar091)

## 🙏 Acknowledgments

- JIET Jodhpur for the inspiration
- MERN Stack community for excellent documentation
- Open source contributors

---

⭐ If you found this project helpful, please give it a star!