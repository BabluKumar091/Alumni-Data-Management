import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Alumni Dashboard</h1>
          <div className="text-right">
            <div className="text-sm">{user ? `Welcome, ${user.name}` : 'Welcome'}</div>
            <div className="text-xs mt-1 px-2 py-0.5 bg-blue-700 rounded inline-block">
              {user?.role ? user.role.toUpperCase() : 'USER'}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/alumni"
            className="bg-white p-6 rounded shadow hover:shadow-lg transition text-center"
          >
            <h2 className="text-xl font-bold mb-2">View Alumni</h2>
            <p>See all registered alumni and their profiles.</p>
          </Link>
          {user && user.role === 'admin' && (
            <Link
              to="/alumni/add"
              className="bg-white p-6 rounded shadow hover:shadow-lg transition text-center"
            >
              <h2 className="text-xl font-bold mb-2">Add Alumni</h2>
              <p>Add a new alumni to the system with complete details.</p>
            </Link>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
