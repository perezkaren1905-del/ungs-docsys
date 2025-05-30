import { Navigate  } from 'react-router-dom';
import { JwtService } from '../../commons/utils/jwt.service';

const getUserRoles = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const userClaim = JwtService.getClaims(token);
    return userClaim.roles;
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