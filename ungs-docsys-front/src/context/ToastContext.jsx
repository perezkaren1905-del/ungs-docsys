// src/context/ToastContext.jsx
import { createContext, useState } from 'react';
import Toast from '../components/UI/Toast';

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error', duration = 3000) => {
    // Clear any existing toast first
    setToast(null);
    
    // Force a re-render by using setTimeout
    setTimeout(() => {
      setToast({ message, type, duration });
    }, 50);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <Toast 
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={toast.duration}
        />
      )}
    </ToastContext.Provider>
  );
}