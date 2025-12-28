import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Welcome to AlumniMS
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Connect, network, and grow with your alumni community.
          </p>
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-white text-blue-600 font-semibold px-6 py-3 rounded hover:bg-gray-100 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="bg-blue-500 text-white font-semibold px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <section className="flex-1 max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Connect</h2>
          <p>Find and connect with alumni from your batch or department.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Network</h2>
          <p>Share experiences, resources, and career opportunities.</p>
        </div>
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <h2 className="font-bold text-xl mb-2">Grow</h2>
          <p>Participate in events and expand your professional network.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
