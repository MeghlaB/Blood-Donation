import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Components/Auth/Register";
import Login from "../Components/Auth/Login";
import Dashboard from '../Layout/DashBoard/Dashboard'
import Proflie from "../Pages/Dashboard/Profile";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import MyDonationReques from "../Pages/Dashboard/MyDonationReques";
import CreateDonationpage from "../Pages/Dashboard/CreateDonationpage";
import AdminHome from "../Pages/Dashboard/DashboardAdimn/AdminHome";
import Allusers from "../Pages/Dashboard/DashboardAdimn/Allusers";
import Allbloodrequest from "../Pages/Dashboard/DashboardAdimn/Allbloodrequest";
import ContentManagement from "../Pages/Dashboard/DashboardAdimn/ContentManagement";
import Privet from "../PrivetRoute/Privet";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      // Dashboard
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
          // Proflie
          {
            path: 'profile',
            element: <Proflie></Proflie>
          },
          // donar collection
          {
            path:'Home',
            element:<DashboardHome></DashboardHome>
          },
          {
            path:'my-donation-requests',
            element:<MyDonationReques></MyDonationReques>
          }
          ,{
            path:'create-donation-request',
            element:<CreateDonationpage></CreateDonationpage>
          },
          // adimn collection
          {
            path:'adminhome',
            element:<AdminHome></AdminHome>
          },
          {
            path:'all-users',
            element:<Allusers></Allusers>
          },
          {
            path:'all-blood-donation-request',
            element:<Allbloodrequest></Allbloodrequest>
          },
          {
            path:'content-management',
            element:<ContentManagement></ContentManagement>
          },
        ]
      },

    ]
  },
]);
export default router