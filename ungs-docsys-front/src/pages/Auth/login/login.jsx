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
      navigate('/home');
      if (onClose) onClose();
    } else {
      showToast('Correo y/o contraseña incorrectos', 'error');
    }
  };

  return (
    <div className="container">
      <button
        className="back-button" 
        onClick={() => navigate('/')}
      >&lt;  Volver</button>
      <div className="title"><h2>Iniciar sesión</h2></div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Email</label>
          <input
            type="Email"
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
        <div className="buttons-section">
            <button type="submit" className="login-button">Iniciar sesión</button>
            <button 
                type="button" 
                className="forgot-2-password"
                onClick={() => navigate('/forgotPass')}
                >
                Olvidé mi contraseña
            </button>
        </div>
        
      </form>
    </div>
  );
};