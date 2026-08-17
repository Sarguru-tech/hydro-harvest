import React from 'react';

interface ScoreMeterProps {
  label: string;
  score: number; // 0 to 100
  colorScheme?: 'cyan' | 'emerald' | 'amber';
  subtitle?: string;
}

export const ScoreMeter: React.FC<ScoreMeterProps> = ({
  label,
  score,
  colorScheme = 'cyan',
  subtitle
}) => {
  const gradientStyles = {
    cyan: 'from-cyan-500 via-sky-400 to-teal-300',
    emerald: 'from-emerald-500 via-teal-400 to-cyan-300',
    amber: 'from-amber-500 via-yellow-400 to-amber-300',
  }[colorScheme];

  const textStyles = {
    cyan: 'text-cyan-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
  }[colorScheme];

  const totalBlocks = 20;
  const filledBlocks = Math.round((score / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  const asciiMeter = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

  return (
    <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">{label}</span>
        <span className={`font-outfit font-extrabold text-xl ${textStyles}`}>{score}%</span>
      </div>
      
      <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientStyles} transition-all duration-1000 shadow-md`}
          style={{ width: `${score}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
        <span className="tracking-widest">{asciiMeter}</span>
        {subtitle && <span>{subtitle}</span>}
      </div>
    </div>
  );
};
