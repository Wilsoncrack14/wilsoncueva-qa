import {
  CheckCircle2,
  XCircle,
  Clock,
  Activity,
  Percent,
  Layers,
} from 'lucide-react';
import { formatDuration, calculatePassRate } from '../../lib/utils';

interface MetricsCardsProps {
  totalTests: number;
  passedTests: number;
  failedTests: number;
  skippedTests: number;
  totalDurationSeconds: number;
}

export default function MetricsCards({
  totalTests,
  passedTests,
  failedTests,
  skippedTests,
  totalDurationSeconds,
}: MetricsCardsProps) {
  const passRate = calculatePassRate(passedTests, totalTests);

  const kpis = [
    {
      id: 'kpi-total',
      label: 'Total de tests',
      value: String(totalTests),
      subtext: 'En las ejecuciones filtradas',
      icon: Layers,
      accentClass: 'text-text-primary',
    },
    {
      id: 'kpi-passed',
      label: 'Tests aprobados',
      value: String(passedTests),
      subtext: 'Ejecución verificada (PASSED)',
      icon: CheckCircle2,
      accentClass: 'text-emerald-400',
    },
    {
      id: 'kpi-failed',
      label: 'Tests fallidos',
      value: String(failedTests),
      subtext: 'Sin bloqueos críticos activos',
      icon: XCircle,
      accentClass: failedTests > 0 ? 'text-red-400' : 'text-text-primary',
    },
    {
      id: 'kpi-skipped',
      label: 'Tests omitidos / pendientes',
      value: String(skippedTests),
      subtext: 'Parciales híbridos o por ejecutar',
      icon: Clock,
      accentClass: 'text-amber-300',
    },
    {
      id: 'kpi-pass-rate',
      label: 'Pass Rate',
      value: `${passRate}%`,
      subtext: 'Tasa de aprobación sobre el filtro',
      icon: Percent,
      accentClass: 'text-accent-lime',
    },
    {
      id: 'kpi-duration',
      label: 'Duración de ejecución',
      value: formatDuration(totalDurationSeconds),
      subtext: 'Tiempo acumulado de runners',
      icon: Activity,
      accentClass: 'text-accent-lime',
    },
  ];

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
      aria-label="Indicadores KPI del Dashboard QA"
    >
      {kpis.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            data-testid={item.id}
            className="rounded-xl border border-border-subtle bg-surface p-5 flex flex-col justify-between transition hover:border-accent-lime/40"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs uppercase text-text-secondary">
                {item.label}
              </span>
              <Icon className="h-4 w-4 text-accent-lime" aria-hidden="true" />
            </div>
            <div className="mt-3">
              <p className={`font-mono text-2xl font-bold sm:text-3xl ${item.accentClass}`}>
                {item.value}
              </p>
              <p className="mt-1 text-[11px] text-text-secondary">{item.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
