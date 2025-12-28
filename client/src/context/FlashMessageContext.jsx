import { createContext, useContext, useState } from 'react';
import FlashMessage from '../components/FlashMessage';

const FlashMessageContext = createContext();

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider');
  }
  return context;
};

export const FlashMessageProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (message, type = 'success', duration = 5000) => {
    const id = Date.now() + Math.random();
    const newMessage = { id, message, type, duration };
    setMessages(prev => [...prev, newMessage]);
  };

  const removeMessage = (id) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const showSuccess = (message, duration) => addMessage(message, 'success', duration);
  const showError = (message, duration) => addMessage(message, 'error', duration);
  const showWarning = (message, duration) => addMessage(message, 'warning', duration);
  const showInfo = (message, duration) => addMessage(message, 'info', duration);

  return (
    <FlashMessageContext.Provider value={{
      showSuccess,
      showError,
      showWarning,
      showInfo
    }}>
      {children}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {messages.map((msg) => (
          <div key={msg.id} className="pointer-events-auto mb-2">
            <FlashMessage
              message={msg.message}
              type={msg.type}
              duration={msg.duration}
              onClose={() => removeMessage(msg.id)}
            />
          </div>
        ))}
      </div>
    </FlashMessageContext.Provider>
  );
};