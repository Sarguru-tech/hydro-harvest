import React from 'react';
import { Link } from 'react-router-dom';
import { Download, FileText, Printer, ShieldCheck, MapPin } from 'lucide-react';
import { MOCK_ASSESSMENTS } from '../services/api';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
          <FileText className="w-4 h-4" />
          <span>Official Reports Hub</span>
        </div>
        <h1 className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">
          Assessment Reports & PDF Downloads
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Generate, preview, and print government-ready PDF assessment reports.
        </p>
      </div>

      <div className="space-y-4">
        {MOCK_ASSESSMENTS.map((a) => (
          <div key={a.id} className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">REPORT #RPT-2025-{a.id}</span>
              <h3 className="text-lg font-outfit font-bold text-slate-100">{a.assessmentName}</h3>
              <p className="text-xs text-slate-400 flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>{a.address}, {a.district}, {a.state}</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                to={`/assessment/${a.id}`}
                className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5"
              >
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>View Digital Report</span>
              </Link>
              <Link
                to={`/assessment/${a.id}`}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
