import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black' : 'bg-transparent'
    }`}>
      <div className="flex items-center justify-between px-8 py-4">
        <Link to="/browse" className="flex items-center gap-2">
          <span className="text-red-600 text-3xl font-bold">NETFLIX</span>
          <span className="text-white/60 text-sm hidden md:inline">by Surendar</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link to="/browse" className="text-white hover:text-gray-300 transition">Home</Link>
          <Link to="/tv-shows" className="text-white hover:text-gray-300 transition">TV Shows</Link>
          <Link to="/movies" className="text-white hover:text-gray-300 transition">Movies</Link>
          <Link to="/new-popular" className="text-white hover:text-gray-300 transition">New & Popular</Link>
          <Link to="/my-list" className="text-white hover:text-gray-300 transition">My List</Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img src={user.avatar || "https://via.placeholder.com/32"} alt="Profile" className="w-8 h-8 rounded" />
                <span className="text-white hidden md:inline">{user.name}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-black border border-gray-800 rounded shadow-lg z-50">
                  <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-800" onClick={() => setShowDropdown(false)}>Profile</Link>
                  <Link to="/account" className="block px-4 py-2 text-white hover:bg-gray-800" onClick={() => setShowDropdown(false)}>Account</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-white hover:bg-gray-800">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;