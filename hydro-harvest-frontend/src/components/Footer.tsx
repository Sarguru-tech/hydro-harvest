import React from 'react';
import { Droplets, ShieldCheck, Heart, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Droplets className="w-6 h-6 text-cyan-400" />
            <span className="font-outfit font-bold text-lg text-slate-100">HydroHarvest</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            IKS-Integrated Intelligent Rainwater Harvesting & Artificial Recharge Assessment Platform. Smart India Hackathon 2025 Submission.
          </p>
          <div className="flex items-center space-x-2 text-[11px] text-amber-400 font-medium">
            <Award className="w-4 h-4" />
            <span>Honoring Traditional Indian Hydrological Heritage</span>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">Key Modules</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/assessment/new" className="hover:text-cyan-300 transition-colors">On-Spot Assessment Engine</a></li>
            <li><a href="/gis-map" className="hover:text-cyan-300 transition-colors">Traditional Water Heritage GIS Map</a></li>
            <li><a href="/iks-hub" className="hover:text-amber-300 transition-colors">IKS Knowledge Hub (Eri, Baoli, Johad)</a></li>
            <li><a href="/dashboard" className="hover:text-cyan-300 transition-colors">National Water Intelligence Dashboard</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase mb-3">Traditional Systems</h4>
          <ul className="space-y-2 text-xs">
            <li><span className="text-slate-300">South India:</span> Eri & Oorani Cascading Network</li>
            <li><span className="text-slate-300">North-West:</span> Stepwells (Baoli), Taanka & Johads</li>
            <li><span className="text-slate-300">East:</span> Ahar-Pyne Floodwater Diversion</li>
            <li><span className="text-slate-300">West:</span> Phad & Bandhara Irrigation Weirs</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-slate-200 text-xs tracking-wider uppercase">Compliance & Auditing</h4>
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs space-y-1">
            <div className="flex items-center space-x-2 text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>CGWB & BIS Standard Aligned</span>
            </div>
            <p className="text-[11px] text-slate-400">Calculations follow Central Ground Water Board guidelines for artificial recharge to aquifers.</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-900/60 text-center text-xs text-slate-400">
        <p>© 2025 HydroHarvest. Developed for Smart India Hackathon 2025. Built with Java 17 Spring Boot & React TypeScript.</p>
      </div>
    </footer>
  );
};
