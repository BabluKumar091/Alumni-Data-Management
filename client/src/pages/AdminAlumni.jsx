import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { getAlumni, deleteAlumni } from '../api/alumniApi';
import { useFlashMessage } from '../context/FlashMessageContext';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaEye, FaUser } from 'react-icons/fa';

const AdminAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useFlashMessage();
  const { user } = useContext(AuthContext);

  // Check if user is admin
  useEffect(() => {
    if (user && user.role !== 'admin') {
      showError('Access denied. Admin privileges required.');
      // This will be handled by the PrivateRoute, but adding extra check
    }
  }, [user, showError]);

  // Don't render if not admin
  if (!user || user.role !== 'admin') {
    return null;
  }

  const fetchAlumni = async () => {
    try {
      const data = await getAlumni();
      setAlumni(data.items || []);
    } catch (err) {
      console.error('Error fetching alumni:', err);
      showError('Failed to load alumni data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumni();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}'s profile?`)) return;

    try {
      const token = localStorage.getItem('token');
      await deleteAlumni(id, token);
      showSuccess('Alumni profile deleted successfully!');
      fetchAlumni(); // Refresh the list
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete alumni profile');
    }
  };

  const filteredAlumni = alumni.filter(al =>
    al.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    al.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    al.batch?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    al.company?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading alumni data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Alumni Management</h1>
              <p className="mt-2 text-gray-600">Manage JIET alumni profiles and information</p>
            </div>
            <Link
              to="/alumni/add"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FaPlus className="mr-2" />
              Add New Alumni
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search alumni by name, email, batch, or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Alumni Grid */}
        {filteredAlumni.length === 0 ? (
          <div className="text-center py-12">
            <FaUser className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No alumni found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding a new alumni profile.'}
            </p>
            {!searchTerm && (
              <div className="mt-6">
                <Link
                  to="/alumni/add"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <FaPlus className="mr-2" />
                  Add First Alumni
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((al, index) => (
              <motion.div
                key={al._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FaUser className="text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900">{al.name}</h3>
                      <p className="text-sm text-gray-600">{al.batch}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Email:</span> {al.email}</p>
                    {al.company && <p><span className="font-medium">Company:</span> {al.company}</p>}
                    {al.designation && <p><span className="font-medium">Role:</span> {al.designation}</p>}
                    {al.phone && <p><span className="font-medium">Phone:</span> {al.phone}</p>}
                  </div>

                  <div className="mt-6 flex space-x-2">
                    <Link
                      to={`/alumni/${al._id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                    >
                      <FaEye className="mr-2" />
                      View
                    </Link>
                    <Link
                      to={`/alumni/edit/${al._id}`}
                      className="flex-1 inline-flex items-center justify-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(al._id, al.name)}
                      className="inline-flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-200"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Alumni Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{alumni.length}</div>
              <div className="text-sm text-gray-600">Total Alumni</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {alumni.filter(al => al.company).length}
              </div>
              <div className="text-sm text-gray-600">Employed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(alumni.map(al => al.batch)).size}
              </div>
              <div className="text-sm text-gray-600">Batches</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlumni;