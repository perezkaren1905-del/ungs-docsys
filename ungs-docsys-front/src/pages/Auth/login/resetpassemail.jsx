import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContext } from '../../../context/ToastContext';
import { useContext } from 'react';
import userData from '../../../data/users.json';
import './login.css';

export default function ResetPassEmail({ onClose, onBackToLogin }) {
  const [email, setEmail] = useState('');
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if email exists in users.json
    const userExists = userData.users.some(user => user.email === email);

    if (!email) {
      showToast('Por favor complete todos los campos', 'warning');
      return;
    }

    if (userExists) {
      localStorage.setItem('resetEmail', email);
      // In a real app, you would call your backend API here
      // For demo purposes, we'll simulate sending an email
      showToast(`Se ha enviado un enlace de recuperación a ${email}`, 'success');
      
      // Simulate email sending delay
      setTimeout(() => {
        navigate('/setnewpass'); // Redirect to password reset page
      }, 2000);
    } else {
      showToast('El correo electrónico no está registrado', 'error');
    }
  };

  return (
    <div className="login-modal">
      <button className="close-button" onClick={onClose}>×</button>
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit} noValidate>
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