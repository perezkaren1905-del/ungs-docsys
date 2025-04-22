import { useState } from 'react';
import './login.css'; // Reusing the same styles

export default function ResetPassEmail({ onClose, onBackToLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Your password reset logic here
  };

  return (
    <div className="login-modal"> {/* Reusing same class names */}
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <p>Por favor, ingrese el e-mail asociado a su cuenta</p>
        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <button type="submit" className="login-btn">Recuperar contraseña</button>
        <button 
          type="button" 
          className="forgot-password" 
          onClick={onBackToLogin}
        >
          ← Volver al login
        </button>
      </form>
    </div>
  );
}