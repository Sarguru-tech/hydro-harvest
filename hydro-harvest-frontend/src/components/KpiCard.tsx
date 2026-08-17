import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  colorTheme?: 'cyan' | 'teal' | 'emerald' | 'amber';
  trend?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  colorTheme = 'cyan',
  trend
}) => {
  const themeStyles = {
    cyan: 'from-cyan-500/20 to-sky-500/5 text-cyan-400 border-cyan-500/30',
    teal: 'from-teal-500/20 to-emerald-500/5 text-teal-400 border-teal-500/30',
    emerald: 'from-emerald-500/20 to-teal-500/5 text-emerald-400 border-emerald-500/30',
    amber: 'from-amber-500/20 to-yellow-500/5 text-amber-400 border-amber-500/30',
  }[colorTheme];

  const iconBgStyles = {
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    teal: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  }[colorTheme];

  return (
    <div className={`relative p-5 rounded-2xl bg-gradient-to-br ${themeStyles} glass-card border shadow-lg hover:translate-y-[-2px] transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <p className="text-2xl sm:text-3xl font-outfit font-extrabold text-slate-100 mt-1 tracking-tight">
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 font-medium">{subtitle}</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-inner ${iconBgStyles}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {trend && (
        <div className="mt-3 inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
          <span>{trend}</span>
        </div>
      )}
    </div>
  );
};
