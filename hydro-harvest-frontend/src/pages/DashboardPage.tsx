import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboardSummary, fetchAssessments } from '../services/api';
import { DashboardSummary, Assessment } from '../types';
import { KpiCard } from '../components/KpiCard';
import { GisMapComponent } from '../components/GisMapComponent';
import {
  Droplets,
  Layers,
  ShieldCheck,
  MapPin,
  PlusCircle,
  ArrowUpRight,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [sumData, assData] = await Promise.all([
          fetchDashboardSummary(),
          fetchAssessments(),
        ]);

        if (sumData) {
          setSummary(sumData);
        } else {
          setSummary(null);
        }

        if (Array.isArray(assData)) {
          setAssessments(assData);
        } else {
          setAssessments([]);
        }
      } catch (err) {
        console.error('Dashboard data loading error:', err);

        setError(
          'Unable to load dashboard data. Please make sure the HydroHarvest backend is running on port 8080.'
        );

        setSummary(null);
        setAssessments([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const COLORS = [
    '#06b6d4',
    '#14b8a6',
    '#0284c7',
    '#f59e0b',
    '#8b5cf6',
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-cyan-400 font-semibold">
          <Droplets className="w-6 h-6 animate-spin" />
          <span>
            Loading HydroHarvest Water Intelligence Dashboard...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-lg w-full p-8 bg-slate-900/90 border border-red-500/30 rounded-2xl text-center">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
            <Droplets className="w-7 h-7 text-red-400" />
          </div>

          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Dashboard Could Not Load
          </h2>

          <p className="text-sm text-slate-400 mb-6">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-6">
        <div className="max-w-lg w-full p-8 bg-slate-900/90 border border-slate-800 rounded-2xl text-center">
          <Droplets className="w-10 h-10 mx-auto mb-4 text-cyan-400" />

          <h2 className="text-xl font-bold text-slate-100 mb-2">
            No Dashboard Data Available
          </h2>

          <p className="text-sm text-slate-400 mb-6">
            The backend is running, but the dashboard summary is currently
            unavailable.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl transition-colors"
          >
            Refresh Dashboard
          </button>
        </div>
      </div>
    );
  }

  /*
   * SAFETY NORMALIZATION
   *
   * The previous version directly called:
   *
   * Object.entries(summary.structureDistribution)
   *
   * If structureDistribution was null/undefined,
   * React crashed with:
   *
   * Cannot convert undefined or null to object
   */

  const structureDistribution =
    summary.structureDistribution ?? {};

  const monthlyHarvestingTrend =
    summary.monthlyHarvestingTrend ?? [];

  const structurePieData = Object.entries(
    structureDistribution
  ).map(([name, value]) => ({
    name,
    value: Number(value) || 0,
  }));

  const mapMarkers = assessments.map((a) => ({
    id: a.id,
    lat: Number(a.latitude) || 0,
    lng: Number(a.longitude) || 0,
    title: a.assessmentName || 'Field Assessment',
    type: 'ASSESSMENT' as const,
    district: a.district || '',
    state: a.state || '',
    score: a.rechargeAssessment?.suitabilityScore ?? 0,
    details: `${(
      Number(
        a.harvestingCalculation?.annualHarvestableLiters
      ) || 0
    ).toLocaleString()} L/yr`,
  }));

  const totalAssessments =
    Number(summary.totalAssessments) || 0;

  const totalRooftopAreaSqm =
    Number(summary.totalRooftopAreaSqm) || 0;

  const totalAnnualHarvestableLiters =
    Number(summary.totalAnnualHarvestableLiters) || 0;

  const totalAnnualRechargeLiters =
    Number(summary.totalAnnualRechargeLiters) || 0;

  return (
    <div className="space-y-8 pb-16">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
            National Water Control Center
          </span>

          <h1 className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">
            Water Intelligence Dashboard
          </h1>
        </div>

        <Link
          to="/assessment/new"
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/30 flex items-center space-x-2 self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ On-Spot Field Assessment</span>
        </Link>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <KpiCard
          title="Total Field Assessments"
          value={totalAssessments}
          subtitle="Across Tamil Nadu & India"
          icon={Droplets}
          colorTheme="cyan"
          trend="+14% this month"
        />

        <KpiCard
          title="Total Rooftop Area"
          value={`${totalRooftopAreaSqm.toLocaleString()} m²`}
          subtitle="Assessed Catchment Surface"
          icon={Layers}
          colorTheme="teal"
        />

        <KpiCard
          title="Annual Harvesting Potential"
          value={`${(
            totalAnnualHarvestableLiters / 1000000
          ).toFixed(1)} M Liters`}
          subtitle="Harvestable Volume"
          icon={TrendingUp}
          colorTheme="emerald"
          trend="₹ 2.18M Saved/Yr"
        />

        <KpiCard
          title="Artificial Recharge Potential"
          value={`${(
            totalAnnualRechargeLiters / 1000000
          ).toFixed(1)} M Liters`}
          subtitle="Aquifer Injection Capacity"
          icon={ShieldCheck}
          colorTheme="amber"
        />

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* HARVESTING TREND */}
        <div className="lg:col-span-2 p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

          <div className="flex items-center justify-between">
            <h3 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />

              <span>
                Monthly Harvestable Water Potential vs Rainfall Trend
              </span>
            </h3>

            <span className="text-[11px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              Seasonal Peak: October
            </span>
          </div>

          <div className="h-72 w-full pt-4">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <AreaChart
                data={monthlyHarvestingTrend}
              >

                <defs>
                  <linearGradient
                    id="colorHarvest"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#06b6d4"
                      stopOpacity={0.4}
                    />

                    <stop
                      offset="95%"
                      stopColor="#06b6d4"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="month"
                  stroke="#64748b"
                  fontSize={11}
                />

                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickFormatter={(val) =>
                    `${(Number(val) / 1000000).toFixed(1)}M`
                  }
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090d16',
                    borderColor: '#1e293b',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(val: any) => [
                    `${Number(val || 0).toLocaleString()} Liters`,
                    'Harvest Potential',
                  ]}
                />

                <Area
                  type="monotone"
                  dataKey="harvestLiters"
                  stroke="#06b6d4"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHarvest)"
                />

              </AreaChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* STRUCTURE BREAKDOWN */}
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

          <h3 className="text-base font-outfit font-bold text-slate-100">
            Recommended Structure Breakdown
          </h3>

          <div className="h-64 w-full flex items-center justify-center">

            {structurePieData.length > 0 ? (

              <ResponsiveContainer
                width="100%"
                height="100%"
              >
                <PieChart>

                  <Pie
                    data={structurePieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={75}
                    innerRadius={45}
                    paddingAngle={4}
                  >

                    {structurePieData.map(
                      (entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            COLORS[
                              index % COLORS.length
                            ]
                          }
                        />
                      )
                    )}

                  </Pie>

                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090d16',
                      borderColor: '#1e293b',
                      borderRadius: '8px',
                      fontSize: '11px',
                    }}
                  />

                  <Legend
                    wrapperStyle={{
                      fontSize: '11px',
                      paddingTop: '10px',
                    }}
                  />

                </PieChart>
              </ResponsiveContainer>

            ) : (

              <div className="text-center text-sm text-slate-500">
                <Droplets className="w-8 h-8 mx-auto mb-2 opacity-40" />

                <p>
                  No structure distribution data available.
                </p>

              </div>

            )}

          </div>
        </div>

      </div>

      {/* MAP + RECENT ASSESSMENTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* MAP */}
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

          <div className="flex items-center justify-between">

            <h3 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-teal-400" />

              <span>
                Geographic Assessment Locations
              </span>
            </h3>

            <Link
              to="/gis-map"
              className="text-xs text-cyan-400 hover:underline"
            >
              Full Map &rarr;
            </Link>

          </div>

          <GisMapComponent
            markers={mapMarkers}
            height="360px"
          />

        </div>

        {/* RECENT ASSESSMENTS */}
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

          <h3 className="text-base font-outfit font-bold text-slate-100">
            Recent Field Assessments
          </h3>

          <div className="overflow-x-auto">

            <table className="w-full text-left text-xs text-slate-300">

              <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">

                <tr>
                  <th className="p-2.5">
                    Location / Property
                  </th>

                  <th className="p-2.5">
                    Roof (m²)
                  </th>

                  <th className="p-2.5">
                    Harvest Potential
                  </th>

                  <th className="p-2.5">
                    Recharge Score
                  </th>

                  <th className="p-2.5 text-right">
                    Action
                  </th>
                </tr>

              </thead>

              <tbody className="divide-y divide-slate-800">

                {assessments.length > 0 ? (

                  assessments.map((a) => (

                    <tr
                      key={a.id}
                      className="hover:bg-slate-800/50 transition-colors"
                    >

                      <td className="p-2.5 font-medium text-slate-100">

                        <div>
                          {a.assessmentName ||
                            'Unnamed Assessment'}
                        </div>

                        <span className="text-[10px] text-slate-400">
                          {a.district || 'Unknown District'}
                          {a.state
                            ? `, ${a.state}`
                            : ''}
                        </span>

                      </td>

                      <td className="p-2.5 font-mono">

                        {(
                          Number(
                            a.rooftopData?.areaSqm
                          ) || 0
                        ).toLocaleString()}{' '}
                        m²

                      </td>

                      <td className="p-2.5 font-mono text-cyan-300">

                        {(
                          Number(
                            a.harvestingCalculation
                              ?.annualHarvestableLiters
                          ) || 0
                        ).toLocaleString()}{' '}
                        L

                      </td>

                      <td className="p-2.5">

                        <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded">

                          {Number(
                            a.rechargeAssessment
                              ?.suitabilityScore
                          ) || 0}
                          /100

                        </span>

                      </td>

                      <td className="p-2.5 text-right">

                        <Link
                          to={`/assessment/${a.id}`}
                          className="inline-flex items-center space-x-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                        >

                          <span>
                            View
                          </span>

                          <ArrowUpRight className="w-3.5 h-3.5" />

                        </Link>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan={5}
                      className="p-8 text-center text-slate-500"
                    >
                      No field assessments available yet.
                    </td>

                  </tr>

                )}

              </tbody>

            </table>

          </div>
        </div>

      </div>

    </div>
  );
};