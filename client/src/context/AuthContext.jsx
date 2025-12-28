import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser } from "../api/userApi";
import { useFlashMessage } from "./FlashMessageContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { showSuccess, showError } = useFlashMessage();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login function calls backend
  const login = async ({ email, password }) => {
    try {
      const res = await loginUser({ email, password });

      const { user, token } = res;
      setUser(user); // store only user data in state
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      showSuccess("Login successful! Welcome back.");
      return true; // successful login
    } catch (err) {
      console.error(err.response?.data || err);
      const errorMessage = err.response?.data?.message || "Login failed";
      showError(errorMessage);
      return false; // login failed
    }
  };

  // Register function calls backend
  const register = async ({ name, email, password, role = 'student' }) => {
    try {
      const res = await registerUser({ name, email, password, role });

      const { user, token } = res;
      setUser(user); // store only user data in state
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      showSuccess("Registration successful! Welcome to JIET Alumni Network.");
      return true; // successful registration
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      console.error("Registration error:", errorMessage);
      showError(errorMessage);
      throw new Error(errorMessage); // throw error so component can catch it
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    showSuccess("Logged out successfully. See you soon!");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
