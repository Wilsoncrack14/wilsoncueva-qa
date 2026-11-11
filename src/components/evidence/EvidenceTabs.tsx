import { useState } from 'react';
import {
  FileCode2,
  BarChart3,
  Link2,
  Zap,
  GitBranch,
  Check,
  CheckCircle2,
  MinusCircle,
  ExternalLink,
  Users,
  Clock,
  Layers,
} from 'lucide-react';
import TechLogo from '../ui/TechLogo';
import {
  playwrightEvidences,
  apiTestingEvidences,
  performanceEvidences,
  cicdEvidences,
} from '../../data/evidence';

type TabKey = 'playwright' | 'reports' | 'api' | 'performance' | 'cicd';

const TABS: {
  key: TabKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: 'playwright', label: 'Código (Playwright)', icon: FileCode2 },
  { key: 'reports', label: 'Reporte de tests', icon: BarChart3 },
  { key: 'api', label: 'API Testing', icon: Link2 },
  { key: 'performance', label: 'JMeter (Performance)', icon: Zap },
  { key: 'cicd', label: 'CI/CD (GitHub Actions)', icon: GitBranch },
];

const CODE_LINES = [
  { num: 1, content: "import { test, expect } from '@playwright/test';" },
  { num: 2, content: "import { BookingPage } from '@/pages/booking-page';" },
  { num: 3, content: '' },
  { num: 4, content: "test('reservar habitación exitosamente', async ({ page }) => {" },
  { num: 5, content: '  const booking = new BookingPage(page);' },
  { num: 6, content: '  await booking.goto();' },
  { num: 7, content: '' },
  { num: 8, content: "  await booking.selectSede('Lima');" },
  { num: 9, content: "  await booking.selectRoom('Suite');" },
  { num: 10, content: '  await booking.fillBookingForm(mockUser);' },
  { num: 11, content: '  await booking.submit();' },
  { num: 12, content: '  await expect(booking.successMessage()).toBeVisible();' },
  { num: 13, content: '});' },
];

