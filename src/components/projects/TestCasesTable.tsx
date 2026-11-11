import { useState, useMemo } from 'react';
import type { TestCaseItem } from '../../types/portfolio';
import { Filter, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface TestCasesTableProps {
  testCases: TestCaseItem[];
  projectName: string;
}

export default function TestCasesTable({ testCases, projectName }: TestCasesTableProps) {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  const availableTypes = useMemo(() => {
    const set = new Set<string>();
    testCases.forEach((tc) => set.add(tc.type));
    return Array.from(set);
  }, [testCases]);

  const filteredCases = useMemo(() => {
    return testCases.filter((tc) => {
      const matchesType = selectedType === 'ALL' || tc.type === selectedType;
      const matchesStatus = selectedStatus === 'ALL' || tc.status === selectedStatus;
      return matchesType && matchesStatus;
    });
  }, [testCases, selectedType, selectedStatus]);

  const renderStatusBadge = (status: TestCaseItem['status']) => {
    if (status === 'Aprobado') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-emerald-300">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          Aprobado
        </span>
      );
    }
    if (status === 'Parcial') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 font-mono text-xs font-semibold text-amber-300">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
          Parcial
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-secondary px-2.5 py-1 font-mono text-xs font-medium text-amber-300">
        <Clock className="h-3.5 w-3.5 text-amber-400" aria-hidden="true" />
        Pendiente de ejecución
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Filter Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-subtle bg-surface p-4">
        <div className="flex items-center gap-2 text-xs font-mono text-text-secondary">
          <Filter className="h-4 w-4 text-accent-lime" aria-hidden="true" />
          <span>
            Mostrando <strong className="text-text-primary">{filteredCases.length}</strong> de{' '}
            {testCases.length} escenarios ({projectName})
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="font-mono">Tipo:</span>
            <select
              aria-label="Filtrar casos de prueba por tipo"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-primary focus:border-accent-lime focus:outline-none"
            >
              <option value="ALL">Todos los tipos</option>
              {availableTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2 text-xs text-text-secondary">
            <span className="font-mono">Estado:</span>
            <select
              aria-label="Filtrar casos de prueba por estado"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-lg border border-border-subtle bg-bg-primary px-3 py-1.5 font-mono text-xs text-text-primary focus:border-accent-lime focus:outline-none"
            >
              <option value="ALL">Todos los estados</option>
              <option value="Aprobado">Aprobado</option>
              <option value="Parcial">Parcial</option>
              <option value="Pendiente de ejecución">Pendiente de ejecución</option>
            </select>
          </label>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto rounded-xl border border-border-subtle bg-surface">
        <table className="w-full text-left text-sm border-collapse">
          <thead className="border-b border-border-subtle bg-bg-secondary font-mono text-xs uppercase text-text-secondary">
            <tr>
              <th scope="col" className="px-4 py-3.5">ID</th>
              <th scope="col" className="px-4 py-3.5">Escenario</th>
              <th scope="col" className="px-4 py-3.5">Resultado esperado</th>
              <th scope="col" className="px-4 py-3.5">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {filteredCases.map((tc) => (
              <tr key={tc.id} className="hover:bg-bg-secondary/60 transition-colors">
                <td className="px-4 py-4 align-top font-mono text-xs font-bold text-accent-lime whitespace-nowrap">
                  <div>{tc.id}</div>
                  <div className="mt-1 inline-block rounded border border-border-subtle bg-bg-primary px-1.5 py-0.5 text-[10px] font-normal text-text-secondary">
                    {tc.type}
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <p className="font-medium text-text-primary">{tc.scenario}</p>
                  <p className="mt-1 font-mono text-[11px] text-text-secondary">
                    Módulo: {tc.module}
                    {tc.automationRef ? ` · ${tc.automationRef}` : ''}
                  </p>
                </td>
                <td className="px-4 py-4 align-top text-xs leading-relaxed text-text-secondary">
                  {tc.expectedResult}
                </td>
                <td className="px-4 py-4 align-top whitespace-nowrap">
                  {renderStatusBadge(tc.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
