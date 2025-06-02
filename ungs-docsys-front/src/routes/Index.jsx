import Login from '../pages/Auth/login/login';
import Main from '../pages/Main/Main';
import Home from '../pages/Home/Home';
import SignUp from '../pages/Auth/signup/SignUp';
import ForgotPassword from '../pages/Auth/forgotPass/forgotPass';
import SetNewPass from '../pages/Auth/setNewPass/setNewPass';
import JobAppList from '../pages/jobAppMng/jobAppList/JobAppList';
import CreateJobApp from '../pages/jobAppMng/createJobApp/CreateJobApp'; 
import ViewJobApp from '../pages/jobAppMng/viewJobApp/ViewJobApp';

const RECRUITER_ROLE = "RECRUITER";
const CANDIDATE_ROLE = "CANDIDATE";

export const routes = [
    {
      path: "/",
      element: <Login />
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
      element: <JobAppList />,
      requiredRoles: [RECRUITER_ROLE, CANDIDATE_ROLE]
    },
    {
      path: "createJobApp",
      element: <CreateJobApp />,
      requiredRoles: [RECRUITER_ROLE]
    },
    {
      path: "viewJobApp/:id",
      element: <ViewJobApp />,
      requiredRoles: [RECRUITER_ROLE]
    }
];