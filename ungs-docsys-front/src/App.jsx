import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login from './pages/Auth/login/login';
import ResetPassEmail from './pages/Auth/login/resetpassemail';
import UserType from './pages/Auth/register/usertype';
import PersonalData from './pages/Auth/register/personaldata';
import EmailPass from './pages/Auth/register/emailpass';
import './assets/styles/App.css';

function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [registrationData, setRegistrationData] = useState({});
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  if (isDashboard) return null;

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
          <button onClick={() => setActiveModal('usertype')}>Registrarme</button>
        </div>
      </div>

      {/* Auth Modals */}
      {activeModal === 'login' && (
        <ModalWrapper onClose={() => setActiveModal(null)}>
          <Login 
            onForgotPassword={() => setActiveModal('resetpass')}
          />
        </ModalWrapper>
      )}

      {activeModal === 'resetpass' && (
        <ModalWrapper onClose={() => setActiveModal(null)}>
          <ResetPassEmail 
            onBackToLogin={() => setActiveModal('login')}
          />
        </ModalWrapper>
      )}

      {/* Registration Flow Modals */}
      {activeModal === 'usertype' && (
        <ModalWrapper onClose={() => setActiveModal(null)}>
          <UserType
            onSelect={(userType) => {
              setRegistrationData({ userType });
              setActiveModal('personaldata');
            }}
          />
        </ModalWrapper>
      )}

      {activeModal === 'personaldata' && (
        <ModalWrapper onClose={() => setActiveModal(null)}>
          <PersonalData
            userType={registrationData.userType}
            onBack={() => setActiveModal('usertype')}
            onNext={(data) => {
              setRegistrationData(prev => ({ ...prev, personalData: data }));
              setActiveModal('emailpass');
            }}
          />
        </ModalWrapper>
      )}

      {activeModal === 'emailpass' && (
        <ModalWrapper onClose={() => setActiveModal(null)}>
          <EmailPass
            onBack={() => setActiveModal('personaldata')}
            onSubmit={(data) => {
              const completeData = { ...registrationData, ...data };
              console.log('Registration complete:', completeData);
              setActiveModal(null);
              // API call would go here
            }}
          />
        </ModalWrapper>
      )}
    </div>
  );
}

// Reusable modal wrapper with transitions
function ModalWrapper({ children, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default App;