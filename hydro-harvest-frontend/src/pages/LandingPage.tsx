import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Droplets, ShieldCheck, BookOpen, ArrowRight, MapPin, Calculator, Brain, Award, Activity, CheckCircle2, ChevronRight } from 'lucide-react';
import { GisMapComponent } from '../components/GisMapComponent';

export const LandingPage: React.FC = () => {
  const [trialArea, setTrialArea] = useState<number>(200);
  const [trialRainfall, setTrialRainfall] = useState<number>(1000);
  const [trialMaterial, setTrialMaterial] = useState<string>('Concrete');

  const runoffCoeff = trialMaterial === 'Concrete' ? 0.85 : trialMaterial === 'Metal' ? 0.92 : 0.78;
  const trialHarvest = Math.round(trialArea * trialRainfall * runoffCoeff * 0.90);
  const trialSavings = Math.round(trialHarvest * 0.06);

  return (
    <div className="space-y-20 pb-20">
      
      <section className="relative pt-12 pb-20 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-water-pulse" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-cyan-500/20 to-amber-500/20 border border-cyan-500/30 rounded-full text-xs font-semibold text-cyan-300">
              <Award className="w-4 h-4 text-amber-400" />
              <span>SIH 2025 National Problem Statement Solution</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-outfit font-extrabold tracking-tight text-slate-100 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent">HydroHarvest</span>
              <br />
              <span className="text-2xl sm:text-4xl font-semibold text-slate-300 mt-2 block">
                IKS-Integrated Intelligent Rainwater Harvesting & Recharge Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Empowering citizens, hydrology engineers, and state water officers with real-time on-spot assessment of rooftop rainwater harvesting, artificial recharge suitability, and traditional Indian water wisdom.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/assessment/new"
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-base rounded-xl shadow-xl shadow-cyan-600/30 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <Calculator className="w-5 h-5" />
                <span>Start On-Spot Assessment</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/gis-map"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-base rounded-xl border border-slate-700 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <BookOpen className="w-5 h-5 text-amber-400" />
                <span>Explore Heritage GIS Map</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-900/80 rounded-2xl border border-cyan-500/20 glass-card shadow-2xl">
          <div className="text-center space-y-1">
            <p className="text-3xl font-outfit font-extrabold text-cyan-400">36.3M+</p>
            <p className="text-xs text-slate-400 font-medium">Harvestable Water (L/Yr)</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl font-outfit font-extrabold text-teal-400">27.2M+</p>
            <p className="text-xs text-slate-400 font-medium">Recharge Potential (L/Yr)</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl font-outfit font-extrabold text-amber-400">100%</p>
            <p className="text-xs text-slate-400 font-medium">Explainable AI & IKS Matched</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-3xl font-outfit font-extrabold text-sky-400">148+</p>
            <p className="text-xs text-slate-400 font-medium">Completed Field Assessments</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 glass-panel shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500/30">
                Instant Interactive Calculator Preview
              </span>
              <h2 className="text-2xl font-outfit font-bold text-slate-100 mt-2">
                Estimate Your Rooftop Harvesting Potential
              </h2>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Try our transparent mathematical engine live below before running a complete field assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Rooftop Area (m²): {trialArea} m²</label>
              <input
                type="range"
                min="50"
                max="1000"
                step="10"
                value={trialArea}
                onChange={(e) => setTrialArea(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Annual Rainfall (mm): {trialRainfall} mm</label>
              <input
                type="range"
                min="400"
                max="2500"
                step="50"
                value={trialRainfall}
                onChange={(e) => setTrialRainfall(Number(e.target.value))}
                className="w-full accent-cyan-500 bg-slate-950 h-2 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Roof Material</label>
              <select
                value={trialMaterial}
                onChange={(e) => setTrialMaterial(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Concrete">Reinforced Concrete (Coeff: 0.85)</option>
                <option value="Metal">Corrugated Metal Sheet (Coeff: 0.92)</option>
                <option value="Tiles">Clay / Concrete Tiles (Coeff: 0.78)</option>
              </select>
            </div>
          </div>

          <div className="p-6 bg-slate-950 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Calculated Annual Harvestable Volume</span>
              <p className="text-3xl font-outfit font-extrabold text-cyan-300">
                {trialHarvest.toLocaleString()} Liters / Year
              </p>
              <p className="text-xs text-slate-400 font-mono">
                Formula: {trialRainfall} mm × {trialArea} m² × {runoffCoeff} × 0.90
              </p>
            </div>

            <div className="space-y-1 text-right">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Estimated Monetary Water Bill Savings</span>
              <p className="text-2xl font-outfit font-bold text-emerald-400">
                ₹ {trialSavings.toLocaleString()} / Year
              </p>
              <p className="text-xs text-emerald-300/80 font-medium">Replaces municipal tap water demand</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
              Indian Knowledge Systems (IKS) Integration
            </span>
            <h2 className="text-3xl font-outfit font-bold text-slate-100">
              Harmonizing Millennial Water Wisdom with Modern Hydrology
            </h2>
            <p className="text-sm text-slate-400">
              Every location recommendation incorporates context-aware traditional Indian water structures verified against soil, rainfall, and terrain parameters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-900/80 rounded-2xl border border-amber-500/20 glass-card space-y-4 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                TN
              </div>
              <h3 className="text-lg font-outfit font-bold text-slate-100">Eri & Oorani Systems</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ancient Tamil Nadu cascading tank networks that capture monsoon rainfall across undulating contours, storing drinking water and elevating shallow aquifers.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold bg-amber-500/10 p-2 rounded">
                Region: Tamil Nadu & South India
              </div>
            </div>

            <div className="p-6 bg-slate-900/80 rounded-2xl border border-amber-500/20 glass-card space-y-4 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                RJ
              </div>
              <h3 className="text-lg font-outfit font-bold text-slate-100">Stepwells (Baolis) & Johads</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Subterranean stepwells and concave earthen check dams designed for arid Rajasthan & Gujarat to eliminate evaporation losses and recharge deep desert vadose zones.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold bg-amber-500/10 p-2 rounded">
                Region: Rajasthan & Gujarat Arid Zone
              </div>
            </div>

            <div className="p-6 bg-slate-900/80 rounded-2xl border border-amber-500/20 glass-card space-y-4 hover:border-amber-500/40 transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                BR
              </div>
              <h3 className="text-lg font-outfit font-bold text-slate-100">Ahar-Pyne Networks</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mauryan era floodwater diversion channels (Pynes) feeding embankment reservoirs (Ahars) across Bihar and Gangetic plains to withstand monsoons.
              </p>
              <div className="text-[11px] text-amber-300 font-semibold bg-amber-500/10 p-2 rounded">
                Region: Bihar & Gangetic Floodplains
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 bg-slate-900/80 rounded-3xl border border-slate-800 glass-panel space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-outfit font-bold text-slate-100">Live Heritage GIS & Assessment Map</h2>
              <p className="text-xs text-slate-400">Showing field assessment markers alongside historical water structures</p>
            </div>
            <Link to="/gis-map" className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1">
              <span>Open Fullscreen GIS Map</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <GisMapComponent height="400px" />
        </div>
      </section>

    </div>
  );
};
