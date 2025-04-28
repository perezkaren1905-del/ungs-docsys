import './assets/styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/Index';
import {PrivateRoute} from './components/security/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          // Verificamos si la ruta tiene roles requeridos
          const { requiredRoles } = route;
          console.log(requiredRoles);
          // Si la ruta requiere roles, usamos PrivateRoute
          if (requiredRoles) {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <PrivateRoute requiredRoles={requiredRoles}>
                    {route.element}
                  </PrivateRoute>
                }
              />
            );
          }

          // Si no, la ruta es pública y la mostramos directamente
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Routes>
    </Router>
  );
}