import React, { useEffect } from 'react';
import { FaHome, FaUser } from 'react-icons/fa';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import UserAdmin from '../../Components/Hooks/UserAdmin';
import UserVolunteer from '../../Components/Hooks/UserVolunteer';
import { CgProfile } from 'react-icons/cg';
import { MdBloodtype, MdContentCopy } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import { VscRequestChanges } from 'react-icons/vsc';
import { IoCreate } from 'react-icons/io5';

export default function Dashboard() {
  const [isAdmin] = UserAdmin();
  const [isVolunteer] = UserVolunteer();
  const navigate = useNavigate();

  useEffect(() => {
 
    if (isAdmin) {
      navigate('/dashboard/adminhome');
    } else if (isVolunteer) {
      navigate('/dashboard/volunteerhome');
    } else {
      navigate('/dashboard/home');
    }
  }, [isAdmin, isVolunteer, navigate]);

  return (
    <div>
      <div className="drawer lg:drawer-open">
        {/* Main Wrapper for the Layout */}
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        {/* Main Content Area */}
        <div className="drawer-content flex flex-col p-4">
          <Outlet />
        </div>

        {/* Sidebar Area */}
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-red-300 text-black min-h-full w-80  p-4 gap-4">
            {isAdmin && (
              <>
                <li>
                  <NavLink
                    to={'/dashboard/profile'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  >
                    <CgProfile />
                    Profile 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/adminhome'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  > 
                  <FaHome />
                    Admin Home 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/all-blood-donation-request'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  ><MdBloodtype />
                    All Blood Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/content-management'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  ><MdContentCopy />
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
                    <FaUsers></FaUsers>
                    All Users
                  </NavLink>
                </li>
              </>
            )}

            {!isAdmin && isVolunteer && (
              <>
                <li>
                  <NavLink
                    to={'/dashboard/profile'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  >  <CgProfile />
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/volunteerhome'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  ><FaHome />
                    Volunteer Home 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/allblood-donation-request'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  >
                    <MdBloodtype />
                    All Blood Donation Request
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/contentmanagement'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  ><MdContentCopy />
                    Content Management
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
                    <CgProfile></CgProfile>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/home'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  ><FaHome />
                   Donar Home 
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/my-donation-requests'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  ><VscRequestChanges />
                    My Donation Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/dashboard/create-donation-request'}
                    className={({ isActive }) =>
                      isActive ? 'font-bold text-white' : 'text-black'
                    }
                  ><IoCreate />
                    Create Donation Request
                  </NavLink>
                </li>
              </>
            )}
            <div className="divider ">OR</div>
            <li>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  isActive ? 'font-bold text-white' : 'text-black'
                }
              >
                <FaHome></FaHome>
                Home
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
