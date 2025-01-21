import React, { useContext, useEffect, useState } from 'react';
import { ImMenu, ImCross } from 'react-icons/im';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaUsers } from 'react-icons/fa';
import { MdBloodtype, MdContentCopy } from 'react-icons/md';
import { VscRequestChanges } from 'react-icons/vsc';
import { IoCreate } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import UserVolunteer from '../../Components/Hooks/UserVolunteer';
import UserAdmin from '../../Components/Hooks/UserAdmin';
import { AuthContext } from '../../Context/AuthProvider';
import { CiLogout } from 'react-icons/ci';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin] = UserAdmin();
  const [isvolunteer] = UserVolunteer();
  const navigate = useNavigate()
  const { user, signout, setLoading } = useContext(AuthContext);


  const handleLogout = () => {
    signout()
      .then(() => {

        navigate('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  useEffect(() => {
    if (user) {
      if (isAdmin) {
        setLoading(false)
        navigate('/dashboard/adminhome');

      } else if (isvolunteer) {
        setLoading(false)
        navigate('/dashboard/volunteerhome');

      } else {
        setLoading(false)
        navigate('/dashboard/home');

      }
      setLoading(false)
    }
  }, [isAdmin, isvolunteer, navigate]);



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 bg-base-200 w-80 min-h-screen p-4`}
      >
        {/* CloseButton */}
        <button
          onClick={toggleSidebar}
          className="btn bg-red-950 text-white btn-sm absolute top-2 right-4"
        >
          <ImCross />
        </button>

        {/* Sidebar Content */}
        <ul className="menu text-base-content mt-4">
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <CgProfile />
                  <span className="hidden lg:block">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/adminhome"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-blood-donation-request"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <MdBloodtype />
                  All Blood Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/content-management"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <MdContentCopy />
                  Content Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/all-users"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <FaUsers />
                  All Users
                </NavLink>
              </li>
            </>
          )}
          {!isAdmin && isvolunteer && (
            <>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <CgProfile />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/volunteerhome"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <FaHome />
                  Volunteer Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/allblood-donation-request"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <MdBloodtype />
                  All Blood Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/contentmanagement"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <MdContentCopy />
                  Content Management
                </NavLink>
              </li>
            </>
          )}
          {!isAdmin && !isvolunteer && (
            <>
              <li>
                <NavLink
                  to="/dashboard/profile"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <CgProfile />
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/home"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <FaHome />
                  Donor Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/my-donation-requests"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <VscRequestChanges />
                  My Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard/create-donation-request"
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-red-900' : 'text-black'
                  }
                >
                  <IoCreate />
                  Create Donation Request
                </NavLink>
              </li>
            </>
          )}
          <div className="divider">OR</div>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? 'font-bold text-red-900' : 'text-black'
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>
          <li className='pt-11'><a onClick={handleLogout}> <CiLogout />Logout</a></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Drawer Toggle Button */}
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="btn bg-red-950 text-white drawer-button"
          >
            <ImMenu />
          </button>
        </div>

        {/* Outlet for Nested Routes */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
