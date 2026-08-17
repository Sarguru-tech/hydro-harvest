import React from 'react';
import { Calculator, Info } from 'lucide-react';
import { RooftopData, RainfallData, HarvestingCalculation } from '../types';

interface CalculationFormulaBoxProps {
  rooftop: RooftopData;
  rainfall: RainfallData;
  calculation: HarvestingCalculation;
}

export const CalculationFormulaBox: React.FC<CalculationFormulaBoxProps> = ({
  rooftop,
  rainfall,
  calculation
}) => {
  return (
    <div className="p-5 bg-slate-900/90 rounded-2xl border border-cyan-500/30 glass-card space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-cyan-400" />
          <h4 className="text-sm font-outfit font-bold text-slate-100">Transparent Rooftop Hydro-Formula Engine</h4>
        </div>
        <span className="text-[10px] font-mono uppercase bg-slate-800 text-cyan-300 px-2 py-0.5 rounded border border-slate-700">
          BIS / CGWB Formula
        </span>
      </div>

      <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
        <p className="text-slate-400 font-bold mb-1">// Standard Rainwater Harvesting Formula:</p>
        <p className="font-semibold text-sky-300">
          Harvestable Volume (L) = Annual Rainfall (mm) × Rooftop Area (m²) × Runoff Coefficient × Filter Efficiency (0.90)
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-medium">Rainfall (P)</span>
          <p className="font-bold text-slate-200 mt-0.5">{rainfall?.annualRainfallMm || 980} mm</p>
        </div>
        <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-medium">Roof Area (A)</span>
          <p className="font-bold text-slate-200 mt-0.5">{rooftop?.areaSqm || 150} m²</p>
        </div>
        <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-medium">Runoff Coeff (Cr)</span>
          <p className="font-bold text-slate-200 mt-0.5">{rooftop?.runoffCoefficient || 0.85}</p>
        </div>
        <div className="p-2.5 bg-slate-950/60 rounded-lg border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-medium">Filter Efficiency (η)</span>
          <p className="font-bold text-slate-200 mt-0.5">0.90 (90%)</p>
        </div>
      </div>

      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-cyan-950/60 to-sky-950/60 rounded-xl border border-cyan-500/40 text-xs">
        <span className="text-slate-300 font-semibold flex items-center gap-1.5">
          <Info className="w-4 h-4 text-cyan-400" />
          Calculated Harvestable Water Potential:
        </span>
        <span className="font-outfit font-extrabold text-lg text-cyan-300">
          {calculation?.annualHarvestableLiters?.toLocaleString() || '0'} Liters / Year
        </span>
      </div>
    </div>
  );
};