export default function EvidenceTabs() {
  const [activeTab, setActiveTab] = useState<TabKey>('playwright');

  const cardRing = (key: TabKey) =>
    activeTab === key
      ? 'border-accent-lime/40 bg-bg-secondary'
      : 'border-white/[0.07] bg-bg-secondary hover:border-white/[0.15]';

  return (
    <div className="space-y-6">
      {/* 5 Top Pill Tabs with calm, refined active state */}
      <div
        role="tablist"
        aria-label="Categorías de evidencia técnica"
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`tab-${tab.key}`}
              aria-selected={isSelected}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60 sm:text-[13px] ${
                isSelected
                  ? 'border border-accent-lime/40 bg-surface text-text-primary'
                  : 'border border-white/[0.07] bg-bg-secondary text-text-secondary hover:border-white/[0.15] hover:text-text-primary'
              }`}
            >
              <Icon
                className={`h-4 w-4 shrink-0 ${
                  isSelected ? 'text-accent-lime' : 'text-text-secondary'
                }`}
                aria-hidden="true"
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* BENTO GRID (Top Row: 2 Cards | Bottom Row: 3 Cards) matching 04-evidence.png */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* TOP LEFT CARD: tests/e2e/booking.spec.ts */}
        <article
          onClick={() => setActiveTab('playwright')}
          className={`cursor-pointer rounded-2xl border bg-[#101513] p-5 transition ${cardRing(
            'playwright'
          )}`}
        >
          <div className="flex items-center justify-between gap-2 border-b border-[#29332D] pb-3.5">
            <div className="flex items-center gap-2.5">
              <FileCode2 className="h-5 w-5 text-accent-lime" aria-hidden="true" />
              <h2 className="font-mono text-sm font-bold text-text-primary sm:text-base">
                tests/e2e/booking.spec.ts
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#29332D] bg-[#151B18] px-3 py-1 text-xs font-medium text-text-primary">
              <TechLogo id="playwright" className="h-4 w-4" />
              <span>Playwright</span>
            </span>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl bg-[#0B0F0E] p-4 font-mono text-xs leading-relaxed">
            {CODE_LINES.map((line) => (
              <div key={line.num} className="flex items-start gap-4">
                <span className="w-5 select-none text-right text-text-secondary/50">
                  {line.num}
                </span>
                <span className="whitespace-pre text-text-primary">
                  {line.content || ' '}
                </span>
              </div>
            ))}
          </div>
        </article>

        {/* TOP RIGHT CARD: Reporte de Playwright */}
        <article
          onClick={() => setActiveTab('reports')}
          className={`cursor-pointer rounded-2xl border bg-[#101513] p-5 transition flex flex-col justify-between ${cardRing(
            'reports'
          )}`}
        >
          <div className="flex items-center gap-2.5 border-b border-[#29332D] pb-3.5">
            <BarChart3 className="h-5 w-5 text-accent-lime" aria-hidden="true" />
            <h2 className="text-base font-bold text-text-primary">Reporte de Playwright</h2>
          </div>

          <div className="my-4 grid grid-cols-1 gap-5 sm:grid-cols-12 items-center">
            {/* Left summary pills */}
            <div className="space-y-3 sm:col-span-5">
              <div className="flex items-center gap-2.5">
                <TechLogo id="playwright" className="h-8 w-8 shrink-0" />
                <div>
                  <p className="text-base font-extrabold text-text-primary leading-none">
                    Playwright
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">Test Report</p>
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <div className="inline-flex w-full items-center gap-2 rounded-full border border-[#1B4334] bg-[#0F241C] px-3.5 py-1.5 text-xs font-semibold text-accent-lime">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>243 passed (100%)</span>
                </div>
                <div className="inline-flex w-full items-center gap-2 rounded-full border border-[#29332D] bg-[#151B18] px-3.5 py-1.5 text-xs font-medium text-text-secondary">
                  <MinusCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>221 Vitest · 22 E2E</span>
                </div>
                <div className="inline-flex w-full items-center gap-2 rounded-full border border-[#29332D] bg-[#151B18] px-3.5 py-1.5 text-xs font-semibold text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>0 failed · 31 suites</span>
                </div>
              </div>

              <p className="pt-1 font-mono text-xs text-text-secondary">
                <strong className="text-text-primary">243 tests</strong> · 5.84s (Vitest)
              </p>
            </div>

            {/* Right Mini Report Window */}
            <div className="sm:col-span-7 space-y-3">
              <div className="rounded-xl border border-[#29332D] bg-[#0B0F0E] p-3.5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-[#29332D] pb-2">
                  <span className="text-xs font-semibold text-text-primary">
                    qa/playwright-ci · Commit 46aeae7
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
                  <span className="text-accent-lime">✓ 243 passed</span>
                  <span className="text-text-secondary">⊙ 78 casos matriz</span>
                </div>

                <div className="grid grid-cols-12 gap-2.5 items-center pt-1">
                  <ul className="col-span-7 space-y-1.5 font-mono text-[11px] text-text-primary">
                    <li className="flex items-center justify-between border-b border-[#29332D]/60 pb-1">
                      <span>smoke-routes.spec.ts</span>
                      <span className="text-accent-lime">✓</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-[#29332D]/60 pb-1">
                      <span>catalog-and-360.spec.ts</span>
                      <span className="text-accent-lime">✓</span>
                    </li>
                    <li className="flex items-center justify-between border-b border-[#29332D]/60 pb-1">
                      <span>chat-widget.spec.ts</span>
                      <span className="text-accent-lime">✓</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>revalidate.test.ts (24)</span>
                      <span className="text-accent-lime">✓</span>
                    </li>
                  </ul>
                  <div className="col-span-5 overflow-hidden rounded-lg border border-[#29332D]">
                    <img
                      src="/images/projects/thumb-hotel-asturias.png"
                      alt="Miniatura Hotel Asturias en reporte Playwright"
                      width="140"
                      height="110"
                      loading="lazy"
                      className="h-24 w-full object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2">
                <a
                  href="/projects/hotel-asturias/report"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 rounded-full border border-accent-lime/60 bg-[#0F241C]/80 px-4 py-1.5 text-xs font-semibold text-text-primary transition hover:bg-accent-lime hover:text-bg-primary"
                >
                  <span>Ver reporte completo (31 Suites)</span>
                  <ExternalLink className="h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* BOTTOM ROW: 3 CARDS matching 04-evidence.png */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* BOTTOM CARD 1: API Testing (Postman) */}
        <article
          onClick={() => setActiveTab('api')}
          className={`cursor-pointer rounded-2xl border bg-[#101513] p-5 transition space-y-4 ${cardRing(
            'api'
          )}`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <TechLogo id="postman" className="h-6 w-6 shrink-0" />
              <h2 className="text-base font-bold text-text-primary">API Testing (Postman)</h2>
            </div>
            <span className="rounded-full border border-[#1B4334] bg-[#0F241C] px-3 py-0.5 font-mono text-xs font-bold text-accent-lime">
              200 OK
            </span>
          </div>

          <div className="rounded-xl border border-[#29332D] bg-[#0B0F0E] px-3.5 py-2.5 font-mono text-xs">
            <span className="font-bold text-accent-lime">GET</span>{' '}
            <span className="text-text-primary">/wp-json/wp/v2/habitaciones</span>
          </div>

          <ul className="space-y-2 text-xs text-text-primary sm:text-sm">
            <li className="flex items-center gap-2.5">
              <Check className="h-4 w-4 text-accent-lime shrink-0" aria-hidden="true" />
              <span>Respuesta válida (JSON)</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="h-4 w-4 text-accent-lime shrink-0" aria-hidden="true" />
              <span>Status code: 200</span>
            </li>
            <li className="flex items-center gap-2.5">
              <Check className="h-4 w-4 text-accent-lime shrink-0" aria-hidden="true" />
              <span>Tiempo de respuesta: 320 ms</span>
            </li>
          </ul>
        </article>

        {/* BOTTOM CARD 2: JMeter (Performance) */}
        <article
          onClick={() => setActiveTab('performance')}
          className={`cursor-pointer rounded-2xl border bg-[#101513] p-5 transition space-y-4 ${cardRing(
            'performance'
          )}`}
        >
          <div className="flex items-center gap-2.5">
            <TechLogo id="jmeter" className="h-6 w-6 shrink-0" />
            <h2 className="text-base font-bold text-text-primary">JMeter (Performance)</h2>
          </div>

          <div className="grid grid-cols-12 items-center gap-4 pt-2">
            {/* Sparkline curve matching 04-evidence.png */}
            <div className="col-span-6">
              <svg viewBox="0 0 180 90" className="h-24 w-full overflow-visible" fill="none">
                <defs>
                  <linearGradient id="jmeterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2ED38C" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#2ED38C" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M8 70 Q 35 45, 55 52 T 115 36 T 170 15 L 170 85 L 8 85 Z"
                  fill="url(#jmeterGrad)"
                />
                <path
                  d="M8 70 Q 35 45, 55 52 T 115 36 T 170 15"
                  stroke="#2ED38C"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="38" cy="52" r="3.5" fill="#2ED38C" />
                <circle cx="78" cy="54" r="3.5" fill="#2ED38C" />
                <circle cx="122" cy="34" r="3.5" fill="#2ED38C" />
                <circle cx="170" cy="15" r="4" fill="#2ED38C" />
              </svg>
            </div>

            <ul className="col-span-6 space-y-2.5 text-xs text-text-primary">
              <li className="flex items-center gap-2">
                <Users className="h-4 w-4 text-accent-lime shrink-0" aria-hidden="true" />
                <span>
                  <strong>1,000</strong> usuarios
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-accent-lime shrink-0" aria-hidden="true" />
                <span>
                  Latencia prom.: <strong>418 ms</strong>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-accent-lime shrink-0" aria-hidden="true" />
                <span>
                  Throughput: <strong>58.3 req/s</strong>
                </span>
              </li>
            </ul>
          </div>
        </article>

        {/* BOTTOM CARD 3: CI/CD (GitHub Actions) */}
        <article
          onClick={() => setActiveTab('cicd')}
          className={`cursor-pointer rounded-2xl border bg-[#101513] p-5 transition space-y-5 ${cardRing(
            'cicd'
          )}`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <TechLogo id="github" className="h-5 w-5 shrink-0" />
              <h2 className="text-base font-bold text-text-primary">CI/CD (GitHub Actions)</h2>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#1B4334] bg-[#0F241C] px-3 py-0.5 text-xs font-semibold text-accent-lime">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Passed</span>
            </span>
          </div>

          {/* 4-Step Pipeline Stepper matching 04-evidence.png */}
          <div className="relative pt-4">
            <div
              className="absolute left-6 right-6 top-7 h-0.5 bg-accent-lime/50"
              aria-hidden="true"
            />
            <div className="relative grid grid-cols-4 text-center">
              {[
                { name: 'Build', time: '42s' },
                { name: 'Tests', time: '12.1s' },
                { name: 'Report', time: '5s' },
                { name: 'Deploy', time: '18s' },
              ].map((stage) => (
                <div key={stage.name} className="flex flex-col items-center">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-lime text-bg-primary shadow-[0_0_12px_rgba(46,211,140,0.35)]">
                    <Check className="h-4 w-4 stroke-[3]" aria-hidden="true" />
                  </span>
                  <span className="mt-2.5 text-xs font-bold text-text-primary">{stage.name}</span>
                  <span className="mt-0.5 font-mono text-[11px] text-text-secondary">
                    {stage.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>

      {/* EXPANDED TECHNICAL INSPECTION PANEL FOR SELECTED TAB */}
      <div
        role="tabpanel"
        aria-labelledby={`tab-${activeTab}`}
        className="rounded-2xl border border-[#29332D] bg-[#101513]/90 p-6 space-y-4"
      >
        {activeTab === 'playwright' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-accent-lime">
                Detalle Técnico — Page Object Model, Fixtures y Aislamiento (Hotel Asturias)
              </h3>
              <span className="font-mono text-xs text-text-secondary">
                {playwrightEvidences[0].fileReference}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">
              {playwrightEvidences[0].description}
            </p>
            <pre className="overflow-x-auto rounded-xl border border-[#29332D] bg-[#080B0A] p-4 font-mono text-xs text-text-primary">
              <code>{playwrightEvidences[0].code}</code>
            </pre>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-accent-lime">
              Trazabilidad de Reportes — Auditoría Real Hotel Asturias (Rama qa/playwright-ci · Commit 46aeae7)
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              Además de la vista resumida del wireframe, puedes explorar el Reporte Visual Interactivo con las 31 suites automatizadas (221 pruebas Vitest + 22 flujos E2E en Playwright), los 4 documentos de ingeniería QA (3,402 líneas) y el código real, o descargar el JSON crudo.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <a
                href="/projects/hotel-asturias/report"
                className="inline-flex items-center gap-2 rounded-lg bg-accent-lime px-3.5 py-2 text-xs font-bold text-bg-primary hover:bg-accent-lime-dim transition"
              >
                Abrir Reporte Visual Interactivo (31 Suites · 243 Tests) →
              </a>
              <a
                href="/deliverables/portfolio_case_study_hotel_asturias.json"
                target="_blank"
                className="inline-flex items-center gap-2 font-mono text-xs text-accent-lime hover:underline"
              >
                Descargar /deliverables/portfolio_case_study_hotel_asturias.json ↗
              </a>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-accent-lime">
                Endpoints Auditados: /api/revalidate · /api/reviews · /api/tour/[id]
              </h3>
              <span className="font-mono text-xs text-text-secondary">
                Status Codes: 200, 204, 304, 400, 401, 404, 429, 502
              </span>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">
              {apiTestingEvidences[0].description}
            </p>
            <pre className="overflow-x-auto rounded-xl border border-[#29332D] bg-[#080B0A] p-4 font-mono text-xs text-text-primary">
              <code>{apiTestingEvidences[0].code}</code>
            </pre>
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-3">
            <h3 className="text-base font-bold text-accent-lime">
              Diagnóstico de Concurrencia y Hallazgo Real {performanceEvidences.realFinding.id}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary">
              {performanceEvidences.realFinding.explanation}
            </p>
            <pre className="overflow-x-auto rounded-xl border border-[#29332D] bg-[#080B0A] p-4 font-mono text-xs text-text-primary">
              <code>{performanceEvidences.jmeterPlan.xmlSnippet}</code>
            </pre>
          </div>
        )}

        {activeTab === 'cicd' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-bold text-accent-lime">
                Workflow de Integración Continua ({cicdEvidences.workflowPath})
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-text-secondary">{cicdEvidences.description}</p>
            <pre className="overflow-x-auto rounded-xl border border-[#29332D] bg-[#080B0A] p-4 font-mono text-xs text-text-primary">
              <code>{cicdEvidences.yamlCode}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
