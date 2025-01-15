import React from 'react';
import { FaHome } from 'react-icons/fa';
import { NavLink, Outlet } from 'react-router-dom';

export default function Dashboard() {
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
        <ul className="menu bg-orange-400 text-black min-h-full w-80 mt-16 p-4 gap-4">
          {/* Sidebar Links */}
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
          <li>
            <NavLink 
              to={'/dashboard/reports'} 
              className={({ isActive }) =>
                isActive ? 'font-bold text-white' : 'text-black'
              }
            >
              Reports
            </NavLink>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </div>
  );
}
