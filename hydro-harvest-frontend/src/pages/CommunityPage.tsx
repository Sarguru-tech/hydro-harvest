import React, { useState } from 'react';
import { Users, PlusCircle, CheckCircle2, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { CommunitySubmission } from '../types';

export const CommunityPage: React.FC = () => {
  const [submissions, setSubmissions] = useState<CommunitySubmission[]>([
    {
      id: 1,
      structureName: 'Perur Pateeswarar Temple Tank',
      structureType: 'Temple Tank',
      description: 'Ancient masonry temple tank requiring desilting to elevate surrounding ward aquifer level.',
      address: 'Perur',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      latitude: 10.9772,
      longitude: 76.9958,
      status: 'FIELD_VERIFIED',
      submittedByEmail: 'citizen@hydroharvest.gov.in',
      verifiedByOfficer: 'field.officer@hydroharvest.gov.in',
      createdAt: '2026-08-14T11:00:00'
    },
    {
      id: 2,
      structureName: 'Kovilpalayam Dried Village Oorani',
      structureType: 'Oorani',
      description: 'Traditional earthen drinking water pond requiring bund repair before upcoming monsoon.',
      address: 'Kovilpalayam',
      district: 'Coimbatore',
      state: 'Tamil Nadu',
      latitude: 11.1234,
      longitude: 77.0123,
      status: 'PENDING',
      submittedByEmail: 'community.rep@hydroharvest.gov.in',
      createdAt: '2026-08-16T15:20:00'
    }
  ]);

  const [name, setName] = useState('');
  const [type, setType] = useState('Traditional Pond');
  const [desc, setDesc] = useState('');
  const [district, setDistrict] = useState('Coimbatore');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: CommunitySubmission = {
      id: Date.now(),
      structureName: name || 'Community Water Submission',
      structureType: type,
      description: desc || 'Submitted for field verification',
      address: 'Local Ward',
      district: district,
      state: 'Tamil Nadu',
      latitude: 11.0168,
      longitude: 76.9558,
      status: 'PENDING',
      submittedByEmail: 'citizen@hydroharvest.gov.in',
      createdAt: new Date().toISOString()
    };
    setSubmissions([newSub, ...submissions]);
    setName('');
    setDesc('');
    alert('Community submission received! Sent to Field Officer verification queue.');
  };

  const handleVerify = (id: number) => {
    setSubmissions(submissions.map(s => s.id === id ? { ...s, status: 'APPROVED' as const, verifiedByOfficer: 'water.officer@hydroharvest.gov.in' } : s));
  };

  return (
    <div className="space-y-8 pb-20 max-w-6xl mx-auto">
      
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <Users className="w-4 h-4" />
          <span>Crowdsourced Water Intelligence</span>
        </div>
        <h1 className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">
          Community Water Heritage & Observation Portal
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Submit local traditional water structures, waterlogged sites, or successful RWH implementations for verification by district water officers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">
          <h2 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2">
            <PlusCircle className="w-5 h-5 text-cyan-400" />
            <span>Submit Water Infrastructure Entry</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Structure / Location Name</label>
              <input
                type="text"
                placeholder="e.g. Village Oorani / Heritage Stepwell"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Category Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Traditional Pond">Traditional Eri / Pond</option>
                <option value="Oorani">Oorani Drinking Pond</option>
                <option value="Stepwell">Stepwell / Baoli</option>
                <option value="Damaged Drain">Blocked Storm Drain</option>
                <option value="Successful RWH">Successful RWH System</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">District</label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">Detailed Description & Observation</label>
              <textarea
                rows={3}
                placeholder="Mention siltation level, capacity, or restoration needs..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 text-white font-bold rounded-xl shadow"
            >
              Submit for Verification
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-base font-outfit font-bold text-slate-100">Verification Moderation Queue</h2>
          <div className="space-y-3">
            {submissions.map((sub) => (
              <div key={sub.id} className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 glass-card space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-slate-100">{sub.structureName}</span>
                    <span className="px-2 py-0.5 text-[10px] bg-slate-800 text-slate-300 rounded font-mono">{sub.structureType}</span>
                  </div>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded border ${
                    sub.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                    sub.status === 'FIELD_VERIFIED' ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' :
                    'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{sub.description}</p>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Submitted by: {sub.submittedByEmail}</span>
                  {sub.status !== 'APPROVED' && (
                    <button
                      onClick={() => handleVerify(sub.id)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded text-[10px]"
                    >
                      Approve & Publish to GIS
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
