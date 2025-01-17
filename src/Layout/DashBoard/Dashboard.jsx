import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import UserAdmin from '../../Components/Hooks/UserAdmin';
import UserVolunteer from '../../Components/Hooks/UserVolunteer';

export default function Dashboard() {
  const [isAdmin] = UserAdmin();
  const [isVolunteer] = UserVolunteer();

  return (
    <div className="drawer lg:drawer-open">
      {/* Main Wrapper for the Layout */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col p-4">
        <Outlet />
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-red-300 text-black min-h-full w-80 mt-16 p-4 gap-4">
          {isAdmin && (
            <>
              <li>
                <NavLink
                  to={'/dashboard/adminhome'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Home <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/all-blood-donation-request'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  All Blood Donation Request
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/content-management'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Content Management
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/all-users'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  All Users
                </NavLink>
              </li>
            </>
          )}

          {!isAdmin && isVolunteer && (
            <>
              <li>
                <NavLink
                  to={'/dashboard/volunteerhome'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Volunteer Home <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/manage-donations'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Manage Donations
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/volunteer-reports'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Reports
                </NavLink>
              </li>
            </>
          )}

          {!isAdmin && !isVolunteer && (
            <>
              <li>
                <NavLink
                  to={'/dashboard/profile'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/home'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Home <FaHome />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/my-donation-requests'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  My Donation Requests
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/create-donation-request'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Create Donation Request
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
