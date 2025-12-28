import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAlumnus } from '../api/alumniApi';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaBriefcase, FaGraduationCap, FaUser } from 'react-icons/fa';

const Hero = ({ al }) => (
  <div className="w-full bg-linear-to-r from-indigo-600 to-cyan-400 py-12">
    <div className="max-w-4xl mx-auto text-center text-white">
      <div className="flex justify-center -mt-20">
        <div className="w-40 h-40 bg-white rounded-full overflow-hidden shadow-2xl flex items-center justify-center">
          {al.photoUrl ? <img src={al.photoUrl} alt={al.name} className="w-full h-full object-cover" /> : <div className="text-4xl font-bold text-indigo-600">{(al.name||'A').split(' ').map(n=>n[0]).slice(0,2).join('')}</div>}
        </div>
      </div>
      <h1 className="mt-4 text-3xl font-bold">{al.name}</h1>
      <div className="mt-2 flex justify-center gap-4 text-sm">
        <div className="bg-white/20 px-3 py-1 rounded-lg">{al.rollNumber || '-'}</div>
        <div className="bg-white/20 px-3 py-1 rounded-lg">{al.department || '-'}</div>
        <div className="bg-white/20 px-3 py-1 rounded-lg">Passout {al.batch || '-'}</div>
      </div>
    </div>
  </div>
);

const GlassCard = ({ title, children }) => (
  <motion.div layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white/60 backdrop-blur-md rounded-2xl p-6 shadow-lg">
    <h3 className="font-semibold text-lg mb-3">{title}</h3>
    {children}
  </motion.div>
);

const AlumniProfile = () => {
  const { id } = useParams();
  const [al, setAl] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getAlumnus(id);
        setAl(data);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  if (!al) return <div className="min-h-screen flex items-center justify-center">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <Hero al={al} />

      <main className="max-w-5xl mx-auto -mt-12 px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <GlassCard title="Professional Details">
            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex items-center gap-2"><FaBriefcase className="text-indigo-500"/> <span>{al.company || '-'}</span></div>
              <div className="flex items-center gap-2"><FaUser className="text-gray-500"/> <span>{al.designation || '-'}</span></div>
              <div className="flex items-center gap-2"><FaGraduationCap className="text-indigo-500"/> <span>Graduated: {al.batch || '-'}</span></div>
            </div>
          </GlassCard>
        </div>

        <aside className="space-y-6">
          <GlassCard title="Contact Information">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3"><FaEnvelope className="text-indigo-500"/> <a className="text-indigo-700" href={`mailto:${al.email}`}>{al.email || '-'}</a></div>
              <div className="flex items-center gap-3"><FaPhone className="text-indigo-500"/> <a className="text-indigo-700" href={`tel:${al.phone}`}>{al.phone || '-'}</a></div>
              <div className="flex items-center gap-3"><FaLinkedin className="text-indigo-500"/> {al.linkedin ? <a href={al.linkedin} target="_blank" rel="noreferrer" className="text-indigo-700">View LinkedIn</a> : '-'}</div>
            </div>
          </GlassCard>

          <GlassCard title="Academic Information">
            <div className="text-sm text-gray-700 space-y-1">
              <div><strong>Roll No:</strong> {al.rollNumber || '-'}</div>
              <div><strong>Department:</strong> {al.department || '-'}</div>
              <div><strong>Year:</strong> {al.batch || '-'}</div>
            </div>
          </GlassCard>
        </aside>
      </main>
    </div>
  );
};

export default AlumniProfile;
