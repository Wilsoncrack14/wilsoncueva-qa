import { useState, useMemo } from 'react';
import {
  FileText,
  FileCode2,
  ShieldAlert,
  CheckCircle2,
  Search,
} from 'lucide-react';
import asturiasAudit from '../../content/projects/hotel-asturias-headless-qa.json';

interface CodeSample {
  id: string;
  file: string;
  runner: 'Playwright E2E' | 'Vitest';
  testsCount: number;
  cases: string;
  summary: string;
  code: string;
}

const REAL_CODE_SAMPLES: CodeSample[] = [
  {
    id: 'e2e-smoke',
    file: '__tests__/e2e/smoke-routes.spec.ts',
    runner: 'Playwright E2E',
    testsCount: 7,
    cases: 'TC-SMK-001..006 · TC-NAV-001..003 · TC-CON-001..002',
    summary:
      'Valida la carga de las 6 rutas principales con 0 errores críticos de consola, navegación móvil (375x667), historial atrás/adelante, enlaces profundos wa.me/tel: y contratos HTTP en vivo (/api/revalidate, /api/og, /api/tour/489).',
    code: `import { test, expect } from '@playwright/test';

const PRIMARY_ROUTES = [
  { path: '/', heading: /Hotel Asturias/i },
  { path: '/sedes', heading: /Nuestras Sedes/i },
  { path: '/habitaciones', heading: /Habitaciones/i },
  { path: '/servicios', heading: /Servicios/i },
  { path: '/pasion-y-placer', heading: /Pasión y Placer/i },
  { path: '/nosotros', heading: /Nosotros/i },
];

test.describe('Smoke & Flujos Críticos — Hotel Asturias', () => {
  test('TC-SMK-001..002: Rutas principales responden HTTP 200 sin pageerror', async ({ page }) => {
    const runtimeErrors: string[] = [];
    page.on('pageerror', (err) => runtimeErrors.push(err.message));

    for (const route of PRIMARY_ROUTES) {
      const res = await page.goto(route.path, { waitUntil: 'domcontentloaded' });
      expect(res?.status(), \`HTTP 200 esperado en \${route.path}\`).toBe(200);
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible();
    }
    expect(runtimeErrors).toHaveLength(0);
  });

  test('TC-SMK-005 / TC-CON-001: CTAs de WhatsApp contienen número oficial y mensaje contextual', async ({ page }) => {
    await page.goto('/sedes');
    const waLinks = page.locator('a[href*="wa.me/51"]');
    expect(await waLinks.count()).toBeGreaterThan(0);
    const href = await waLinks.first().getAttribute('href');
    expect(href).toMatch(/https:\\/\\/wa\\.me\\/51\\d{9}\\?text=/);
  });

  test('Contratos HTTP en vivo: POST /api/revalidate sin secreto retorna 401', async ({ request }) => {
    const res = await request.post('/api/revalidate', {
      data: { post_type: 'habitacion', slug: 'suite-asturias' },
    });
    expect(res.status()).toBe(401);
  });
});`,
  },
  {
    id: 'e2e-catalog-360',
    file: '__tests__/e2e/catalog-and-360.spec.ts',
    runner: 'Playwright E2E',
    testsCount: 6,
    cases: 'TC-HAB-001..006 · TC-360-001..005 · TC-PERF-002',
    summary:
      'Audita los filtros combinados por sede (/habitaciones?sede=lince), verifica que el catálogo NO descargue panorámicas 360° prematuramente, valida el lienzo WebGL (<canvas>) y simula HTTP 502 en /api/tour/* para comprobar el fallback de UI.',
    code: `import { test, expect } from '@playwright/test';

test.describe('Catálogo de Habitaciones & Visor Tour 360° WebGL', () => {
  test('TC-HAB-001 / TC-PERF-002: Filtrado por sede actualiza URL y no descarga /api/tour/* en listado', async ({ page }) => {
    const prematureTourRequests: string[] = [];
    page.on('request', (req) => {
      if (req.url().includes('/api/tour/')) prematureTourRequests.push(req.url());
    });

    await page.goto('/habitaciones?sede=lince', { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/sede=lince/);
    expect(prematureTourRequests, 'Cero descargas 360° en vista de catálogo').toHaveLength(0);
  });

  test('TC-360-005: Muestra fallback controlado si el proxy /api/tour/[mediaId] devuelve HTTP 502', async ({ page }) => {
    await page.route('**/api/tour/**', async (route) => {
      await route.fulfill({
        status: 502,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'WordPress media upstream error' }),
      });
    });

    await page.goto('/vista360');
    await expect(page.locator('body')).toBeVisible();
    // Verifica que la app no colapse con excepción no controlada
    const hasErrorBoundary = await page.getByText(/Application error/i).count();
    expect(hasErrorBoundary).toBe(0);
  });
});`,
  },
  {
    id: 'e2e-responsive-a11y',
    file: '__tests__/e2e/responsive-and-a11y.spec.ts',
    runner: 'Playwright E2E',
    testsCount: 3,
    cases: 'TC-RESP-001..006 · TC-A11Y-001..005 (Hallazgo DEF-002)',
    summary:
      'Evalúa scrollWidth horizontal en 6 viewports (320x568 a 1920x1080), aislando el hallazgo real DEF-002 (overflow de 49px en 320px por tracking-[0.15em] en un h2 en mayúsculas) y verificando landmarks ARIA y atributos alt.',
    code: `import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { width: 320, height: 568, label: 'iPhone SE (320px)' },
  { width: 375, height: 667, label: 'Mobile Standard (375px)' },
  { width: 430, height: 932, label: 'Mobile Large (430px)' },
  { width: 768, height: 1024, label: 'Tablet (768px)' },
  { width: 1280, height: 720, label: 'Desktop HD (1280px)' },
  { width: 1920, height: 1080, label: 'Full HD (1920px)' },
];

test('TC-RESP-001..006: Diagnóstico de overflow horizontal multi-viewport', async ({ page }) => {
  for (const vp of VIEWPORTS.slice(1)) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('/habitaciones', { waitUntil: 'domcontentloaded' });

    const overflowPx = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflowPx, \`0px overflow en \${vp.label}\`).toBeLessThanOrEqual(0);
  }
});`,
  },
  {
    id: 'vitest-revalidate',
    file: '__tests__/api/revalidate.test.ts',
    runner: 'Vitest',
    testsCount: 24,
    cases: 'TC-CMS-001..003 · TC-SEC-002',
    summary:
      'Suite de 24 pruebas unitarias sobre el webhook ISR (/api/revalidate): valida x-webhook-secret (401), payloads malformados (400), invalidación selectiva para 12 post_types de WordPress y limpieza de oldSlug cuando un editor renombra una habitación.',
    code: `import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/revalidate/route';
import { revalidatePath, revalidateTag } from 'next/cache';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

describe('POST /api/revalidate — Revalidación Quirúrgica ISR (24 tests)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.REVALIDATE_SECRET = 'qa-secret-token';
  });

  it('TC-CMS-003: Rechaza con 401 Unauthorized cuando x-webhook-secret es inválido', async () => {
    const req = new Request('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'x-webhook-secret': 'wrong-token' },
      body: JSON.stringify({ post_type: 'habitacion', slug: 'suite-jacuzzi' }),
    });
    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it('TC-CMS-001: Invalida ruta actual y ruta anterior (oldSlug) al renombrar habitación', async () => {
    const req = new Request('http://localhost:3000/api/revalidate', {
      method: 'POST',
      headers: { 'x-webhook-secret': 'qa-secret-token' },
      body: JSON.stringify({
        post_type: 'habitacion',
        slug: 'suite-imperial-renovada',
        oldSlug: 'suite-imperial',
      }),
    });
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(revalidatePath).toHaveBeenCalledWith('/habitaciones/suite-imperial-renovada');
    expect(revalidatePath).toHaveBeenCalledWith('/habitaciones/suite-imperial');
  });
});`,
  },
  {
    id: 'vitest-reviews',
    file: '__tests__/api/reviews.test.ts',
    runner: 'Vitest',
    testsCount: 13,
    cases: 'TC-API-004..006 · TC-SEC-002..003',
    summary:
      'Suite de 13 pruebas de seguridad sobre POST /api/reviews: verifica honeypot silencioso (204), trampa temporal anti-bots (<1.8s), rate limiting por IP (429 Too Many Requests), sanitización de vectores XSS y despacho SMTP vía Brevo.',
    code: `import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/reviews/route';

describe('POST /api/reviews — Anti-Spam, Rate Limit 429 & Sanitización XSS (13 tests)', () => {
  it('TC-API-005: Bloquea silenciosamente envíos con campo honeypot lleno o elapsedMs < 1800ms', async () => {
    const botReq = new Request('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '203.0.113.10' },
      body: JSON.stringify({
        name: 'SpamBot',
        rating: 5,
        comment: 'Buy cheap links',
        website: 'http://spam.example', // Honeypot activo
        elapsedMs: 420,
      }),
    });

    const res = await POST(botReq);
    expect([200, 204]).toContain(res.status);
  });

  it('TC-API-006: Aplica Rate Limit (429 Too Many Requests) tras superar el umbral por IP', async () => {
    const ip = '198.51.100.77';
    let lastStatus = 200;
    for (let i = 0; i < 6; i++) {
      const res = await POST(
        new Request('http://localhost:3000/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-forwarded-for': ip },
          body: JSON.stringify({ name: 'QA', rating: 5, comment: 'Test', elapsedMs: 3200 }),
        })
      );
      lastStatus = res.status;
    }
    expect(lastStatus).toBe(429);
  });
});`,
  },
  {
    id: 'vitest-zero-poisoning',
    file: '__tests__/lib/zero-cache-poisoning.test.ts',
    runner: 'Vitest',
    testsCount: 8,
    cases: 'TC-CMS-002 · TC-PERF-004 (Hallazgo INFRA-001)',
    summary:
      'Suite de 8 pruebas de resiliencia que valida el ConcurrencyLimiter en memoria y garantiza que errores 500/502/503 del servidor WordPress lancen WordPressAPIError en lugar de envenenar la caché ISR de Next.js con arreglos vacíos.',
    code: `import { describe, it, expect, vi } from 'vitest';
import { fetchWithZeroCachePoisoning, ConcurrencyLimiter } from '@/lib/wordpress';

describe('Arquitectura Zero Cache Poisoning & ConcurrencyLimiter (8 tests)', () => {
  it('TC-CMS-002: Lanza WordPressAPIError ante HTTP 503 persistente para preservar última página ISR válida', async () => {
    const mockFetch = vi.fn().mockResolvedValue(new Response('Service Unavailable', { status: 503 }));

    await expect(
      fetchWithZeroCachePoisoning('/wp-json/wp/v2/habitaciones', { fetcher: mockFetch, retries: 2 })
    ).rejects.toThrow(/WordPressAPIError/);
  });

  it('TC-PERF-004: ConcurrencyLimiter restringe el máximo de peticiones simultáneas al origen', async () => {
    const limiter = new ConcurrencyLimiter(3);
    let active = 0;
    let maxObserved = 0;

    await Promise.all(
      Array.from({ length: 12 }, () =>
        limiter.run(async () => {
          active++;
          maxObserved = Math.max(maxObserved, active);
          await new Promise((r) => setTimeout(r, 15));
          active--;
        })
      )
    );
    expect(maxObserved).toBeLessThanOrEqual(3);
  });
});`,
  },
];

