import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import {
  FlaskConical,
  CheckCircle2,
  XCircle,
  FastForward,
  TrendingUp,
  PieChart as PieChartIcon,
  Timer,
  Layers,
  Calendar,
  ExternalLink,
  X,
  Terminal,
} from 'lucide-react';

export interface QADashboardProps {
  defaultProject?: string;
  embedded?: boolean;
}

interface ExecutionRow {
  id: string;
  projectKey: string;
  project: string;
  branch: string;
  status: 'Exitoso' | 'Fallido' | 'Pendiente';
  tests: number;
  passed: number;
  failed: number;
  skipped: number;
  durationLabel: string;
  durationSec: number;
  dateLabel: string;
  command: string;
  summary: string;
  reportUrl: string;
}

const PASS_RATE_TREND_ASTURIAS = [
  { date: 'E2E (4w)', rate: 77.3, note: 'Diagnóstico INFRA-001 (Timeouts origen WP)' },
  { date: 'Matriz 78', rate: 87.2, note: '68 Aprobados / 10 Parciales (DEF-001/002)' },
  { date: 'Vitest pre', rate: 99.5, note: '220/221 antes de fix DEF-TEST-001' },
  { date: 'Vitest (26)', rate: 100.0, note: '221/221 tests en 5.84s' },
  { date: 'E2E (1w)', rate: 100.0, note: '22/22 tests en 6 viewports' },
  { date: 'Total (31)', rate: 100.0, note: '243/243 tests automatizados' },
];

const PASS_RATE_TREND_PLANNED = [
  { date: 'Diseño', rate: 0, note: 'Casos diseñados — Pendiente de ejecución' },
  { date: 'Fixtures', rate: 0, note: 'Datos de prueba estructurados' },
  { date: 'Ejecución', rate: 0, note: 'Pendiente de corrida en CI' },
];

