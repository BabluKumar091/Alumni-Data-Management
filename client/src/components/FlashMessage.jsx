import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const FlashMessage = ({ message, type = 'success', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-500 text-lg" />;
      case 'error':
        return <FaExclamationTriangle className="text-red-500 text-lg" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-500 text-lg" />;
      case 'info':
        return <FaInfoCircle className="text-blue-500 text-lg" />;
      default:
        return <FaInfoCircle className="text-blue-500 text-lg" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      case 'warning':
        return 'text-yellow-800';
      case 'info':
        return 'text-blue-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.95 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`fixed top-4 left-4 right-4 z-50 max-w-md mx-auto ${getBgColor()} border rounded-lg shadow-lg p-4 flex items-center space-x-3`}
      >
        {getIcon()}
        <div className={`flex-1 ${getTextColor()} font-medium text-sm sm:text-base`}>
          {message}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
            aria-label="Close message"
          >
            <FaTimes className="text-sm" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default FlashMessage;