import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide navbar on login/register pages
  const isAuthPage = window.location.pathname === '/login' || window.location.pathname === '/register';
  if (isAuthPage) return null;

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="font-bold text-xl hover:text-gray-200">
              AlumniMS
            </Link>
            {user && (
              <>
                <Link to="/alumni" className="hidden sm:inline-block hover:text-gray-200">
                  Alumni List
                </Link>
                <Link
                  to="/dashboard"
                  className="hidden sm:inline-block hover:text-gray-200"
                >
                  Dashboard
                </Link>
                {user.role === "admin" && (
                  <>
                    <Link
                      to="/alumni/add"
                      className="hidden sm:inline-block hover:text-gray-200"
                    >
                      Add Alumni
                    </Link>
                    <Link
                      to="/admin/alumni"
                      className="hidden sm:inline-block hover:text-gray-200"
                    >
                      Manage Alumni
                    </Link>
                    <Link
                      to="/admin/users"
                      className="hidden sm:inline-block hover:text-gray-200"
                    >
                      Manage Users
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <span className="hidden sm:inline-block">{user.name}</span>
                <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-xs bg-blue-700 rounded">
                  {user.role ? user.role.toUpperCase() : "USER"}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded ml-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hover:bg-blue-700 px-3 py-1 rounded"
                >
                  Register
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="sm:hidden p-2 rounded hover:bg-blue-700"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    menuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden mt-2 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-gray-200">{user.role ? user.role.toUpperCase() : "USER"}</div>
                </div>
                <Link to="/dashboard" className="block px-3 py-2 rounded hover:bg-blue-700">
                  Dashboard
                </Link>
                <Link to="/alumni" className="block px-3 py-2 rounded hover:bg-blue-700">
                  Alumni List
                </Link>
                {user.role === "admin" && (
                  <>
                    <Link to="/alumni/add" className="block px-3 py-2 rounded hover:bg-blue-700">
                      Add Alumni
                    </Link>
                    <Link to="/admin/alumni" className="block px-3 py-2 rounded hover:bg-blue-700">
                      Manage Alumni
                    </Link>
                    <Link to="/admin/users" className="block px-3 py-2 rounded hover:bg-blue-700">
                      Manage Users
                    </Link>
                  </>
                )}
                <button
                  onClick={logout}
                  className="w-full text-left px-3 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded hover:bg-blue-700">
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
