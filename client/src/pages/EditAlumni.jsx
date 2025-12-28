import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAlumnus, updateAlumni } from "../api/alumniApi";

const EditAlumni = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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

  const fetchAlumni = async () => {
    try {
      const data = await getAlumnus(id);
      // data should be the alumni object
      setAlumni({
        name: data.name || "",
        rollNumber: data.rollNumber || "",
        email: data.email || "",
        department: data.department || "",
        batch: data.batch || "",
        company: data.company || "",
        designation: res.data.designation || "",
        phone: res.data.phone || "",
        linkedin: res.data.linkedin || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleChange = (e) => {
    setAlumni({ ...alumni, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Client-side validation (similar to AddAlumni)
    if (!alumni.name || alumni.name.trim().length === 0) {
      alert('Name is required');
      return;
    }
    if (/^\d+$/.test(alumni.name.trim())) {
      alert('Name must contain letters');
      return;
    }
    if (alumni.rollNumber && !/^[a-zA-Z0-9\-]{1,20}$/.test(alumni.rollNumber)) {
      alert('Roll number must be alphanumeric (max 20 characters, no spaces)');
      return;
    }
    if (alumni.email) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(alumni.email)) {
        alert('Invalid email format');
        return;
      }
    }
    if (alumni.batch && !/^\d{4}$/.test(String(alumni.batch))) {
      alert('Batch must be a 4-digit year (e.g., 2020)');
      return;
    }
    if (alumni.phone && !/^\d{10}$/.test(alumni.phone)) {
      alert('Phone must be exactly 10 digits (numbers only)');
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await updateAlumni(id, alumni, token);
      navigate("/alumni");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update alumni");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Alumni</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              name="name"
              value={alumni.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="rollNumber" className="block text-sm font-medium text-gray-700">Roll Number / Student ID</label>
            <input
              id="rollNumber"
              type="text"
              placeholder="Roll Number / Student ID"
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
              placeholder="Email"
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
              placeholder="Course / Branch (Department)"
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
              placeholder="Batch (e.g., 2020)"
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
              placeholder="Current Company"
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
              placeholder="Job Title / Position"
              name="designation"
              value={alumni.designation}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              type="text"
              placeholder="Phone"
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
              placeholder="LinkedIn URL"
              name="linkedin"
              value={alumni.linkedin}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Update Alumni
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAlumni;
