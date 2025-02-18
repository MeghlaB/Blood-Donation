import React, { useContext, useState } from 'react';
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
import { ThemeContext } from '../../Context/ThemeProvider';

export default function Dashboard() {
  const { theme } = useContext(ThemeContext); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAdmin] = UserAdmin();
  const [isvolunteer] = UserVolunteer();
  const navigate = useNavigate();
  const { user, signout } = useContext(AuthContext);

  const getBgClass = () => (theme === 'dark' ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900');
  const getCardBgClass = () => (theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-white text-gray-800');
  const getTextClass = () => (theme === 'dark' ? 'text-gray-200' : 'text-gray-700');
  const getSubTextClass = () => (theme === 'dark' ? 'text-gray-400' : 'text-gray-600');

  const handleLogout = () => {
    signout()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen ${getBgClass()}`}>
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 w-80 min-h-screen p-4 ${getCardBgClass()}`}
      >
        {/* Close Button */}
        <button
          onClick={toggleSidebar}
          className={`btn bg-red-950 text-white btn-sm absolute top-2 right-4`}
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                    isActive ? 'font-bold text-red-900' : getTextClass()
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
                isActive ? 'font-bold text-red-900' : getTextClass()
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>
          <li className="pt-11">
            <a onClick={handleLogout}>
              <CiLogout />
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${getBgClass()}`}>
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
