import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get the logged-in user's email when component mounts
    const email = localStorage.getItem('loggedInUser');
    if (!email) {
      // If no user is logged in, redirect to home
      navigate('/');
    } else {
      setUserEmail(email);
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data on logout
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido {userEmail}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      
      {/* Add your dashboard content here */}
    </div>
  );
}