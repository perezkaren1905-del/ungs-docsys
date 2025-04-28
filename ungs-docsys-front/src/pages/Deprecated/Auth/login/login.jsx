import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import userData from '../../../data/users.json';
import { ToastContext } from '../../../context/ToastContext';

const currentUsers = JSON.parse(localStorage.getItem('users')) || userData;

export default function Login({ onClose, onForgotPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const foundUser = currentUsers.users.find(user => 
      user.email === email && user.password === password
    );

    if (!email || !password) {
      showToast('Por favor complete todos los campos', 'warning');
      return;
    }
  
    if (foundUser) {
      localStorage.setItem('loggedInUser', email);
      navigate('/dashboard');
      if (onClose) onClose();
    } else {
      showToast('Correo y/o contraseña incorrectos', 'error');
    }
  };

  return (
    <div className="login-modal">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Iniciar sesión</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit} noValidate>
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