const EXECUTION_HISTORY: ExecutionRow[] = [
  {
    id: '#HA-ALL-31',
    projectKey: 'hotel-asturias',
    project: 'Hotel Asturias (31 Suites Automatizadas)',
    branch: 'qa/playwright-ci',
    status: 'Exitoso',
    tests: 243,
    passed: 243,
    failed: 0,
    skipped: 0,
    durationLabel: '5.84 s',
    durationSec: 5.84,
    dateLabel: 'Commit 46aeae7 (Auditado)',
    command: 'pnpm vitest run && pnpm playwright test --workers=1',
    summary:
      'Ejecución real verificada en la rama qa/playwright-ci: 31 suites automatizadas aprobadas al 100% (26 suites Vitest = 221 tests en 5.84s + 5 suites Playwright E2E = 22 tests en 6 viewports).',
    reportUrl: '/projects/hotel-asturias/report',
  },
  {
    id: '#HA-VIT-26',
    projectKey: 'hotel-asturias',
    project: 'Hotel Asturias (Vitest Unit, Dominio & API)',
    branch: 'qa/playwright-ci',
    status: 'Exitoso',
    tests: 221,
    passed: 221,
    failed: 0,
    skipped: 0,
    durationLabel: '5.84 s',
    durationSec: 5.84,
    dateLabel: 'Commit 46aeae7 · 26 suites',
    command: 'pnpm vitest run',
    summary:
      'Validación unitaria y de contratos API: /api/revalidate (24 tests), /api/reviews (13 tests), /api/tour/[mediaId] (7 tests), /api/tour360/save (6 tests), cliente WordPress (18 tests), Zero Cache Poisoning (8 tests), escenas 360° (30 tests), Asistente IA (12 tests) y SEO/Seguridad (15 tests).',
    reportUrl: '/projects/hotel-asturias/report',
  },
  {
    id: '#HA-E2E-05',
    projectKey: 'hotel-asturias',
    project: 'Hotel Asturias (Playwright E2E Multi-Viewport)',
    branch: 'qa/playwright-ci',
    status: 'Exitoso',
    tests: 22,
    passed: 22,
    failed: 0,
    skipped: 0,
    durationLabel: '241.2 s',
    durationSec: 241.2,
    dateLabel: 'Commit 46aeae7 · 5 suites',
    command: 'pnpm playwright test --workers=1',
    summary:
      'Pruebas E2E reales en Chromium (320x568 a 1920x1080): smoke-routes.spec.ts (7), catalog-and-360.spec.ts (6), chat-widget.spec.ts (3), chat-detail-modal.spec.ts (3) y responsive-and-a11y.spec.ts (3).',
    reportUrl: '/projects/hotel-asturias/report',
  },
  {
    id: '#HA-MAT-78',
    projectKey: 'hotel-asturias-matrix',
    project: 'Hotel Asturias (Matriz TEST-CASES.md)',
    branch: 'qa/playwright-ci',
    status: 'Exitoso',
    tests: 78,
    passed: 68,
    failed: 0,
    skipped: 10,
    durationLabel: '247.0 s',
    durationSec: 247.0,
    dateLabel: 'Commit 46aeae7 · 15 módulos',
    command: 'Auditoría integral de 78 casos trazados a R01..R13',
    summary:
      'Matriz completa de 78 casos de prueba: 68 aprobados al 100% y 10 casos parciales/híbridos documentados con hallazgos reales (DEF-001 Soft-404 por streaming en Next.js y DEF-002 overflow horizontal de 49px en viewport extremo 320x568).',
    reportUrl: '/projects/hotel-asturias/report',
  },
  {
    id: '#HA-INFRA-01',
    projectKey: 'hotel-asturias',
    project: 'Hotel Asturias (Diagnóstico E2E 4 Workers)',
    branch: 'qa/playwright-ci',
    status: 'Fallido',
    tests: 22,
    passed: 17,
    failed: 5,
    skipped: 0,
    durationLabel: '160.4 s',
    durationSec: 160.4,
    dateLabel: 'Hallazgo INFRA-001 (Mitigado)',
    command: 'pnpm playwright test --workers=4',
    summary:
      'Corrida inicial con 4 workers paralelos que disparó ~80 peticiones /_next/image hacia el origen WordPress provocando ETIMEDOUT. Se aisló como hallazgo INFRA-001 y se mitigó con ConcurrencyLimiter y --workers=1 (bajando la carga por página de ~40s a 1.3s–5.1s).',
    reportUrl: '/projects/hotel-asturias/report',
  },
  {
    id: '#SS-PLAN-18',
    projectKey: 'shoot-studio',
    project: 'Shoot Studio (Matriz Planificada)',
    branch: 'qa/test-plan',
    status: 'Pendiente',
    tests: 18,
    passed: 0,
    failed: 0,
    skipped: 18,
    durationLabel: 'Pendiente',
    durationSec: 0,
    dateLabel: 'Planificado (Sin ejecución)',
    command: 'Suite en estado Pendiente de ejecución',
    summary:
      'Matriz de 18 casos diseñados para validación funcional, navegación, WordPress REST API y galería multimedia responsive.',
    reportUrl: '/projects/shoot-studio',
  },
  {
    id: '#SA-PLAN-24',
    projectKey: 'supabase-auth',
    project: 'Supabase Auth (Matriz Planificada)',
    branch: 'qa/auth-api',
    status: 'Pendiente',
    tests: 24,
    passed: 0,
    failed: 0,
    skipped: 24,
    durationLabel: 'Pendiente',
    durationSec: 0,
    dateLabel: 'Planificado (Sin ejecución)',
    command: 'Suite en estado Pendiente de ejecución',
    summary:
      'Matriz de 24 casos diseñados para registro, login, validación de formularios, sesiones JWT y casos negativos de seguridad.',
    reportUrl: '/projects/supabase-auth',
  },
];

