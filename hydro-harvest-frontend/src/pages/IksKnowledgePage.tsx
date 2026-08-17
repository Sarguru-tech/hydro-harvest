import React, { useState, useEffect } from 'react';
import { fetchIksKnowledge } from '../services/api';
import { IksKnowledge } from '../types';
import { BookOpen, ShieldCheck, Search, Award, MapPin, ExternalLink } from 'lucide-react';

export const IksKnowledgePage: React.FC = () => {
  const [iksList, setIksList] = useState<IksKnowledge[]>([]);
  const [selectedSystem, setSelectedSystem] = useState<string>('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchIksKnowledge();
      setIksList(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredList = selectedSystem === 'ALL'
    ? iksList
    : iksList.filter((i) => i.systemType === selectedSystem);

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
          <Award className="w-4 h-4" />
          <span>Heritage Knowledge Layer</span>
        </div>
        <h1 className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">
          Indian Water Heritage & IKS Knowledge Hub
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl mt-1">
          Curated repository of ancient Indian hydrological practices, operating principles, and geographic suitability rules to complement modern artificial recharge engineering.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 text-xs font-semibold">
        {['ALL', 'Eri', 'Oorani', 'Johad', 'Stepwell/Baoli', 'Kund', 'Ahar-Pyne'].map((sys) => (
          <button
            key={sys}
            onClick={() => setSelectedSystem(sys)}
            className={`px-4 py-2 rounded-xl transition-all duration-200 border ${
              selectedSystem === sys
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {sys === 'ALL' ? 'All Traditional Systems' : sys}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredList.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/30 glass-card space-y-4 hover:border-amber-500/50 transition-all duration-300 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                {item.systemType}
              </span>

              {item.isVerified ? (
                <span className="flex items-center space-x-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Reference Info</span>
                </span>
              ) : (
                <span className="text-[10px] font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/30">
                  Community Entry
                </span>
              )}
            </div>

            <h3 className="text-xl font-outfit font-bold text-slate-100">{item.title}</h3>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>{item.district}, {item.state} ({item.region})</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Operating Principle:</span>
                <p className="text-slate-300 leading-relaxed">{item.operatingPrinciple}</p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Suitable Geography & Soil:</span>
                <p className="text-slate-300">{item.suitableGeography}</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
              <span>Source: {item.sourceReference}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
