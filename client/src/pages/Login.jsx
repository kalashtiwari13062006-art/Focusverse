import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        {error && <div className="bg-red-500/10 text-red-500 p-4 rounded-xl mb-6 border border-red-500/20">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 mb-2">Email Address</label>
            <input 
              type="email" 
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-emerald-500 outline-none transition"
              placeholder="name@gmail.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full bg-slate-900 border border-slate-700 p-4 rounded-xl focus:border-emerald-500 outline-none transition"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition mt-4">
            Login to Dashboard
          </button>
        </form>
        <p className="mt-8 text-center text-slate-400">
          Don't have an account? <Link to="/register" className="text-emerald-400 hover:underline">Register now</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
