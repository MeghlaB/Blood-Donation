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
            path:'home',
            element:<DashboardHome></DashboardHome>
          },
          {
            path:'my-donation-requests',
            element:<MyDonationReques></MyDonationReques>
          }
          ,{
            path:'create-donation-request',
            element:<CreateDonationpage></CreateDonationpage>
          }
        ]
      },

    ]
  },
]);
export default router