import React, { useContext } from 'react';
import logo from '../../src/assets/Image/Logo/Blood logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { CiLogout } from 'react-icons/ci';
import UserAdmin from '../Components/Hooks/UserAdmin';
import UserVolunteer from '../Components/Hooks/UserVolunteer';
import Swal from 'sweetalert2';

const Header = () => {
    const { user, signout } = useContext(AuthContext);
    const [isAdmin ]= UserAdmin()
    const [isvolunteer] = UserVolunteer()

    const navigate = useNavigate();

    // const handleLogout = () => {
    //     signout()
    //         .then(() => {
    //             console.log('Logged out successfully');
    //             Swal.fire({
    //                 position: "top-center",
    //                 icon: "success",
    //                 title: "Logged out successfully",
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               });
    //             navigate('/'); 
    //         })
    //         .catch((error) => {
    //             Swal.fire({
    //                 position: "top-center",
    //                 icon: "success",
    //                 title: 'Logout error:', error,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //               });
             
    //         });
    // };

    const navLinks = (
        <>
            <li><NavLink to={'/'}>Home</NavLink></li>
            <li><NavLink to={'/searchDonars'}>Search Donors</NavLink></li>
            <li><NavLink to={'/requestDonation'}>Donation Request</NavLink></li>
            <li><NavLink to={'/funding'}>Funding</NavLink></li>
            <li><NavLink to={'/blogs'}>Blog</NavLink></li>
        </>
    );

    return (
        <div className="navbar px-4 lg:px-6 fixed z-50 top-0 left-0 bg-[#FCE0DF] text-red-500">
            {/* Logo Section */}
            <div className="navbar-start flex items-center gap-2">
                <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
                <a className="lg:text-xl font-bold">Blood <span className="text-red-600">Bond</span></a>
            </div>

            {/* Large Screen Navigation */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    {navLinks}
                </ul>
            </div>

            {/* Mobile Menu */}
            <div className="navbar-end lg:hidden">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                        {user && <li><Link to="/dashboard">Dashboard</Link></li>}
                        {user ? (
                            <li><a onClick={signout}>Logout</a></li>
                        ) : (
                            <li><Link to={'/login'}><CiLogout /> Login</Link></li>
                        )}
                    </ul>
                </div>
            </div>

            {/* User Profile */}
            {user && (
                <div className="navbar-end hidden lg:flex">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL || '/default-avatar.png'} alt="User" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                          {
                            isAdmin?  <li><Link to="/dashboard/adminhome">Dashboard</Link></li>:isvolunteer?  <li><Link to="/dashboard/volunteerhome">Dashboard</Link></li>:  <li><Link to="/dashboard/home">Dashboard</Link></li>
                          }
                            <li><a onClick={signout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}

            {!user && (
                <div className="navbar-end hidden lg:flex">
                    <Link to={'/login'} className="btn bg-red-900 text-white hover:bg-red-800 border-none px-4 py-2 rounded-lg">
                        Login
                    </Link>
                </div>
            )}
        </div>
    );
};

export default Header;
