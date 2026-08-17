import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Droplets, Map, BookOpen, LayoutDashboard, PlusCircle, Users, BarChart3, ShieldCheck, UserCheck } from 'lucide-react';
import { Role } from '../types';

interface NavbarProps {
  userRole?: Role;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ userRole = 'CITIZEN', onLogout }) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-sky-500 to-teal-400 p-0.5 shadow-md shadow-cyan-500/30 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Droplets className="w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-outfit font-extrabold text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">
                  HydroHarvest
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                  IKS Ready
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-wide font-medium hidden sm:block">
                National Water Harvesting & Recharge Platform
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive('/dashboard')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/assessment/new"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive('/assessment/new')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              <span>On-Spot Assessment</span>
            </Link>

            <Link
              to="/gis-map"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive('/gis-map')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <Map className="w-4 h-4 text-teal-400" />
              <span>Heritage GIS</span>
            </Link>

            <Link
              to="/iks-hub"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive('/iks-hub')
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                  : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>IKS Knowledge</span>
            </Link>

            <Link
              to="/community"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive('/community')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <Users className="w-4 h-4 text-sky-400" />
              <span>Community</span>
            </Link>

            <Link
              to="/analytics"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                isActive('/analytics')
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Analytics</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 bg-slate-900/80 border border-slate-800 rounded-full text-xs">
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-300 text-[11px] font-medium">{userRole}</span>
            </div>

            <Link
              to="/login"
              className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-semibold text-xs rounded-lg shadow-md shadow-cyan-600/30 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>

        </div>
      </div>
    </header>
  );
};
