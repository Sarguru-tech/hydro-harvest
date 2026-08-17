import React from 'react';
import { Brain, CheckCircle2, ShieldCheck, Sparkles, BookOpen, Layers } from 'lucide-react';
import { Recommendation } from '../types';

interface ExplainableAiCardProps {
  recommendation: Recommendation;
}

export const ExplainableAiCard: React.FC<ExplainableAiCardProps> = ({ recommendation }) => {
  let reasons: string[] = [];
  let steps: string[] = [];

  try {
    reasons = JSON.parse(recommendation.XaiReasonsJson || '[]');
  } catch (e) {
    reasons = [
      'High soil infiltration potential and suitable vadose zone depth.',
      'Optimal rooftop runoff volume for direct aquifer recharge.',
      'Aligns with local traditional water conservation practices.'
    ];
  }

  try {
    steps = JSON.parse(recommendation.implementationStepsJson || '[]');
  } catch (e) {
    steps = [
      'Excavate recharge pit near downspout.',
      'Fill with graded aggregate & gravel layers.',
      'Install baffle filter divider.'
    ];
  }

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-cyan-500/30 glass-card space-y-6">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <Brain className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-outfit font-bold text-slate-100">AI Hydro-Recommendation Engine</h3>
              <span className="px-2 py-0.5 text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Explainable AI
              </span>
            </div>
            <p className="text-xs text-slate-400">Rules Baseline + ML Predictive Classification</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Confidence: {recommendation.confidenceScorePercent}%</span>
        </div>
      </div>

      <div className="p-4 bg-slate-950/80 rounded-xl border border-cyan-500/20 space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">Recommended System Structure</span>
        <h4 className="text-lg font-outfit font-extrabold text-slate-100">{recommendation.primaryStructureType}</h4>
        <p className="text-xs font-mono text-slate-400 bg-slate-900/90 p-2 rounded border border-slate-800">
          Dimensions: <span className="text-cyan-300 font-semibold">{recommendation.recommendedDimensions}</span>
        </p>
      </div>

      <div className="space-y-3">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Why this recommendation? (Explainable Reasoning)</span>
        </h5>
        <div className="space-y-2">
          {reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start space-x-2.5 p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      </div>

      {recommendation.iksTraditionalStructureMatch && (
        <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 space-y-2">
          <div className="flex items-center space-x-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>IKS Traditional Water Heritage Context</span>
          </div>
          <p className="text-xs text-slate-200">
            Matched Regional System: <span className="font-bold text-amber-300">{recommendation.iksTraditionalStructureMatch}</span>
          </p>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Integrates traditional Indian gravity runoff diversion & aquifer recharge principles with modern engineering dimensions.
          </p>
        </div>
      )}

      <div className="space-y-2">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-sky-400" />
          <span>Step-by-Step Implementation Protocol</span>
        </h5>
        <ol className="space-y-1.5 list-decimal list-inside text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
          {steps.map((step, idx) => (
            <li key={idx} className="py-0.5">{step}</li>
          ))}
        </ol>
      </div>

    </div>
  );
};
