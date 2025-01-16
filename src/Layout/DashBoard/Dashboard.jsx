import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';
import UserAdmin from '../../Components/Hooks/UserAdmin';

export default function Dashboard() {

  // TODO:
  const [isAdmin] = UserAdmin()

  return (
    <div className="drawer lg:drawer-open">
      {/* Main Wrapper for the Layout */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col p-4">
        {/* Content of the selected route */}
        <Outlet />
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu  text-black min-h-full w-80 mt-16 p-4 gap-4">
          {/* Sidebar Links */}
          {
            isAdmin ? <>
              {/* <li>
                <NavLink
                  to={'/dashboard/profile'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Profile
                </NavLink>
              </li> */}
              {/* adimn home */}
              <li>
                <NavLink
                  to={'/dashboard/adminhome'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Home <FaHome></FaHome>
                </NavLink>
              </li>
              {/* all-blood-donation-request */}
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
              {/* content-management */}
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
              {/* all users */}
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


            </> : 
            // donar
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
                  to={'/dashboard/Home'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  Home <FaHome></FaHome>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={'/dashboard/my-donation-requests'}
                  className={({ isActive }) =>
                    isActive ? 'font-bold text-white' : 'text-black'
                  }
                >
                  My Donation Requests Page
                </NavLink>
              </li>
              <li>
            <NavLink
              to={'/dashboard/create-donation-request'}
              className={({ isActive }) =>
                isActive ? 'font-bold text-white' : 'text-black'
              }
            >
              Create Donation Request Page
            </NavLink>
          </li>

            </>
          }
          
          

        
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
}
