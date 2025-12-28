import { useEffect, useState } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../api/userApi';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const data = await getUsers(token);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const changeRole = async (id, role) => {
    if (!window.confirm(`Change role to ${role}?`)) return;
    try {
      const token = localStorage.getItem('token');
      await updateUserRole(id, role, token);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to change role');
    }
  };

  const removeUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await deleteUser(id, token);
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete user');
    }
  };

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} className="border-t">
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2 space-x-2">
                  {u.role !== 'admin' ? (
                    <button onClick={() => changeRole(u._id, 'admin')} className="px-3 py-1 bg-green-600 text-white rounded">Promote</button>
                  ) : (
                    <button onClick={() => changeRole(u._id, 'student')} className="px-3 py-1 bg-yellow-600 text-white rounded">Demote</button>
                  )}
                  <button onClick={() => removeUser(u._id)} className="px-3 py-1 bg-red-600 text-white rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
