import React, { useContext } from 'react';
import logo from '../../src/assets/Image/Logo/Blood logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { user, signout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        signout()
            .then(() => {
                console.log('Logged out successfully');
                navigate('/'); // Redirect to home
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    const navLinks = (
        <>
            <NavLink to={'/'}><li>Home</li></NavLink>
            <li>Donation Request</li>
            <li>Blog</li>
            {user && <NavLink to={'/dashboard'}><li>Dashboard</li></NavLink>}
        </>
    );

    return (
        <div className="navbar px-6 fixed z-10 top-0 left-0 bg-[#FCE0DF] text-red-500">
            <div className="navbar-start">
                <div className="flex items-center gap-2">
                    <img className="w-10 h-10 rounded-full" src={logo} alt="Logo" />
                    <a className="lg:text-xl font-bold">Blood <span className="text-red-600">Bond</span></a>
                </div>
            </div>
            <div className="navbar-end hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-5">
                    {navLinks}
                </ul>
            </div>
            {user ? (
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src={user.photoURL || '/default-avatar.png'} alt="User" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            ) : (
                <div className="ml-6">
                   
                    <Link to={'/login'} className="btn bg-red-900 text-white hover:bg-red-900 border-none px-4 py-2 rounded-lg ml-4">
                        Login
                    </Link>
                </div>
            )}

        </div>
    );
};

export default Header;
