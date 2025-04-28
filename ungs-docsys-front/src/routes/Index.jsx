import Login from '../pages/Auth/login/Login';
import Main from '../pages/Main/Main';
import Home from '../pages/Home/Home';

export const routes = [
    {
      path: "/",
      element: <Main />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/home",
      element: <Home />,
      requiredRoles: ['default']
    }
];