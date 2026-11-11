import type { DashboardExecutionRun } from '../../types/portfolio';
import { formatDuration } from '../../lib/utils';
import { Eye, CheckCircle2, AlertTriangle, Clock, XCircle } from 'lucide-react';

interface ExecutionTableProps {
  runs: DashboardExecutionRun[];
  onSelectRun: (run: DashboardExecutionRun) => void;
}

export default function ExecutionTable({ runs, onSelectRun }: ExecutionTableProps) {
  const renderResultBadge = (run: DashboardExecutionRun) => {
    if (run.status === 'PASSED') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          PASSED (Real)
        </span>
      );
    }
    if (run.status === 'PARTIAL') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
          68 OK · 10 PARCIAL
        </span>
      );
    }
    if (run.status === 'FAILED') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-red-300">
          <XCircle className="h-3.5 w-3.5 text-red-400" aria-hidden="true" />
          FAILED
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-secondary px-2.5 py-1 font-mono text-xs font-medium text-amber-300">
        <Clock className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
        PENDIENTE (Plan)
      </span>
    );
  };

  if (runs.length === 0) {
    return (
      <div
        role="status"
        className="rounded-xl border border-border-subtle bg-surface p-10 text-center space-y-2"
      >
        <p className="font-mono text-sm font-bold text-text-primary">
          Sin ejecuciones que coincidan con los filtros seleccionados
        </p>
        <p className="text-xs text-text-secondary">
          Ajusta o restablece los filtros de Proyecto, Fecha, Estado o Tipo de prueba para visualizar los registros.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
      <table className="w-full text-left text-sm border-collapse">
        <thead className="border-b border-border-subtle bg-bg-secondary font-mono text-xs uppercase text-text-secondary">
          <tr>
            <th scope="col" className="px-4 py-3.5">ID de ejecución</th>
            <th scope="col" className="px-4 py-3.5">Proyecto</th>
            <th scope="col" className="px-4 py-3.5">Rama</th>
            <th scope="col" className="px-4 py-3.5">Resultado</th>
            <th scope="col" className="px-4 py-3.5 text-center">Total de tests</th>
            <th scope="col" className="px-4 py-3.5 text-center">Duración</th>
            <th scope="col" className="px-4 py-3.5">Fecha</th>
            <th scope="col" className="px-4 py-3.5 text-right">Acción</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {runs.map((run) => (
            <tr key={run.id} className="hover:bg-bg-secondary/60 transition-colors">
              <td className="px-4 py-4 font-mono text-xs font-bold text-accent-lime whitespace-nowrap">
                <div>{run.id}</div>
                <div className="text-[10px] font-normal text-text-secondary">{run.suiteType}</div>
              </td>
              <td className="px-4 py-4 font-medium text-text-primary whitespace-nowrap">
                {run.projectName}
              </td>
              <td className="px-4 py-4 font-mono text-xs text-text-secondary whitespace-nowrap">
                <span className="rounded bg-bg-primary px-2 py-0.5 border border-border-subtle">
                  {run.branch}
                </span>
                <span className="ml-1.5 text-[11px] text-text-secondary">({run.commit})</span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">{renderResultBadge(run)}</td>
              <td className="px-4 py-4 text-center font-mono text-xs text-text-primary whitespace-nowrap">
                <strong>{run.totalTests}</strong>{' '}
                <span className="text-text-secondary">
                  ({run.passed} OK / {run.skipped} Omit.)
                </span>
              </td>
              <td className="px-4 py-4 text-center font-mono text-xs text-text-secondary whitespace-nowrap">
                {run.durationSeconds > 0 ? formatDuration(run.durationSeconds) : 'N/A (Plan)'}
              </td>
              <td className="px-4 py-4 font-mono text-xs text-text-secondary whitespace-nowrap">
                {run.date}
              </td>
              <td className="px-4 py-4 text-right whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => onSelectRun(run)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-accent-lime/40 bg-accent-lime/10 px-3 py-1.5 font-mono text-xs font-semibold text-accent-lime transition hover:bg-accent-lime hover:text-bg-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
                >
                  <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                  Consultar reporte
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
