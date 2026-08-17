import React from 'react';
import { BarChart3, TrendingUp, ShieldCheck, DollarSign, Droplets, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const comparisonData = [
    { metric: 'Potable Water Demand (L/Yr)', before: 197100, after: 24200 },
    { metric: 'Groundwater Table Depletion Rate', before: 85, after: 12 },
    { metric: 'Monetary Water Bill (₹/Yr)', before: 28500, after: 3480 },
    { metric: 'Monsoon Runoff Waste (L/Yr)', before: 344000, after: 0 },
  ];

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <BarChart3 className="w-4 h-4" />
          <span>Regional Hydro-Analytics</span>
        </div>
        <h1 className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">
          Water Savings & Recharge Impact Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Before vs After implementation comparison of rooftop rainwater harvesting and artificial recharge structures.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/30 glass-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Potable Water Substitution Rate</span>
          <p className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">88.5 %</p>
          <p className="text-xs text-slate-400 mt-1">Replaces municipal piped water</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/60 to-slate-900 border border-emerald-500/30 glass-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">Estimated Annual Monetary Savings</span>
          <p className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">₹ 2,182,800</p>
          <p className="text-xs text-slate-400 mt-1">Across 148 assessed properties</p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/60 to-slate-900 border border-amber-500/30 glass-card">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Aquifer Elevation Improvement</span>
          <p className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">+ 2.4 Meters</p>
          <p className="text-xs text-slate-400 mt-1">Post-monsoon water table rise</p>
        </div>
      </div>

      <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            <span>Before vs After RWH & Recharge Implementation Impact</span>
          </h2>
          <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
            87.7% Net Reduction in Water Strain
          </span>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <XAxis dataKey="metric" stroke="#64748b" fontSize={11} />
              <YAxis stroke="#64748b" fontSize={11} />
              <Tooltip contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px' }} />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="before" name="Before RWH Implementation" fill="#ef4444" radius={[6, 6, 0, 0]} />
              <Bar dataKey="after" name="After HydroHarvest Optimization" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
