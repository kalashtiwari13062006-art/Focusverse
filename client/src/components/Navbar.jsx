import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-emerald-500 flex items-center gap-2">
          <span>📱</span> MobileOpt
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
          {token ? (
            <>
              <Link to="/dashboard" className="hover:text-emerald-400 transition">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 text-red-500 px-4 py-1.5 rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-emerald-400 transition">Login</Link>
              <Link to="/register" className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-lg transition font-medium">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
