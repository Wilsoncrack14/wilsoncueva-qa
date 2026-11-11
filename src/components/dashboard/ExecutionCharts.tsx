import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import type { DashboardExecutionRun } from '../../types/portfolio';
import { moduleComparisonData } from '../../data/dashboard';

interface ExecutionChartsProps {
  runs: DashboardExecutionRun[];
}

const PIE_COLORS = ['#22C55E', '#F59E0B', '#EF4444'];

export default function ExecutionCharts({ runs }: ExecutionChartsProps) {
  const evolutionData = runs.map((run) => ({
    name: run.id.replace('RUN-', ''),
    project: run.projectName,
    Aprobados: run.passed,
    PendientesOmitidos: run.skipped,
    Fallidos: run.failed,
    Total: run.totalTests,
    DuracionSeg: run.durationSeconds,
  }));

  const totalPassed = runs.reduce((acc, r) => acc + r.passed, 0);
  const totalSkipped = runs.reduce((acc, r) => acc + r.skipped, 0);
  const totalFailed = runs.reduce((acc, r) => acc + r.failed, 0);

  const distributionData = [
    { name: 'Aprobados (Ejecución Real)', value: totalPassed },
    { name: 'Omitidos / Parciales / Pendientes', value: totalSkipped },
    { name: 'Fallidos', value: totalFailed },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* 1. Evolución de ejecuciones */}
      <div className="rounded-xl border border-border-subtle bg-surface p-5">
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase text-accent-lime">
            Gráfico 01 // Trend Analysis
          </span>
          <h3 className="text-base font-bold text-text-primary">
            1. Evolución de Ejecuciones (Tests Aprobados vs Total)
          </h3>
          <p className="text-xs text-text-secondary">
            Progresión por corrida registrada en el dataset normalizado.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={evolutionData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#29332D" />
              <XAxis dataKey="name" stroke="#A0AAA4" fontSize={11} />
              <YAxis stroke="#A0AAA4" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#101513',
                  borderColor: '#29332D',
                  borderRadius: '8px',
                  color: '#F5F7F5',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area
                type="monotone"
                dataKey="Total"
                stroke="#2ED38C"
                fill="#2ED38C"
                fillOpacity={0.18}
              />
              <Area
                type="monotone"
                dataKey="Aprobados"
                stroke="#22C55E"
                fill="#22C55E"
                fillOpacity={0.28}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. Distribución de resultados */}
      <div className="rounded-xl border border-border-subtle bg-surface p-5">
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase text-accent-lime">
            Gráfico 02 // Outcome Breakdown
          </span>
          <h3 className="text-base font-bold text-text-primary">
            2. Distribución de Resultados
          </h3>
          <p className="text-xs text-text-secondary">
            Proporción entre pruebas aprobadas, parciales/pendientes y fallidas según los filtros activos.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={distributionData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={82}
                paddingAngle={3}
                dataKey="value"
              >
                {distributionData.map((entry, idx) => (
                  <Cell key={entry.name} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#101513',
                  borderColor: '#29332D',
                  borderRadius: '8px',
                  color: '#F5F7F5',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 3. Historial de pruebas (Duración y Volumen por Suite) */}
      <div className="rounded-xl border border-border-subtle bg-surface p-5">
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase text-accent-lime">
            Gráfico 03 // Execution History
          </span>
          <h3 className="text-base font-bold text-text-primary">
            3. Historial de Pruebas por Estado de Suite
          </h3>
          <p className="text-xs text-text-secondary">
            Desglose apilado de casos aprobados frente a omitidos/pendientes por ID de ejecución.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={evolutionData} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#29332D" />
              <XAxis dataKey="name" stroke="#A0AAA4" fontSize={11} />
              <YAxis stroke="#A0AAA4" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#101513',
                  borderColor: '#29332D',
                  borderRadius: '8px',
                  color: '#F5F7F5',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="Aprobados" stackId="a" fill="#22C55E" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="PendientesOmitidos"
                name="Parciales / Pendientes"
                stackId="a"
                fill="#F59E0B"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. Comparación de ejecuciones por módulo (Hotel Asturias 15 módulos) */}
      <div className="rounded-xl border border-border-subtle bg-surface p-5">
        <div className="mb-4">
          <span className="font-mono text-[11px] uppercase text-accent-lime">
            Gráfico 04 // Module Comparison (Hotel Asturias Audit)
          </span>
          <h3 className="text-base font-bold text-text-primary">
            4. Comparación de Ejecuciones por Módulo Auditado
          </h3>
          <p className="text-xs text-text-secondary">
            Comparativa real de los 78 casos de prueba en Hotel Asturias por módulo técnico.
          </p>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={moduleComparisonData.slice(0, 8)}
              margin={{ top: 10, right: 16, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#29332D" />
              <XAxis dataKey="module" stroke="#A0AAA4" fontSize={10} />
              <YAxis stroke="#A0AAA4" fontSize={11} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#101513',
                  borderColor: '#29332D',
                  borderRadius: '8px',
                  color: '#F5F7F5',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="approved" name="Aprobados" fill="#2ED38C" radius={[4, 4, 0, 0]} />
              <Bar dataKey="partial" name="Parciales" fill="#F59E0B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
