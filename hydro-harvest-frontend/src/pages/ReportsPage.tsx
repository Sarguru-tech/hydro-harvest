import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download,
  FileText,
  MapPin,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { fetchAssessments } from '../services/api';
import type { Assessment } from '../types';

export const ReportsPage: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadReports = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await fetchAssessments();

      if (Array.isArray(data)) {
        setAssessments(data);
      } else {
        setAssessments([]);
      }
    } catch (err) {
      console.error('Failed to load assessment reports:', err);
      setError('Unable to load assessment reports.');
      setAssessments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">

      {/* HEADER */}
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

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <Loader2 className="w-8 h-8 animate-spin text-cyan-400 mb-4" />

          <p className="text-sm">
            Loading assessment reports...
          </p>
        </div>
      )}

      {/* ERROR */}
      {!loading && error && (
        <div className="p-6 rounded-2xl border border-red-500/30 bg-red-950/20">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />

            <div className="flex-1">
              <h3 className="text-sm font-bold text-red-300">
                Unable to load reports
              </h3>

              <p className="text-xs text-red-400/80 mt-1">
                {error}
              </p>

              <button
                onClick={loadReports}
                className="mt-4 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !error && assessments.length === 0 && (
        <div className="p-10 rounded-2xl border border-slate-800 bg-slate-900/70 text-center">
          <FileText className="w-10 h-10 text-slate-600 mx-auto mb-4" />

          <h3 className="text-lg font-outfit font-bold text-slate-200">
            No Assessment Reports
          </h3>

          <p className="text-sm text-slate-500 mt-2">
            Create an assessment first. Completed assessments will appear here.
          </p>

          <Link
            to="/new-assessment"
            className="inline-flex items-center gap-2 mt-5 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow"
          >
            <FileText className="w-4 h-4" />
            Create Assessment
          </Link>
        </div>
      )}

      {/* REPORT LIST */}
      {!loading && !error && assessments.length > 0 && (
        <div className="space-y-4">

          {assessments.map((assessment) => (
            <div
              key={assessment.id}
              className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card flex flex-col md:flex-row md:items-center justify-between gap-4"
            >

              {/* REPORT INFORMATION */}
              <div className="space-y-1">

                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                  REPORT #RPT-2025-{assessment.id}
                </span>

                <h3 className="text-lg font-outfit font-bold text-slate-100">
                  {assessment.assessmentName || 'HydroHarvest Assessment'}
                </h3>

                <p className="text-xs text-slate-400 flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />

                  <span>
                    {assessment.address || 'Address unavailable'}
                    {assessment.district
                      ? `, ${assessment.district}`
                      : ''}
                    {assessment.state
                      ? `, ${assessment.state}`
                      : ''}
                  </span>
                </p>

              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center space-x-3">

                <Link
                  to={`/assessment/${assessment.id}`}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center space-x-1.5 transition"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />

                  <span>
                    View Digital Report
                  </span>
                </Link>

                <Link
                  to={`/assessment/${assessment.id}`}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow flex items-center space-x-1.5 transition"
                >
                  <Download className="w-4 h-4" />

                  <span>
                    Download PDF
                  </span>
                </Link>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default ReportsPage;