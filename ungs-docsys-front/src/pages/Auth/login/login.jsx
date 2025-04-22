import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function Login({ onClose, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Hardcoded test user
    if (email === 'abc@123.com' && password === '12345678') {
      // Successful login
      navigate('/dashboard');
      if (onClose) onClose(); // Close modal if in modal view
    } else {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <div className="login-modal">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Iniciar sesión</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Iniciar sesión</button>
        <button 
          type="button" 
          className="forgot-password"
          onClick={onForgotPassword}
        >
          Olvidé mi contraseña
        </button>
      </form>
    </div>
  );
}