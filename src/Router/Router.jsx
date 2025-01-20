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
import AdminHome from "../Pages/Dashboard/DashboardAdimn/AdminHome";
import Allusers from "../Pages/Dashboard/DashboardAdimn/Allusers";
import Allbloodrequest from "../Pages/Dashboard/DashboardAdimn/Allbloodrequest";
import ContentManagement from "../Pages/Dashboard/DashboardAdimn/ContentManagement";
import Privet from "../PrivetRoute/Privet";
import AdminRoute from "../PrivetRoute/AdminRoute";
import SearchPage from "../Pages/SearchPage/SearchPage";
import VolunterHome from "../Pages/Dashboard/DashboardVolunter/VolunterHome";
import DashboardHome from "../Pages/Dashboard/UserDashboard/DashboardHome";
import Edit from "../Pages/Dashboard/UserDashboard/Edit";
import MyDonationReques from "../Pages/Dashboard/UserDashboard/MyDonationReques";
import MyDonationRequests from "../Pages/Dashboard/UserDashboard/MyDonationReques";
import CreateDonationPage from "../Pages/Dashboard/UserDashboard/CreateDonationpage";
import AllDonationRequest from "../Pages/Dashboard/DashboardVolunter/AllDonationRequest";
import DonationRequest from "../Pages/NavabarRoute/DonationRequest";
import BloodDetails from "../Pages/NavabarRoute/BloodDetails";
import AddBlogPage from "../Pages/Dashboard/DashboardAdimn/AddBlogPage";
import ProfileUpdate from "../Pages/Dashboard/ProfileUpdate";
import Funding from "../Pages/NavabarRoute/Funding";
import GiveFound from "../Pages/NavabarRoute/GiveFound";
import Blogs from "../Pages/NavabarRoute/Blogs";
import BlogsDetails from "../Pages/NavabarRoute/BlogsDetails";
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
      {
        path: '/searchDonars',
        element: <SearchPage></SearchPage>
      },
      {
        path: '/requestDonation',
        element: <DonationRequest></DonationRequest>
      },
      {
        path: '/details/:id',
        element: <Privet><BloodDetails></BloodDetails></Privet>
      },
      {
        path: '/funding',
        element: <Privet><Funding></Funding></Privet>
      },
      {
        path: '/givefund',
        element: <GiveFound></GiveFound>
      },
      {
        path:'/blogs',
        element:<Blogs></Blogs>
      },
      {
        path:'/blogs/:id',
        element:<Privet><BlogsDetails></BlogsDetails></Privet>,
      
      },
      // Dashboard
      {
        path: 'dashboard',
        element: <Privet><Dashboard></Dashboard></Privet>,
        children: [
          // Proflie
          {
            path: 'profile',
            element: <Proflie></Proflie>,
          },
          {
            path: 'profile/update/:id',
            element: <ProfileUpdate></ProfileUpdate>,
            loader: ({ params }) => fetch(`https://blood-donation-server-side-psi.vercel.app/update/${params.id}`)

          },
          // donar collection
          {
            path: 'home',
            element: <DashboardHome></DashboardHome>
          },
          {
            path: 'edit/:id',
            element: <Edit></Edit>,
            loader: ({ params }) => fetch(`https://blood-donation-server-side-psi.vercel.app/donation/${params.id}`)

          },
          {
            path: 'my-donation-requests',
            element: <MyDonationReques></MyDonationReques>
          }
          , {
            path: 'create-donation-request',
            element: <CreateDonationPage></CreateDonationPage>
          },
          // adimn collection dashboard
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
          {
            path: 'content-management/add-blog',
            element: <AdminRoute><AddBlogPage></AddBlogPage></AdminRoute>
          },
          // Volunteer Collection dashboard
          {
            path: 'volunteerhome',
            element: <VolunterHome></VolunterHome>
          },
          {
            path: 'allblood-donation-request',
            element: <AllDonationRequest></AllDonationRequest>
          },
          {
            path: 'contentmanagement',
            element: <ContentManagement></ContentManagement>
          }
        ]
      },

    ]
  },
]);
export default router