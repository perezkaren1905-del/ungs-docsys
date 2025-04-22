import { useState } from 'react';
import Login from './pages/Auth/login/login';
import ResetPassEmail from './pages/Auth/login/resetpassemail';
import "./assets/styles/App.css";
import { useLocation, Routes, Route } from 'react-router-dom';

function App() {
  const [activeModal, setActiveModal] = useState(null); // null, 'login', or 'resetpass'
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  if (isDashboard) {
    return null; // Don't show the main app content on dashboard
  }
  
  return (
    <div className="app-container">
      {/* Main Content */}
      <div className="main-content">
        <div className="logo">
          <h1>docSYS</h1>
          <h2>Sistema de Gestión de Postulaciones y Dictámenes Docentes UNGS</h2>
        </div>
        <div className="auth-buttons">
          <button onClick={() => setActiveModal('login')}>Ingresar</button>
          <button onClick={() => setActiveModal('register')}>Registrarme</button>
        </div>
      </div>

      {/* Login Modal */}
      {activeModal === 'login' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <Login 
              onClose={() => setActiveModal(null)}
              onForgotPassword={() => setActiveModal('resetpass')}
            />
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {activeModal === 'resetpass' && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ResetPassEmail 
              onClose={() => setActiveModal(null)}
              onBackToLogin={() => setActiveModal('login')}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;