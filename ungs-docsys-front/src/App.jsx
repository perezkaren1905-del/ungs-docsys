import './assets/styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes/Index';
import {PrivateRoute} from './components/security/PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const { requiredRoles } = route;
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
          return <Route key={index} path={route.path} element={route.element} />;
        })}
      </Routes>
    </Router>
  );
}