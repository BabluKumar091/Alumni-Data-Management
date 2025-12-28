import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBriefcase, FaGraduationCap, FaUser } from 'react-icons/fa';

const cardVariants = {
  hidden: { opacity: 0, y: 8 },
  enter: { opacity: 1, y: 0 },
  hover: { y: -6, boxShadow: '0px 12px 30px rgba(99,102,241,0.18)' },
};

const AlumniCard = ({ al }) => {
  const initials = (al.name || 'A').split(' ').map(n => n[0]).slice(0,2).join('');

  return (
    <motion.article
      layout
      initial="hidden"
      animate="enter"
      whileHover="hover"
      variants={cardVariants}
      className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-transform duration-300"
    >
      <div className="flex flex-col items-center p-6">
        <div className="w-28 h-28 bg-linear-to-tr from-indigo-500 to-cyan-400 rounded-full flex items-center justify-center text-3xl text-white font-bold ring-4 ring-white">
          {al.photoUrl ? (
            <img src={al.photoUrl} alt={al.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            initials
          )}
        </div>

        <h3 className="mt-4 text-lg font-semibold text-gray-800 text-center">{al.name}</h3>
        <div className="mt-2 text-sm text-gray-500 text-center">{al.rollNumber || '-'}</div>

        <div className="mt-4 w-full text-sm text-gray-600 space-y-1">
          <div className="flex items-center gap-2"><FaGraduationCap className="text-indigo-500" /> <span>{al.department || '-'}</span></div>
          <div className="flex items-center gap-2"><FaBriefcase className="text-cyan-500" /> <span>{al.company || '-'}</span></div>
          <div className="flex items-center gap-2"><FaUser className="text-gray-500" /> <span>{al.designation || '-'}</span></div>
        </div>

        <div className="mt-5 w-full flex justify-center">
          <Link to={`/alumni/${al._id}`} className="inline-flex items-center justify-center px-4 py-2 bg-linear-to-r from-indigo-600 to-cyan-500 text-white rounded-xl shadow hover:shadow-lg transition">
            View Profile
          </Link>
        </div>
      </div>
    </motion.article>
  );
};

export default AlumniCard;
