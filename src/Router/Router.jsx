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
import AdminRoute from "../PrivetRoute/AdminRoute";
import Edit from "../Pages/Dashboard/Edit";
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
            path: 'home',
            element: <DashboardHome></DashboardHome>
          },
          {
            path: 'edit/:id',
            element: <Edit></Edit>,
            loader:({params})=>fetch (`http://localhost:5000/donation/${params.id}`)
           
          },
          {
            path: 'my-donation-requests',
            element: <MyDonationReques></MyDonationReques>
          }
          , {
            path: 'create-donation-request',
            element: <CreateDonationpage></CreateDonationpage>
          },
          // adimn collection
          {
            path: 'adminhome',
            element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
          },
          {
            path: 'all-users',
            element: <AdminRoute><Allusers></Allusers></AdminRoute>
          },
          {
            path: 'all-blood-donation-request',
            element: <AdminRoute><Allbloodrequest></Allbloodrequest></AdminRoute>
          },
          {
            path: 'content-management',
            element: <AdminRoute><ContentManagement></ContentManagement></AdminRoute>
          },
        ]
      },

    ]
  },
]);
export default router