export default function QADashboard({
  defaultProject = 'hotel-asturias',
  embedded = false,
}: QADashboardProps) {
  const normalizedInitial =
    defaultProject === 'hotel-asturias-headless-qa-automation'
      ? 'hotel-asturias'
      : defaultProject;

  const [selectedProject, setSelectedProject] = useState<string>(normalizedInitial);
  const [dateRange, setDateRange] = useState<string>('Commit 46aeae7 · Rama qa/playwright-ci');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedRun, setSelectedRun] = useState<ExecutionRow | null>(null);

  const visibleRows = useMemo(() => {
    return EXECUTION_HISTORY.filter((row) => {
      const matchProj =
        selectedProject === 'ALL'
          ? true
          : selectedProject === 'hotel-asturias'
          ? row.projectKey === 'hotel-asturias' || row.projectKey === 'hotel-asturias-matrix'
          : row.projectKey === selectedProject;
      const matchStatus = statusFilter === 'ALL' || row.status === statusFilter;
      return matchProj && matchStatus;
    });
  }, [selectedProject, statusFilter]);

  const metrics = useMemo(() => {
    if (selectedProject === 'hotel-asturias' && statusFilter === 'ALL') {
      return {
        total: 243,
        passed: 243,
        failed: 0,
        skipped: 0,
        passRate: 100.0,
        durationLabel: '5.84 s',
        durationSubtext: '26 suites Vitest (5.84s) + 5 suites E2E',
      };
    }
    if (selectedProject === 'hotel-asturias-matrix') {
      return {
        total: 78,
        passed: 68,
        failed: 0,
        skipped: 10,
        passRate: 87.2,
        durationLabel: '247.0 s',
        durationSubtext: '68 Aprobados · 10 Parciales (Híbridos)',
      };
    }
    const first = visibleRows[0];
    if (!first) {
      return {
        total: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        passRate: 0,
        durationLabel: '0.0 s',
        durationSubtext: 'Sin ejecuciones para este filtro',
      };
    }
    const rate = first.tests > 0 ? Number(((first.passed / first.tests) * 100).toFixed(1)) : 0;
    return {
      total: first.tests,
      passed: first.passed,
      failed: first.failed,
      skipped: first.skipped,
      passRate: rate,
      durationLabel: first.durationLabel,
      durationSubtext:
        first.status === 'Pendiente'
          ? 'Planificado — Pendiente de ejecución'
          : 'Con respecto a corrida previa en rama QA',
    };
  }, [selectedProject, statusFilter, visibleRows]);

  const isPlannedProject =
    selectedProject === 'shoot-studio' || selectedProject === 'supabase-auth';

  const trendData = isPlannedProject ? PASS_RATE_TREND_PLANNED : PASS_RATE_TREND_ASTURIAS;

  const donutData = [
    { name: 'Aprobados', value: metrics.passed, color: '#2ED38C' },
    { name: 'Fallidos', value: metrics.failed, color: '#EF4444' },
    {
      name: selectedProject === 'hotel-asturias-matrix' ? 'Parciales' : 'Pendientes',
      value: metrics.skipped,
      color: '#F59E0B',
    },
  ];

  // Fallback slice so Recharts Pie always renders a ring even if values are 0
  const safeDonutData =
    metrics.passed + metrics.failed + metrics.skipped > 0
      ? donutData
      : [{ name: 'Sin datos', value: 1, color: '#29332D' }];

  const passedPct =
    metrics.total > 0 ? ((metrics.passed / metrics.total) * 100).toFixed(1) : '0.0';
  const failedPct =
    metrics.total > 0 ? ((metrics.failed / metrics.total) * 100).toFixed(1) : '0.0';
  const skippedPct =
    metrics.total > 0 ? ((metrics.skipped / metrics.total) * 100).toFixed(1) : '0.0';

  const skippedLabel =
    selectedProject === 'hotel-asturias-matrix'
      ? 'Parciales (Híbridos)'
      : isPlannedProject
      ? 'Pendientes'
      : 'Omitidos';

  const HeadingTag = embedded ? 'h2' : 'h1';

  return (
    <div className="space-y-6">
      {/* Top Header + Filter Selectors */}
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div className="space-y-1.5">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-accent-lime">
            {embedded ? 'Dashboard de Ejecución Real del Proyecto' : 'QA Execution Dashboard'}
          </p>
          <HeadingTag className="text-2xl font-extrabold tracking-tight text-text-primary sm:text-4xl">
            Resultados de <span className="text-accent-lime">pruebas</span>
          </HeadingTag>
          <p className="text-xs text-text-secondary sm:text-sm max-w-2xl">
            {isPlannedProject
              ? 'Estado real del proyecto: matriz de casos de prueba diseñada y documentada (pendiente de ejecución automatizada).'
              : 'Métricas verificables obtenidas de la rama remota qa/playwright-ci (commit 46aeae7): 31 suites automatizadas (221 Vitest + 22 Playwright E2E) y matriz de 78 casos.'}
          </p>
        </div>

        {/* Project / View Mode, Commit & Status Controls */}
        <div className="flex flex-wrap items-end gap-3">
          <label className="space-y-1.5 text-xs">
            <span className="block text-text-secondary">Vista / Proyecto</span>
            <div className="relative flex items-center">
              <Layers
                className="pointer-events-none absolute left-3.5 h-4 w-4 text-accent-lime"
                aria-hidden="true"
              />
              <select
                aria-label="Filtrar por Proyecto"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="rounded-xl border border-[#29332D] bg-[#101513] pl-10 pr-8 py-2.5 text-xs font-medium text-text-primary focus:border-accent-lime focus:outline-none"
              >
                <option value="hotel-asturias">
                  Hotel Asturias — Suite Automatizada (243 Tests)
                </option>
                <option value="hotel-asturias-matrix">
                  Hotel Asturias — Matriz TEST-CASES.md (78 Casos)
                </option>
                <option value="shoot-studio">Shoot Studio — Planificado (18 Casos)</option>
                <option value="supabase-auth">Supabase Auth — Planificado (24 Casos)</option>
                <option value="ALL">Todas las ejecuciones del portafolio</option>
              </select>
            </div>
          </label>

          <label className="space-y-1.5 text-xs">
            <span className="block text-text-secondary">Referencia de Auditoría</span>
            <div className="relative flex items-center">
              <Calendar
                className="pointer-events-none absolute left-3.5 h-4 w-4 text-text-secondary"
                aria-hidden="true"
              />
              <select
                aria-label="Filtrar por Rango de fechas"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="rounded-xl border border-[#29332D] bg-[#101513] pl-10 pr-8 py-2.5 text-xs font-medium text-text-primary focus:border-accent-lime focus:outline-none"
              >
                <option value="Commit 46aeae7 · Rama qa/playwright-ci">
                  Commit 46aeae7 · qa/playwright-ci
                </option>
                <option value="Base 52af450 · Producción">Base 52af450 · Producción</option>
              </select>
            </div>
          </label>

          <label className="space-y-1.5 text-xs">
            <span className="block text-text-secondary">Estado</span>
            <select
              aria-label="Filtrar por Estado"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-[#29332D] bg-[#101513] px-3.5 py-2.5 text-xs font-medium text-text-primary focus:border-accent-lime focus:outline-none"
            >
              <option value="ALL">Todos</option>
              <option value="Exitoso">Exitoso</option>
              <option value="Fallido">Fallido (Diagnóstico)</option>
              <option value="Pendiente">Pendiente</option>
            </select>
          </label>
        </div>
      </div>

      {/* ROW 1: 5 KPI CARDS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Card 1: Total de tests */}
        <div
          data-testid="kpi-total"
          className="flex items-center gap-4 rounded-2xl border border-[#29332D] bg-[#101513] p-5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#29332D] bg-[#151B18] text-text-primary">
            <FlaskConical className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-text-primary leading-none">
              {metrics.total}
            </p>
            <p className="mt-1.5 text-xs text-text-secondary">
              {selectedProject === 'hotel-asturias-matrix' || isPlannedProject
                ? 'Total de casos'
                : 'Total de tests'}
            </p>
          </div>
        </div>

        {/* Card 2: Aprobados */}
        <div
          data-testid="kpi-passed"
          className="flex items-center gap-4 rounded-2xl border border-[#29332D] bg-[#101513] p-5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#1B4334] bg-[#0F241C] text-accent-lime">
            <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-text-primary leading-none">
              {metrics.passed}
            </p>
            <p className="mt-1.5 text-xs text-text-secondary">Aprobados</p>
          </div>
        </div>

        {/* Card 3: Fallidos */}
        <div
          data-testid="kpi-failed"
          className="flex items-center gap-4 rounded-2xl border border-[#29332D] bg-[#101513] p-5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/30 bg-red-950/40 text-red-400">
            <XCircle className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-text-primary leading-none">
              {metrics.failed}
            </p>
            <p className="mt-1.5 text-xs text-text-secondary">Fallidos</p>
          </div>
        </div>

        {/* Card 4: Omitidos / Parciales / Pendientes */}
        <div
          data-testid="kpi-skipped"
          className="flex items-center gap-4 rounded-2xl border border-[#29332D] bg-[#101513] p-5"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#29332D] bg-[#151B18] text-amber-300">
            <FastForward className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-text-primary leading-none">
              {metrics.skipped}
            </p>
            <p className="mt-1.5 text-xs text-text-secondary">{skippedLabel}</p>
          </div>
        </div>

        {/* Card 5: Pass rate */}
        <div
          data-testid="kpi-pass-rate"
          className="flex items-center gap-4 rounded-2xl border border-accent-lime/35 bg-surface p-5"
        >
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent-lime/80 text-accent-lime">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-3xl font-bold text-text-primary leading-none">
              {metrics.passRate}%
            </p>
            <p className="mt-1.5 text-xs text-text-secondary">Pass rate</p>
          </div>
        </div>
      </div>

      {/* ROW 2: 3 CHARTS & METRIC PANELS */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* Panel 1: Evolución del pass rate (col-span-5) */}
        <div className="rounded-2xl border border-[#29332D] bg-[#101513] p-5 lg:col-span-5 flex flex-col justify-between">
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent-lime" aria-hidden="true" />
              <h3 className="text-sm font-bold text-text-primary sm:text-base">
                Evolución del pass rate (qa/playwright-ci)
              </h3>
            </div>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 8, right: 12, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="passRateFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ED38C" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#2ED38C" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#29332D" />
                <XAxis dataKey="date" stroke="#A0AAA4" fontSize={11} />
                <YAxis
                  domain={isPlannedProject ? [0, 100] : [70, 100]}
                  ticks={isPlannedProject ? [0, 50, 100] : [70, 80, 90, 100]}
                  tickFormatter={(v) => `${v}%`}
                  stroke="#A0AAA4"
                  fontSize={11}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}%`, 'Pass rate']}
                  contentStyle={{
                    backgroundColor: '#101513',
                    borderColor: '#29332D',
                    borderRadius: '10px',
                    color: '#F5F7F5',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#2ED38C"
                  strokeWidth={2.5}
                  fill="url(#passRateFill)"
                  dot={{ r: 4, fill: '#2ED38C', stroke: '#080B0A', strokeWidth: 1.5 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Panel 2: Distribución de resultados (col-span-4) */}
        <div className="rounded-2xl border border-[#29332D] bg-[#101513] p-5 lg:col-span-4 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-2">
            <PieChartIcon className="h-4 w-4 text-accent-lime" aria-hidden="true" />
            <h3 className="text-sm font-bold text-text-primary sm:text-base">
              Distribución de resultados
            </h3>
          </div>

          <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-12 my-auto">
            <div className="relative h-44 sm:col-span-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={safeDonutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={68}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {safeDonutData.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-text-primary leading-none">
                  {metrics.total}
                </span>
                <span className="mt-1 text-xs text-text-secondary">
                  {selectedProject === 'hotel-asturias-matrix' || isPlannedProject
                    ? 'Casos'
                    : 'Tests'}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-xs sm:col-span-6">
              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-text-secondary">
                  <span className="h-3 w-3 rounded-sm bg-accent-lime" aria-hidden="true" />
                  Aprobados
                </span>
                <span className="font-semibold text-text-primary">
                  {metrics.passed} ({passedPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-text-secondary">
                  <span className="h-3 w-3 rounded-sm bg-[#EF4444]" aria-hidden="true" />
                  Fallidos
                </span>
                <span className="font-semibold text-text-primary">
                  {metrics.failed} ({failedPct}%)
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 text-text-secondary">
                  <span className="h-3 w-3 rounded-sm bg-[#F59E0B]" aria-hidden="true" />
                  {skippedLabel}
                </span>
                <span className="font-semibold text-text-primary">
                  {metrics.skipped} ({skippedPct}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Tiempo de ejecución (col-span-3) */}
        <div
          data-testid="kpi-duration"
          className="relative overflow-hidden rounded-2xl border border-[#29332D] bg-[#101513] p-5 lg:col-span-3 flex flex-col justify-between"
        >
          <div className="flex items-center gap-2">
            <Timer className="h-4 w-4 text-accent-lime" aria-hidden="true" />
            <h3 className="text-sm font-bold text-text-primary sm:text-base">
              Tiempo de ejecución
            </h3>
          </div>

          <div className="my-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-3xl sm:text-4xl font-extrabold text-text-primary tracking-tight">
                {metrics.durationLabel}
              </p>
              <p className="mt-2 text-xs text-text-secondary">
                <span className="font-semibold text-accent-lime">{metrics.durationSubtext}</span>
              </p>
            </div>
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[#1B4334] bg-[#0F241C] text-accent-lime">
              <Timer className="h-7 w-7" aria-hidden="true" />
            </div>
          </div>

          {/* Sparkline wave */}
          <div className="h-12 w-full">
            <svg viewBox="0 0 260 50" className="h-full w-full overflow-visible" fill="none">
              <defs>
                <linearGradient id="timeWave" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2ED38C" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#2ED38C" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 38 C 45 42, 70 15, 115 28 C 160 40, 195 10, 260 22 L 260 50 L 0 50 Z"
                fill="url(#timeWave)"
              />
              <path
                d="M0 38 C 45 42, 70 15, 115 28 C 160 40, 195 10, 260 22"
                stroke="#2ED38C"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ROW 3: HISTORIAL DE EJECUCIONES TABLE */}
      <div className="rounded-2xl border border-[#29332D] bg-[#101513] overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#29332D] px-6 py-4">
          <div className="flex items-center gap-2.5">
            <Layers className="h-4 w-4 text-accent-lime" aria-hidden="true" />
            <h3 className="text-base font-bold text-text-primary">
              Historial de ejecuciones verificadas
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="/projects/hotel-asturias/report"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-lime hover:underline"
            >
              <span>Explorador de 31 Suites & Código</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <a
              href="/deliverables/portfolio_case_study_hotel_asturias.json"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-accent-lime hover:underline"
            >
              <span>JSON Crudo</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="border-b border-[#29332D] bg-[#151B18]/70 text-xs text-text-secondary">
              <tr>
                <th scope="col" className="px-6 py-3.5 font-medium">#</th>
                <th scope="col" className="px-6 py-3.5 font-medium">Suite / Proyecto</th>
                <th scope="col" className="px-6 py-3.5 font-medium">Rama</th>
                <th scope="col" className="px-6 py-3.5 font-medium">Resultado</th>
                <th scope="col" className="px-6 py-3.5 font-medium">Tests / Casos</th>
                <th scope="col" className="px-6 py-3.5 font-medium">Duración</th>
                <th scope="col" className="px-6 py-3.5 font-medium">Referencia</th>
                <th scope="col" className="px-6 py-3.5 font-medium text-right">Detalle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#29332D]/70 text-xs sm:text-sm">
              {visibleRows.map((row) => (
                <tr key={row.id} className="hover:bg-[#151B18]/60 transition-colors">
                  <td className="px-6 py-4 font-mono font-semibold text-accent-lime whitespace-nowrap">
                    {row.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-text-primary whitespace-nowrap">
                    {row.project}
                  </td>
                  <td className="px-6 py-4 font-mono text-text-secondary whitespace-nowrap">
                    {row.branch}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {row.status === 'Exitoso' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1B4334] bg-[#0F241C] px-3 py-1 text-xs font-semibold text-accent-lime">
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                        Exitoso
                      </span>
                    ) : row.status === 'Fallido' ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-950/50 px-3 py-1 text-xs font-semibold text-red-400">
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        Diagnóstico
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#29332D] bg-[#151B18] px-3 py-1 text-xs font-medium text-amber-300">
                        Pendiente
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-mono text-text-primary whitespace-nowrap">
                    {row.tests}
                  </td>
                  <td className="px-6 py-4 font-mono text-text-secondary whitespace-nowrap">
                    {row.durationLabel}
                  </td>
                  <td className="px-6 py-4 text-text-secondary whitespace-nowrap">
                    {row.dateLabel}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => setSelectedRun(row)}
                      aria-label={`Consultar reporte ${row.id}`}
                      className="inline-flex items-center gap-1 rounded-lg border border-transparent p-1.5 text-accent-lime hover:border-accent-lime/40 hover:bg-[#0F241C]"
                    >
                      <span className="sr-only">Consultar reporte</span>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Report Details */}
      {selectedRun && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
        >
          <div className="w-full max-w-xl rounded-2xl border border-[#29332D] bg-[#101513] p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between gap-4 border-b border-[#29332D] pb-4">
              <div>
                <span className="font-mono text-xs font-bold text-accent-lime">
                  Ejecución {selectedRun.id} · Rama {selectedRun.branch}
                </span>
                <h3 id="report-modal-title" className="mt-1 text-xl font-bold text-text-primary">
                  Reporte de Ejecución — {selectedRun.project}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedRun(null)}
                aria-label="Cerrar ventana"
                className="rounded-lg border border-[#29332D] bg-[#151B18] p-2 text-text-secondary hover:text-text-primary"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-[#29332D] bg-[#080B0A] p-3 font-mono text-xs text-accent-lime flex items-center gap-2">
                <Terminal className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>$ {selectedRun.command}</span>
              </div>
              <p className="text-text-secondary leading-relaxed">{selectedRun.summary}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#29332D] pt-4">
              <a
                href={selectedRun.reportUrl}
                target={selectedRun.reportUrl.endsWith('.json') ? '_blank' : undefined}
                className="inline-flex items-center gap-2 rounded-xl bg-accent-lime px-4 py-2 text-xs font-bold text-bg-primary hover:bg-accent-lime-dim transition"
              >
                <span>Abrir artefacto completo</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => setSelectedRun(null)}
                className="rounded-xl border border-[#29332D] bg-[#151B18] px-4 py-2 text-xs font-semibold text-text-primary hover:border-accent-lime/50"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
