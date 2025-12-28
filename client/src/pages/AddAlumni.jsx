import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addAlumni } from "../api/alumniApi";

const AddAlumni = () => {
  const navigate = useNavigate();
  const [alumni, setAlumni] = useState({
    name: "",
    rollNumber: "",
    email: "",
    department: "",
    batch: "",
    company: "",
    designation: "",
    phone: "",
    linkedin: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setAlumni({ ...alumni, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    // Client-side validation
    if (!alumni.name || alumni.name.trim().length === 0) {
      setError("Name is required");
      return;
    }
    if (/^\d+$/.test(alumni.name.trim())) {
      setError("Name must contain letters");
      return;
    }
    if (alumni.rollNumber && !/^[a-zA-Z0-9\-]{1,20}$/.test(alumni.rollNumber)) {
      setError("Roll number must be alphanumeric (max 20 characters, no spaces)");
      return;
    }
    if (alumni.email) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(alumni.email)) {
        setError("Invalid email format");
        return;
      }
    }
    if (alumni.batch && !/^\d{4}$/.test(String(alumni.batch))) {
      setError("Batch must be a 4-digit year (e.g., 2020)");
      return;
    }
    if (alumni.phone && !/^\d{10}$/.test(alumni.phone)) {
      setError("Phone must be exactly 10 digits (numbers only)");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await addAlumni(alumni, token);
      console.log("Alumni added successfully:", response);
      alert("Alumni added successfully!");
      // Reset form
      setAlumni({ name: "", email: "", batch: "" });
      // Redirect to alumni list
      setTimeout(() => navigate("/alumni"), 500);
    } catch (err) {
      console.error("Error adding alumni:", err);
      const msg = err.response?.data?.message || "Failed to add alumni";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Add Alumni</h1>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded text-sm">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={alumni.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number / Student ID</label>
            <input
              id="rollNumber"
              type="text"
              placeholder="e.g., 12345 or ABC-2020"
              name="rollNumber"
              value={alumni.rollNumber}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Email address"
              name="email"
              value={alumni.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">Course / Branch (Department)</label>
            <input
              id="department"
              type="text"
              placeholder="e.g., Computer Science"
              name="department"
              value={alumni.department}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="batch" className="block text-sm font-medium text-gray-700">Year of Graduation</label>
            <input
              id="batch"
              type="text"
              placeholder="e.g., 2020"
              name="batch"
              value={alumni.batch}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">Current Company</label>
            <input
              id="company"
              type="text"
              placeholder="e.g., Acme Corp"
              name="company"
              value={alumni.company}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">Job Title / Position</label>
            <input
              id="designation"
              type="text"
              placeholder="e.g., Software Engineer"
              name="designation"
              value={alumni.designation}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (10 digits)</label>
            <input
              id="phone"
              type="text"
              placeholder="e.g., 5551234567"
              name="phone"
              value={alumni.phone}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
            <input
              id="linkedin"
              type="text"
              placeholder="https://linkedin.com/in/username"
              name="linkedin"
              value={alumni.linkedin}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Alumni"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/alumni" className="text-blue-600 hover:underline">
            ← Back to Alumni List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddAlumni;
