import Login from '../pages/Auth/login/Login';
import Main from '../pages/Main/Main';
import Home from '../pages/Home/Home';
import SignUp from '../pages/Auth/signup/SignUp';

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
      //requiredRoles: ['your_role_here']
    },
    {
      path: "/sign-up",
      element:<SignUp />
    }
];