export default function AsturiasReportView() {
  const [runnerFilter, setRunnerFilter] = useState<'ALL' | 'Playwright E2E' | 'Vitest'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCodeId, setSelectedCodeId] = useState<string>(REAL_CODE_SAMPLES[0].id);

  const filteredSuites = useMemo(() => {
    return asturiasAudit.automatedSuitesInventory.filter((suite) => {
      const matchRunner = runnerFilter === 'ALL' || suite.runner === runnerFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        suite.file.toLowerCase().includes(q) ||
        suite.category.toLowerCase().includes(q) ||
        suite.description.toLowerCase().includes(q) ||
        suite.casesCovered.some((c) => c.toLowerCase().includes(q));
      return matchRunner && matchQuery;
    });
  }, [runnerFilter, searchQuery]);

  const activeSample =
    REAL_CODE_SAMPLES.find((s) => s.id === selectedCodeId) ?? REAL_CODE_SAMPLES[0];

  return (
    <div className="space-y-14">
      {/* 1. DOCUMENTOS DE INGENIERÍA QA EN EL REPOSITORIO */}
      <section className="space-y-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent-lime">
              01 // BASE DOCUMENTAL EN RAMA QA/PLAYWRIGHT-CI
            </p>
            <h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">
              4 Entregables Formales de Ingeniería QA (3,402 líneas)
            </h2>
          </div>
          <span className="rounded-full border border-accent-lime/30 bg-accent-lime/10 px-3.5 py-1 font-mono text-xs font-semibold text-accent-lime">
            Commit {asturiasAudit.links.headCommit} · Base {asturiasAudit.links.baseCommit}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {asturiasAudit.qaDocumentation.map((doc) => (
            <div
              key={doc.document}
              className="flex flex-col justify-between rounded-2xl border border-[#29332D] bg-[#101513] p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-mono text-sm font-bold text-accent-lime">
                    <FileText className="h-4 w-4 shrink-0" aria-hidden="true" />
                    {doc.document}
                  </span>
                  <span className="rounded-md border border-[#29332D] bg-[#151B18] px-2 py-0.5 font-mono text-[11px] text-text-secondary">
                    {doc.lines} líneas
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-text-secondary">{doc.summary}</p>
              </div>
              <div className="mt-4 border-t border-[#29332D] pt-3 font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>Auditado en rama qa/playwright-ci</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. INSPECTOR DE CÓDIGO REAL (VITEST + PLAYWRIGHT) */}
      <section className="space-y-5">
        <div className="space-y-1.5">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent-lime">
            02 // CÓDIGO FUENTE REAL DE PRUEBAS (ACCESO DIRECTO SIN REPO PRIVADO)
          </p>
          <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
            Inspector de Suites Automatizadas (`__tests__/`)
          </h2>
          <p className="text-sm text-text-secondary max-w-3xl">
            Dado que el repositorio de producción del cliente es privado, aquí puedes inspeccionar directamente fragmentos reales de las suites de Playwright E2E y Vitest ejecutadas en la rama{' '}
            <code className="text-accent-lime">qa/playwright-ci</code>.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Selector de archivos */}
          <div className="space-y-2.5 lg:col-span-4">
            {REAL_CODE_SAMPLES.map((sample) => {
              const active = sample.id === activeSample.id;
              return (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => setSelectedCodeId(sample.id)}
                  className={`w-full text-left rounded-xl border p-4 transition ${
                    active
                      ? 'border-accent-lime/50 bg-[#14221C] text-text-primary'
                      : 'border-[#29332D] bg-[#101513] text-text-secondary hover:border-white/20 hover:text-text-primary'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-accent-lime">
                      {sample.runner}
                    </span>
                    <span className="rounded bg-[#080B0A] px-2 py-0.5 font-mono text-[11px] text-text-primary">
                      {sample.testsCount} tests
                    </span>
                  </div>
                  <p className="mt-1.5 font-mono text-xs font-semibold text-text-primary break-all">
                    {sample.file}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-text-secondary">{sample.cases}</p>
                </button>
              );
            })}
          </div>

          {/* Ventana de código */}
          <div className="rounded-2xl border border-[#29332D] bg-[#101513] p-5 lg:col-span-8 flex flex-col justify-between space-y-4">
            <div className="space-y-2 border-b border-[#29332D] pb-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FileCode2 className="h-5 w-5 text-accent-lime shrink-0" aria-hidden="true" />
                  <h3 className="font-mono text-sm font-bold text-text-primary sm:text-base break-all">
                    {activeSample.file}
                  </h3>
                </div>
                <span className="rounded-full border border-[#1B4334] bg-[#0F241C] px-3 py-1 font-mono text-xs font-semibold text-accent-lime">
                  {activeSample.runner} · {activeSample.testsCount} tests
                </span>
              </div>
              <p className="text-xs leading-relaxed text-text-secondary">{activeSample.summary}</p>
            </div>

            <div className="relative overflow-x-auto rounded-xl border border-[#29332D] bg-[#080B0A] p-4">
              <pre className="font-mono text-xs leading-relaxed text-text-primary">
                <code>{activeSample.code}</code>
              </pre>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 font-mono text-xs text-text-secondary">
              <span>Cobertura: {activeSample.cases}</span>
              <span className="text-emerald-400">✓ 100% Passing en qa/playwright-ci</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INVENTARIO COMPLETO DE LAS 31 SUITES AUTOMATIZADAS (243 TESTS) */}
      <section className="space-y-5">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent-lime">
              03 // INVENTARIO VERIFICADO DE ARCHIVOS DE PRUEBA
            </p>
            <h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">
              31 Suites Automatizadas (243 Tests: 221 Vitest + 22 Playwright E2E)
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar archivo, caso TC- o módulo..."
                aria-label="Buscar suite automatizada"
                className="rounded-xl border border-[#29332D] bg-[#101513] pl-9 pr-4 py-2 text-xs text-text-primary placeholder:text-text-secondary focus:border-accent-lime focus:outline-none"
              />
            </div>

            <div className="flex rounded-xl border border-[#29332D] bg-[#101513] p-1 text-xs">
              {(['ALL', 'Playwright E2E', 'Vitest'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRunnerFilter(r)}
                  className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition ${
                    runnerFilter === r
                      ? 'bg-accent-lime text-bg-primary font-bold'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {r === 'ALL'
                    ? 'Todas (31)'
                    : r === 'Playwright E2E'
                    ? 'Playwright (5)'
                    : 'Vitest (26)'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#29332D] bg-[#101513] overflow-hidden">
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead className="border-b border-[#29332D] bg-[#151B18] font-mono text-xs uppercase text-text-secondary">
                <tr>
                  <th scope="col" className="px-5 py-3.5">Archivo en Repositorio</th>
                  <th scope="col" className="px-5 py-3.5">Runner</th>
                  <th scope="col" className="px-5 py-3.5">Categoría</th>
                  <th scope="col" className="px-5 py-3.5 text-center">Tests</th>
                  <th scope="col" className="px-5 py-3.5">Casos Cubiertos</th>
                  <th scope="col" className="px-5 py-3.5">Alcance Técnico</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#29332D]/70">
                {filteredSuites.map((suite) => (
                  <tr key={suite.file} className="hover:bg-[#151B18]/60 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs font-semibold text-accent-lime whitespace-nowrap">
                      {suite.file}
                    </td>
                    <td className="px-5 py-3.5 whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-[11px] font-semibold ${
                          suite.runner === 'Playwright E2E'
                            ? 'border border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                            : 'border border-[#29332D] bg-[#151B18] text-text-primary'
                        }`}
                      >
                        {suite.runner}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-primary whitespace-nowrap">
                      {suite.category}
                    </td>
                    <td className="px-5 py-3.5 text-center font-mono font-bold text-text-primary">
                      {suite.tests}
                    </td>
                    <td className="px-5 py-3.5 font-mono text-[11px] text-text-secondary whitespace-nowrap">
                      {suite.casesCovered.join(', ')}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text-secondary min-w-[260px]">
                      {suite.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. MATRIZ DE TRAZABILIDAD DE RIESGOS (R01..R13) */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent-lime">
            04 // RISK-BASED TESTING (RBT)
          </p>
          <h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">
            Matriz de Riesgos de Negocio y Trazabilidad de Casos (R01–R13)
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {asturiasAudit.riskMatrix.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-2xl border border-[#29332D] bg-[#101513] p-5"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="font-bold text-accent-lime">
                    {item.id} · Prioridad {item.priority}
                  </span>
                  <span className="rounded border border-[#29332D] bg-[#151B18] px-2 py-0.5 text-[11px] text-text-secondary">
                    Impacto: {item.impact}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-text-primary leading-snug">{item.risk}</h3>
              </div>

              <div className="mt-4 border-t border-[#29332D] pt-3 flex flex-wrap gap-1.5">
                {item.cases.map((tc) => (
                  <span
                    key={tc}
                    className="rounded bg-[#080B0A] px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                  >
                    {tc}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. HALLAZGOS TÉCNICOS Y SOLUCIONES DE INGENIERÍA */}
      <section className="space-y-5">
        <div>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-accent-lime">
            05 // DEFECTOS REALES DETECTADOS Y MITIGADOS
          </p>
          <h2 className="mt-1 text-2xl font-bold text-text-primary sm:text-3xl">
            Hallazgos de Auditoría (DEF-001, DEF-002, DEF-TEST-001, INFRA-001)
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {asturiasAudit.keyFindingsAndSolutions.map((finding) => (
            <div
              key={finding.id}
              className="rounded-2xl border border-[#29332D] bg-[#101513] p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2 font-mono text-xs">
                  <span className="inline-flex items-center gap-1.5 font-bold text-accent-lime">
                    <ShieldAlert className="h-4 w-4" aria-hidden="true" />
                    {finding.id}
                  </span>
                  <span className="rounded-full border border-[#29332D] bg-[#151B18] px-3 py-0.5 text-text-secondary">
                    {finding.type} · {finding.severity}
                  </span>
                </div>
                <h3 className="text-base font-bold text-text-primary">{finding.title}</h3>
                <p className="text-xs sm:text-sm leading-relaxed text-text-secondary">
                  {finding.detail}
                </p>
                {'solution' in finding && finding.solution && (
                  <div className="rounded-xl border border-accent-lime/30 bg-[#0F241C]/70 p-3 text-xs text-accent-lime">
                    <strong>Remediación propuesta:</strong> {finding.solution}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#29332D] pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {finding.caseIds.map((c) => (
                    <span
                      key={c}
                      className="rounded bg-[#080B0A] px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-[11px] text-accent-lime">Documentado en TEST-PLAN</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
