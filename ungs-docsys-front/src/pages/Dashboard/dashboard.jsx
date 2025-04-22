import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add any logout logic here
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <h1>Bienvenido abc@123.com</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
      
      {/* Add your dashboard content here */}
    </div>
  );
}