import React, { useContext } from 'react';
import logo from '../../src/assets/Image/Logo/Blood logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout().then(() => {
            console.log('Logged out successfully');
        }).catch((error) => {
            console.error('Logout error:', error);
        });
    };

    const navLinks = (
        <>
            <NavLink to={'/'}><li><a>Home</a></li></NavLink>
            <li><a>Donation Request</a></li>
            <li><a>Blog</a></li>
        </>
    );

    return (
        <div className="navbar px-6 fixed z-10 top-0 left-0 bg-[#FCE0DF] text-red-500">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a>Parent</a>
                            <ul className="p-2">
                                <li><a>Submenu 1</a></li>
                                <li><a>Submenu 2</a></li>
                            </ul>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
                    <a className="lg:text-xl font-bold">Blood <span className="text-red-600">Bond</span></a>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user.photoURL} alt="User" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                            <li><a href="/dashboard">Dashboard</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                ) : (
                    <Link to={'/register'} className="btn btn-primary">Register</Link>
                )}
            </div>
        </div>
    );
};

export default Header;
