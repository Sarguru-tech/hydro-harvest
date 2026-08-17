import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAssessmentById } from '../services/api';
import { Assessment } from '../types';
import { ScoreMeter } from '../components/ScoreMeter';
import { ExplainableAiCard } from '../components/ExplainableAiCard';
import { CalculationFormulaBox } from '../components/CalculationFormulaBox';
import { GisMapComponent } from '../components/GisMapComponent';
import { Droplets, MapPin, Download, ShieldCheck, BookOpen, Layers, CheckCircle2, ArrowLeft, Printer, Share2 } from 'lucide-react';

export const AssessmentResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      if (id) {
        const data = await fetchAssessmentById(Number(id));
        setAssessment(data);
      }
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading || !assessment) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-cyan-400 font-semibold">
          <Droplets className="w-6 h-6 animate-spin" />
          <span>Generating HydroHarvest Assessment Report...</span>
        </div>
      </div>
    );
  }

  const {
    rooftopData: rooftop,
    rainfallData: rainfall,
    soilGroundwaterData: soil,
    harvestingCalculation: harvesting,
    rechargeAssessment: recharge,
    recommendation
  } = assessment;

  const score = recharge?.suitabilityScore || 82;
  const harvestingPct = Math.min(100, Math.round((harvesting?.annualHarvestableLiters || 300000) / 400000 * 100));
  const resiliencePct = Math.round((score * 0.5) + (harvestingPct * 0.5));

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <Link to="/dashboard" className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Assessment Report #RPT-2025-{assessment.id}</span>
            <h1 className="text-2xl font-outfit font-extrabold text-slate-100">{assessment.assessmentName}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrintPdf}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 flex items-center space-x-2 shadow"
          >
            <Printer className="w-4 h-4 text-cyan-400" />
            <span>Export / Print PDF Report</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreMeter
          label="Water Harvesting Potential"
          score={harvestingPct}
          colorScheme="cyan"
          subtitle="High Collection Yield"
        />
        <ScoreMeter
          label="Recharge Potential"
          score={score}
          colorScheme="emerald"
          subtitle={recharge?.suitabilityCategory || "Highly Suitable"}
        />
        <ScoreMeter
          label="Overall Water Resilience"
          score={resiliencePct}
          colorScheme="amber"
          subtitle="Aquifer Sustainability Index"
        />
      </div>

      <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">
        <h2 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-3">
          <MapPin className="w-5 h-5 text-cyan-400" />
          <span>Section 1: Location & Administrative Overview</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">Property Address</span>
            <p className="font-semibold text-slate-200 mt-0.5">{assessment.address}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">District & State</span>
            <p className="font-semibold text-slate-200 mt-0.5">{assessment.district}, {assessment.state}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">GPS Coordinates</span>
            <p className="font-mono text-cyan-300 mt-0.5">{assessment.latitude}°N, {assessment.longitude}°E</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">Verification Status</span>
            <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              {assessment.status}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-3">
          <h2 className="text-sm font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4 text-teal-400" />
            <span>Section 2: Rooftop Characteristics</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px]">Area:</span>
              <p className="font-bold text-slate-200">{rooftop?.areaSqm} m²</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Material:</span>
              <p className="font-bold text-slate-200">{rooftop?.roofMaterial}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Runoff Coeff:</span>
              <p className="font-bold text-cyan-300">{rooftop?.runoffCoefficient}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Usage:</span>
              <p className="font-bold text-slate-200">{rooftop?.buildingUsage}</p>
            </div>
          </div>
        </section>

        <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-3">
          <h2 className="text-sm font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>Section 3: Rainfall Data & Sources</span>
          </h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-slate-400 text-[10px]">Annual Rainfall:</span>
              <p className="font-bold text-slate-200">{rainfall?.annualRainfallMm} mm</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Monsoon Rainfall:</span>
              <p className="font-bold text-slate-200">{rainfall?.monsoonRainfallMm} mm</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Peak 24h Rainfall:</span>
              <p className="font-bold text-slate-200">{rainfall?.max24hRainfallMm} mm</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px]">Data Source:</span>
              <p className="font-bold text-cyan-300">{rainfall?.rainfallSource}</p>
            </div>
          </div>
        </section>
      </div>

      <section className="space-y-4">
        <h2 className="text-base font-outfit font-bold text-slate-100">Section 4: Rooftop Water Harvesting Calculations</h2>
        {rooftop && rainfall && harvesting && (
          <CalculationFormulaBox rooftop={rooftop} rainfall={rainfall} calculation={harvesting} />
        )}
      </section>

      <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">
        <h2 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span>Section 5: Artificial Recharge Suitability Scoring (Score: {score}/100)</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase text-slate-400">Soil Type:</span>
            <p className="font-bold text-slate-200">{soil?.soilType}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400">Water Table Depth:</span>
            <p className="font-bold text-slate-200">{soil?.groundwaterDepthMeters} Meters</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400">Aquifer Condition:</span>
            <p className="font-bold text-emerald-300">{soil?.waterTableCondition}</p>
          </div>
          <div>
            <span className="text-[10px] uppercase text-slate-400">Terrain Slope:</span>
            <p className="font-bold text-slate-200">{soil?.terrainSlopePercent}%</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-outfit font-bold text-slate-100">Section 6: AI Recommended Harvesting & Recharge Structure</h2>
        {recommendation && <ExplainableAiCard recommendation={recommendation} />}
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="p-6 bg-slate-900/80 rounded-2xl border border-amber-500/30 glass-card space-y-3">
          <h2 className="text-sm font-outfit font-bold text-amber-300 flex items-center space-x-2 border-b border-slate-800 pb-2">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Section 7: IKS / Local Water Management Context</span>
          </h2>
          <p className="text-xs text-slate-300 font-semibold">
            Matched Regional System: {recommendation?.iksTraditionalStructureMatch}
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Integrates South Indian Eri overflow cascading principles to prevent silt clogging and safely transport extreme monsoon runoff into subterranean storage.
          </p>
        </section>

        <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-3">
          <h2 className="text-sm font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-2">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span>Section 8: Estimated Annual Water Savings</span>
          </h2>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Annual Potable Water Substitution:</span>
              <span className="font-bold text-cyan-300">{harvesting?.potableWaterSubstitutionPercentage}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Monetary Utility Savings:</span>
              <span className="font-bold text-emerald-400">₹ {harvesting?.estimatedCostSavingsInrPerYear?.toLocaleString()} / Year</span>
            </div>
          </div>
        </section>
      </div>

      <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">
        <h2 className="text-base font-outfit font-bold text-slate-100">Section 9 & 10: Environmental Impact & Spatial Mapping</h2>
        <GisMapComponent
          markers={[{
            id: assessment.id,
            lat: assessment.latitude,
            lng: assessment.longitude,
            title: assessment.assessmentName,
            type: 'ASSESSMENT',
            district: assessment.district,
            state: assessment.state,
            score: score,
            details: `${harvesting?.annualHarvestableLiters?.toLocaleString()} L/yr`
          }]}
          center={[assessment.latitude, assessment.longitude]}
          zoom={12}
          height="350px"
        />
      </section>

    </div>
  );
};
