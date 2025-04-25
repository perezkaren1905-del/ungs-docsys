
import { useState, useEffect } from 'react';
import './Toast.css';

export default function Toast({ message, onClose, type = 'error', duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger the show animation
    setIsVisible(true);
    
    // Set up the hide timeout
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Wait for animation to finish
    }, duration - 300); // Subtract animation duration

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type} ${isVisible ? 'show' : 'hide'}`}>
      <div className="toast-content">
        <span className="toast-message">{message}</span>
        <button className="toast-close" onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}>×</button>
      </div>
    </div>
  );
}