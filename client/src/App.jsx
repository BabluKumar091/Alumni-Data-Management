// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

// Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AlumniList from "./pages/AlumniList";
import AddAlumni from "./pages/AddAlumni";
import EditAlumni from "./pages/EditAlumni";
import ViewAlumni from "./pages/ViewAlumni";
import AdminUsers from "./pages/AdminUsers";
import AlumniProfile from "./pages/AlumniProfile";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

// Admin-only route
const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === 'admin' ? children : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni"
            element={
              <ProtectedRoute>
                <AlumniList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-alumni"
            element={
              <AdminRoute>
                <AddAlumni />
              </AdminRoute>
            }
          />
          <Route
            path="/edit-alumni/:id"
            element={
              <AdminRoute>
                <EditAlumni />
              </AdminRoute>
            }
          />
          <Route
            path="/alumni/view/:id"
            element={
              <ProtectedRoute>
                <ViewAlumni />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/:id"
            element={
              <ProtectedRoute>
                <AlumniProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
