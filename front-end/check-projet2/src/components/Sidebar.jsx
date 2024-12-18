import React from 'react';
import { FaChalkboardTeacher, FaHome, FaFolder, FaChartBar, FaTasks } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { Link } from 'react-router';

const Sidebar = () => {
    const menuItems = [
        { name: 'Cours en Ligne', icon: <FaChalkboardTeacher />, link: 'taches/onlineCourse' },
        { name: 'Devoirs Maison', icon: <FaHome />, link: 'taches/homeWork' },
        { name: 'Cote Administratif', icon: <FaFolder />, link: 'taches/admin' },
        { name: 'Statistique', icon: <FaChartBar />, link: 'taches/dashboard' },
    ];

    const tasksMenu = [
        { name: 'Toutes les Tâches', icon: <FaTasks />, link: 'taches' },
    ];

    return (
        <div className="h-screen w-64 bg-purple-600 text-white flex flex-col shadow-lg">
            {/* Header Section with User Account */}
            <div className="p-6 flex items-center justify-between border-b border-purple-500">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <MdAccountCircle className="text-3xl" />
            </div>

            {/* Navigation Menu */}
            <nav className="flex-grow mt-6">
                <li className="px-4">
                    <h2 className="text-sm font-semibold uppercase text-purple-200">Tasks</h2>
                    <ul className="space-y-4 mt-2">
                        {tasksMenu.map((item, index) => (
                            <li
                                key={index}
                                className="hover:bg-purple-700 p-3 rounded-lg cursor-pointer transition duration-300"
                            >
                                <Link to={`/${item.link}`}>
                                    <div className="flex items-center gap-3">
                                        <span>{item.icon}</span>
                                        <span>{item.name}</span>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <ul className="space-y-6">
                    <li className="px-4">
                        <h2 className="text-sm font-semibold uppercase text-purple-200">Main</h2>
                        <ul className="space-y-4 mt-2">
                            {menuItems.slice(0, 2).map((item, index) => (
                                <li
                                    key={index}
                                    className="hover:bg-purple-700 p-3 rounded-lg cursor-pointer transition duration-300"
                                >
                                    <Link to={`/${item.link}`}>
                                        <div className="flex items-center gap-3">
                                            <span>{item.icon}</span>
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="px-4">
                        <h2 className="text-sm font-semibold uppercase text-purple-200">Administration</h2>
                        <ul className="space-y-4 mt-2">
                            {menuItems.slice(2).map((item, index) => (
                                <li
                                    key={index}
                                    className="hover:bg-purple-700 p-3 rounded-lg cursor-pointer transition duration-300"
                                >
                                    <Link to={`/${item.link}`}>
                                        <div className="flex items-center gap-3">
                                            <span>{item.icon}</span>
                                            <span>{item.name}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>

                </ul>
            </nav>

            {/* Footer Section */}
            <div className="p-6 border-t border-purple-500 text-center">
                <p className="text-sm">© 2024 Your Company</p>
            </div>
        </div>
    );
};

export default Sidebar;