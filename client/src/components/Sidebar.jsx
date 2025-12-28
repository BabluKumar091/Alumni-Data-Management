import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <nav className="flex flex-col space-y-2">
        <Link
          to="/dashboard"
          className="px-3 py-2 rounded hover:bg-gray-200"
        >
          Dashboard
        </Link>
        <Link
          to="/alumni"
          className="px-3 py-2 rounded hover:bg-gray-200"
        >
          Alumni List
        </Link>

        {/* Admin Only Links */}
        {user && user.role === 'admin' && (
          <>
            <hr className="my-4 border-gray-300" />
            <h3 className="text-lg font-semibold mb-2">Admin Panel</h3>
            <Link
              to="/alumni/add"
              className="px-3 py-2 rounded hover:bg-gray-200"
            >
              Add Alumni
            </Link>
            <Link
              to="/admin/alumni"
              className="px-3 py-2 rounded hover:bg-gray-200"
            >
              Manage Alumni
            </Link>
            <Link
              to="/admin/users"
              className="px-3 py-2 rounded hover:bg-gray-200"
            >
              Manage Users
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
