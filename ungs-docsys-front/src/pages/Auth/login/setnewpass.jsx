import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from '../../../api/auth'; // API call (see below)

export default function ResetPasswordEmail() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(email);
      setMessage('Se ha enviado un correo para restablecer tu contraseña.');
    } catch (err) {
      setMessage('Error: Verifica el correo electrónico.');
    }
  };

  return (
    <div className="auth-container">
      <h1>Recuperar contraseña</h1>
      <p>Por favor, ingrese el correo electrónico asociado a su cuenta.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Recuperar contraseña
        </button>
      </form>

      {message && <p className="message">{message}</p>}
      <Link to="/login" className="link-text">
        Volver a iniciar sesión
      </Link>
    </div>
  );
}