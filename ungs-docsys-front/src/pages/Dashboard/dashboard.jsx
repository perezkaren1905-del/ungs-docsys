import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Check both login methods
    const email = localStorage.getItem('loggedInUser');
    const registeredUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!email && !registeredUser) {
      navigate('/');
    } else {
      // Priority to registered users (more complete data)
      setUserData(registeredUser || { email: email });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const getUserType = () => {
    if (!userData) return '';
    if (userData.userType === 'docente') return 'Docente/Investigador';
    if (userData.userType === 'admin') return 'Administrador';
    return 'Usuario';
  };
  
  return (
    <div className="dashboard-container">
      {userData && (
        <>
          <div className="user-welcome">
            <h1>
              Bienvenido,{' '}
              {userData.nombre
                ? `${userData.nombre} ${userData.apellido}`
                : userData.email}
            </h1>
            <p className="user-role">
              {userData.userType && (
                <>
                  Rol: <strong>{getUserType()}</strong>
                </>
              )}
            </p>
          </div>

          <div className="dashboard-content">
            {/* Your existing dashboard content */}
            <p>Sistema de Gestión de Postulaciones y Dictámenes Docentes UNGS</p>
          </div>
        </>
      )}

      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
    </div>
  );
}