import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Droplets, Lock, Mail, ShieldCheck, UserCheck } from 'lucide-react';
import { Role } from '../types';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@hydroharvest.gov.in');
  const [password, setPassword] = useState('Admin@123');
  const [role, setRole] = useState<Role>('ADMIN');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('hydro_token', 'demo-jwt-token-sih-2025');
    localStorage.setItem('hydro_role', role);
    navigate('/dashboard');
  };

  const handleQuickSelect = (demoEmail: string, demoRole: Role) => {
    setEmail(demoEmail);
    setRole(demoRole);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md p-8 bg-slate-900/90 rounded-3xl border border-cyan-500/30 glass-card shadow-2xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 mx-auto flex items-center justify-center border border-cyan-500/40">
            <Droplets className="w-6 h-6 animate-pulse" />
          </div>
          <h2 className="text-2xl font-outfit font-bold text-slate-100">Sign In to HydroHarvest</h2>
          <p className="text-xs text-slate-400">National Water Intelligence Control Center</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300">Role Authority</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="ADMIN">ADMIN (System Administrator)</option>
              <option value="WATER_OFFICER">WATER_OFFICER (State Hydrology Officer)</option>
              <option value="FIELD_OFFICER">FIELD_OFFICER (Field Inspector)</option>
              <option value="ENGINEER">ENGINEER (RWH Design Engineer)</option>
              <option value="RESEARCHER">RESEARCHER (Academic / Hydro-Scientist)</option>
              <option value="COMMUNITY_USER">COMMUNITY_USER (Local Representative)</option>
              <option value="CITIZEN">CITIZEN (Property Owner)</option>
              <option value="VIEWER">VIEWER (Public Viewer)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/30 transition-all duration-200"
          >
            Access Dashboard
          </button>
        </form>

        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
            Judge Quick Role Preset Login
          </span>
          <div className="grid grid-cols-2 gap-1.5 text-[10px]">
            <button onClick={() => handleQuickSelect('admin@hydroharvest.gov.in', 'ADMIN')} className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-cyan-300 text-left font-medium">
              👑 Admin
            </button>
            <button onClick={() => handleQuickSelect('water.officer@hydroharvest.gov.in', 'WATER_OFFICER')} className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-teal-300 text-left font-medium">
              💧 Water Officer
            </button>
            <button onClick={() => handleQuickSelect('field.officer@hydroharvest.gov.in', 'FIELD_OFFICER')} className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-sky-300 text-left font-medium">
              📋 Field Officer
            </button>
            <button onClick={() => handleQuickSelect('citizen@hydroharvest.gov.in', 'CITIZEN')} className="p-1.5 bg-slate-900 hover:bg-slate-800 rounded border border-slate-800 text-slate-300 text-left font-medium">
              🏠 Citizen User
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
