import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 hidden md:block">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
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
        <Link
          to="/alumni/add"
          className="px-3 py-2 rounded hover:bg-gray-200"
        >
          Add Alumni
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
