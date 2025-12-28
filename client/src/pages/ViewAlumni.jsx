import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAlumnus } from "../api/alumniApi";

const ViewAlumni = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const data = await getAlumnus(id);
        setAlumni(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlumni();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!alumni) return <div className="p-4">Alumni not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">{alumni.name}</h1>
        <div className="grid grid-cols-1 gap-3">
          <div><strong>Roll Number:</strong> {alumni.rollNumber || '-'}</div>
          <div><strong>Course / Branch:</strong> {alumni.department || '-'}</div>
          <div><strong>Year:</strong> {alumni.batch || '-'}</div>
          <div><strong>Company:</strong> {alumni.company || '-'}</div>
          <div><strong>Job Title:</strong> {alumni.designation || '-'}</div>
          <div><strong>Email:</strong> {alumni.email ? (
            <a className="text-blue-600" href={`mailto:${alumni.email}`}>{alumni.email}</a>
          ) : '-'}
          </div>
          <div><strong>Phone:</strong> {alumni.phone || '-'}</div>
          <div>
            <strong>LinkedIn:</strong>{' '}
            {alumni.linkedin ? (
              <a className="text-blue-600" href={alumni.linkedin} target="_blank" rel="noreferrer">Profile</a>
            ) : '-'}
          </div>
          <div><strong>Notes:</strong> {alumni.notes || '-'}</div>
        </div>

        <div className="mt-6 flex space-x-3">
          <Link to="/alumni" className="px-4 py-2 bg-gray-200 rounded">Back</Link>
          {alumni.email && (
            <a href={`mailto:${alumni.email}`} className="px-4 py-2 bg-blue-600 text-white rounded">Contact</a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAlumni;
