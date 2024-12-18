import React from 'react';
import { Link } from 'react-router';
import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
    const { isAuthenticated, logout } = useAuth();



    return (
        <nav className="bg-purple-600 shadow-md p-4">
            {/* Navbar Container */}
            <div className="container  mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/">
                    <div className="flex items-center space-x-2">
                        <div className="text-white text-2xl font-bold">🖌️ StudyFlow</div>
                    </div>
                </Link>

                {/* Navigation Links */}
                <div className=" md:flex flex items-center space-x-6">
                    {/* Login */}
                    <Link
                        to="/signIn"
                        className="flex items-center text-white hover:bg-blue-700 px-4 py-2 rounded-md transition duration-300 text-lg"
                    >
                        <FaSignInAlt className="mr-2" /> Login
                    </Link>
                    {/* Signup */}
                    <Link
                        to="/signUp"
                        className="flex items-center text-white hover:bg-green-600 px-4 py-2 rounded-md transition duration-300 text-lg"
                    >
                        <FaUserPlus className="mr-2" /> Signup
                    </Link>
                    {/* Logout */}
                    {isAuthenticated && <button
                        onClick={() => { logout() }}
                        className="flex items-center text-white hover:bg-red-600 px-4 py-2 rounded-md transition duration-300 text-lg"
                    >
                        <FaSignOutAlt className="mr-2" /> Logout
                    </button>}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button className="text-white focus:outline-none">
                        {/* Hamburger Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m4 6H4" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
