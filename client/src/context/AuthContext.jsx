import { createContext, useState, useEffect, useContext } from "react";
import { loginUser, registerUser } from "../api/userApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

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
      return true; // successful login
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Login failed");
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
      return true; // successful registration
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed";
      console.error("Registration error:", errorMessage);
      alert(errorMessage);
      throw new Error(errorMessage); // throw error so component can catch it
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier usage
export const useAuth = () => useContext(AuthContext);
