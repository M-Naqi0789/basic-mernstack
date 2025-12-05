import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="text-2xl font-bold text-indigo-600">
              MERN Tracker
            </Link>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
            <Link to="/transactions" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Ledger</Link>
          </nav>
          <div className="flex items-center space-x-4">
            {user && (
                <span className="text-sm text-gray-600 hidden sm:inline">Welcome, {user.name || 'User'}</span>
            )}
            <button 
              onClick={logout}
              className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;