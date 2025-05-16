import { Navigate  } from 'react-router-dom';

const getUserRoles = () => {
  const token = localStorage.getItem('jwtToken');
  if (!token) return null;

  try {
    //TODO colocar conversion de jwt a objeto con permisos de usuario.
    const decoded = {roles: ['default']};
    return decoded.roles;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};

const PrivateRoute = ({ children, requiredRoles }) => {
  const userRoles = getUserRoles();

  if (!userRoles || !userRoles.some(role => requiredRoles.includes(role))) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export { PrivateRoute };