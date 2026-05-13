import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Optimize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Mobile Screen</span> Experience
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
          The ultimate utility to boost battery life, improve performance, and protect your eyes with AI-powered screen optimization.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/register" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-2xl text-lg font-bold shadow-lg shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95">
            Optimize Now — It's Free
          </Link>
          <Link to="/login" className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white px-8 py-4 rounded-2xl text-lg font-bold transition-all">
            View Dashboard
          </Link>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
      >
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-emerald-500/50 transition group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🔋</div>
          <h3 className="text-xl font-bold mb-2">Battery Saver</h3>
          <p className="text-slate-400">Intelligent brightness and refresh rate management to extend battery life by up to 30%.</p>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">⚡</div>
          <h3 className="text-xl font-bold mb-2">FPS Booster</h3>
          <p className="text-slate-400">Automatically adjust settings for maximum gaming performance and smooth interactions.</p>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-3xl border border-slate-700 hover:border-purple-500/50 transition group">
          <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">🤖</div>
          <h3 className="text-xl font-bold mb-2">AI Optimization</h3>
          <p className="text-slate-400">Our neural engine analyzes your usage patterns to suggest the perfect screen profile.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
