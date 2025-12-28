import { useEffect, useState, useContext, useMemo } from "react";
import { getAlumni } from "../api/alumniApi";
import AlumniCard from "../components/AlumniCard";
import { AuthContext } from "../context/AuthContext";
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const AlumniList = () => {
  const [alumni, setAlumni] = useState([]);
  const [query, setQuery] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  const fetchAlumni = async () => {
    setLoading(true);
    try {
      const data = await getAlumni();
      setAlumni(data.items || data || []);
    } catch (err) {
      console.error(err);
      setAlumni([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAlumni(); }, []);

  const branches = useMemo(() => {
    const s = new Set();
    alumni.forEach(a => a.department && s.add(a.department));
    return Array.from(s).sort();
  }, [alumni]);

  const years = useMemo(() => {
    const s = new Set();
    alumni.forEach(a => a.batch && s.add(a.batch));
    return Array.from(s).sort((a,b) => b - a);
  }, [alumni]);

  const filtered = useMemo(() => {
    return alumni.filter(a => {
      if (query) {
        const q = query.toLowerCase();
        const inText = (a.name || '').toLowerCase().includes(q) || (a.company || '').toLowerCase().includes(q) || (a.department || '').toLowerCase().includes(q);
        if (!inText) return false;
      }
      if (branch && a.department !== branch) return false;
      if (year && String(a.batch) !== String(year)) return false;
      return true;
    });
  }, [alumni, query, branch, year]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold">Alumni</h1>
          <div className="w-full max-w-lg ml-6">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, company or branch" className="w-full pl-10 pr-4 py-2 rounded-xl border shadow-sm focus:ring-2 focus:ring-indigo-300" />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <select value={branch} onChange={e=>setBranch(e.target.value)} className="px-3 py-2 border rounded-xl">
                <option value="">All Branches</option>
                {branches.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <select value={year} onChange={e=>setYear(e.target.value)} className="px-3 py-2 border rounded-xl">
                <option value="">All Years</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading alumni...</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(al => (
              <AlumniCard key={al._id} al={al} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AlumniList;
