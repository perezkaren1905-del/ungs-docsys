import Login from '../pages/Auth/login/login';
import Main from '../pages/Main/Main';
import Home from '../pages/Home/Home';
import SignUp from '../pages/Auth/signup/SignUp';
import ForgotPassword from '../pages/Auth/forgotPass/forgotPass';
import SetNewPass from '../pages/Auth/setNewPass/setNewPass';
import JobAppList from '../pages/jobAppMng/jobAppList/JobAppList';
import CreateJobApp from '../pages/jobAppMng/createJobApp/CreateJobApp'; 
import ViewJobApp from '../pages/jobAppMng/viewJobApp/ViewJobApp';

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
      path: "/signUp",
      element:<SignUp />
    },
    {
      path: "forgotPass",
      element: <ForgotPassword />
    },
    {
      path: "setNewPass",
      element: <SetNewPass />
    },
    {
      path: "jobAppList",
      element: <JobAppList />
    },
    {
      path: "createJobApp",
      element: <CreateJobApp />
    },
    {
      path: "viewJobApp",
      element: <ViewJobApp />
    }
];