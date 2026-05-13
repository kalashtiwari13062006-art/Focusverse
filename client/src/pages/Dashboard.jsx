import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [optimization, setOptimization] = useState(null);
  const [aiTip, setAiTip] = useState("");
  const user = JSON.parse(localStorage.getItem('user'));

  const data = [
    { time: '10am', usage: 45, battery: 85 },
    { time: '11am', usage: 52, battery: 78 },
    { time: '12pm', usage: 38, battery: 70 },
    { time: '1pm', usage: 65, battery: 55 },
    { time: '2pm', usage: 48, battery: 45 },
    { time: '3pm', usage: 30, battery: 40 },
  ];

  useEffect(() => {
    fetchDevices();
  }, []);

  const fetchDevices = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/devices`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setDevices(res.data);
      if (res.data.length > 0) handleSelectDevice(res.data[0]);
    } catch (err) {
      console.error("Fetch devices failed");
    }
  };

  const handleSelectDevice = async (device) => {
    setSelectedDevice(device);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.get(`${API_URL}/api/optimization/${device._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setOptimization(res.data);
      
      // Get AI optimization tip
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const aiRes = await axios.get(`${API_URL}/api/optimization/${device._id}/optimize?battery=40&cpu=25`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setAiTip(aiRes.data.recommendations.message);
    } catch (err) {
      console.error("Fetch optimization failed");
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hello, {user?.name} 👋</h1>
          <p className="text-slate-400">Here's your device optimization overview.</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl transition font-medium flex items-center gap-2">
          <span>+</span> Add New Device
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Devices */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold px-2">Your Devices</h2>
          {devices.map(device => (
            <button 
              key={device._id}
              onClick={() => handleSelectDevice(device)}
              className={`w-full text-left p-6 rounded-3xl border transition flex items-center gap-4 ${selectedDevice?._id === device._id ? 'bg-emerald-600/10 border-emerald-500' : 'bg-slate-800 border-slate-700 hover:border-slate-600'}`}
            >
              <div className="text-3xl">📱</div>
              <div>
                <h4 className="font-bold">{device.deviceName}</h4>
                <p className="text-xs text-slate-400 uppercase tracking-widest">{device.androidVersion}</p>
              </div>
            </button>
          ))}
          {devices.length === 0 && <div className="p-8 text-center text-slate-500 bg-slate-800/30 rounded-3xl border border-dashed border-slate-700">No devices added yet.</div>}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* AI Insight Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-600 to-blue-600 p-8 rounded-3xl shadow-xl shadow-emerald-900/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-2 rounded-lg">🤖</div>
              <h3 className="text-xl font-bold">AI Optimization Engine</h3>
            </div>
            <p className="text-emerald-50 text-lg">"{aiTip || "Select a device to see optimization tips."}"</p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">Battery Level</p>
              <h4 className="text-2xl font-bold text-emerald-400">42%</h4>
              <div className="w-full bg-slate-900 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">CPU Temperature</p>
              <h4 className="text-2xl font-bold text-orange-400">38°C</h4>
              <p className="text-xs text-slate-500 mt-2">Optimal range: 30-45°C</p>
            </div>
            <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700">
              <p className="text-slate-400 text-sm mb-1">RAM Usage</p>
              <h4 className="text-2xl font-bold text-blue-400">3.2 GB</h4>
              <p className="text-xs text-slate-500 mt-2">Total: 8.0 GB</p>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700">
            <h3 className="text-xl font-bold mb-8">Performance History</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                  <XAxis dataKey="time" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px' }}
                    itemStyle={{ color: '#10b981' }}
                  />
                  <Area type="monotone" dataKey="usage" stroke="#10b981" fillOpacity={1} fill="url(#colorUsage)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
