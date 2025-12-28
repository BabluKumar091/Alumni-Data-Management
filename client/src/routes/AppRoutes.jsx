import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import AlumniList from "../pages/AlumniList";
import AddAlumni from "../pages/AddAlumni";
import EditAlumni from "../pages/EditAlumni";
import AdminUsers from "../pages/AdminUsers";
import AdminAlumni from "../pages/AdminAlumni";

const AppRoutes = () => {
  const { user } = useContext(AuthContext);

  // PrivateRoute ensures only logged-in users can access certain pages
  const PrivateRoute = ({ children }) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Default route shows Registration first */}
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} /> {/* optional landing page */}

        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/alumni"
          element={
            <PrivateRoute>
              <AlumniList />
            </PrivateRoute>
          }
        />
        <Route
          path="/alumni/add"
          element={
            <PrivateRoute>
              <AddAlumni />
            </PrivateRoute>
          }
        />
        <Route
          path="/alumni/edit/:id"
          element={
            <PrivateRoute>
              <EditAlumni />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <AdminUsers />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/alumni"
          element={
            <PrivateRoute>
              <AdminAlumni />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
