import { useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <div className="main-content">
        <div className="logo">
          <h1>docSYS</h1>
          <h2>Sistema de Gestión de Postulaciones y Dictámenes Docentes UNGS</h2>
        </div>
        <div className="auth-buttons">
          <button onClick={() => navigate('/login')}>Ingresar</button>
          <button onClick={() => navigate('/login')}>Registrarme</button>
        </div>
      </div>

    </div>
  );
};