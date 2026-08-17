import React, { useState } from 'react';
import { GisMapComponent } from '../components/GisMapComponent';
import { Map, Layers, Search, Filter, BookOpen, Droplet } from 'lucide-react';

export const TraditionalGisPage: React.FC = () => {
  const [showEris, setShowEris] = useState(true);
  const [showStepwells, setShowStepwells] = useState(true);
  const [showAssessments, setShowAssessments] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const allMarkers = [
    { id: 1, lat: 10.9982, lng: 77.0258, title: "Singanallur Eri Heritage Tank", type: "IKS_HERITAGE" as const, district: "Coimbatore", state: "Tamil Nadu", details: "Traditional South Indian Cascading Eri (1.5M m³)" },
    { id: 2, lat: 10.9930, lng: 76.9680, title: "Valankulam Oorani Tank", type: "IKS_HERITAGE" as const, district: "Coimbatore", state: "Tamil Nadu", details: "Drinking water clay-lined pond (850k m³)" },
    { id: 3, lat: 27.0072, lng: 76.6062, title: "Chand Baori Stepwell", type: "IKS_HERITAGE" as const, district: "Dausa", state: "Rajasthan", details: "3,500 narrow step traditional Baoli cistern" },
    { id: 4, lat: 27.5530, lng: 76.6346, title: "Alwar Johad Check Dam Network", type: "IKS_HERITAGE" as const, district: "Alwar", state: "Rajasthan", details: "Concave earthen aquifer recharge check dam" },
    { id: 5, lat: 11.0244, lng: 76.9944, title: "PSG Tech Campus RWH Site", type: "ASSESSMENT" as const, district: "Coimbatore", state: "Tamil Nadu", score: 86, details: "Harvesting Potential: 344,000 L/yr" },
    { id: 6, lat: 13.0850, lng: 80.2101, title: "Anna Nagar Urban RWH Complex", type: "ASSESSMENT" as const, district: "Chennai", state: "Tamil Nadu", score: 68, details: "Rooftop Tank Storage: 192,000 L/yr" },
  ];

  const filteredMarkers = allMarkers.filter((m) => {
    if (!showEris && (m.title.includes('Eri') || m.title.includes('Oorani'))) return false;
    if (!showStepwells && (m.title.includes('Stepwell') || m.title.includes('Johad'))) return false;
    if (!showAssessments && m.type === 'ASSESSMENT') return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return m.title.toLowerCase().includes(q) || m.district.toLowerCase().includes(q) || m.state.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-20">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> Traditional Water Heritage GIS Hub
          </span>
          <h1 className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">Spatial Water Heritage & Assessment Map</h1>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search district, state, structure..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 p-4 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card text-xs">
        <span className="font-semibold text-slate-300 flex items-center gap-1.5 mr-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <span>GIS Layers:</span>
        </span>

        <label className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={showAssessments}
            onChange={(e) => setShowAssessments(e.target.checked)}
            className="accent-cyan-500"
          />
          <span className="text-cyan-300 font-semibold">RWH Field Assessments</span>
        </label>

        <label className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={showEris}
            onChange={(e) => setShowEris(e.target.checked)}
            className="accent-amber-500"
          />
          <span className="text-amber-300 font-semibold">Eris & Ooranis (South India)</span>
        </label>

        <label className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={showStepwells}
            onChange={(e) => setShowStepwells(e.target.checked)}
            className="accent-amber-500"
          />
          <span className="text-amber-300 font-semibold">Stepwells & Johads (Arid North)</span>
        </label>
      </div>

      <GisMapComponent markers={filteredMarkers} height="560px" />

    </div>
  );
};
