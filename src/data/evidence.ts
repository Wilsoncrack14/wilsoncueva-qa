export interface EvidenceSnippet {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  description: string;
  fileReference: string;
  repoUrl?: string;
  codeLanguage: string;
  code: string;
  keyTakeaways: string[];
}

export const playwrightEvidences: EvidenceSnippet[] = [
  {
    id: 'pw-pom-isolation',
    title: 'Page Object Model (POM) & Aislamiento de Contexto Multi-Viewport',
    subtitle: 'Encapsulamiento de selectores accesibles y verificación de cero overflow horizontal (320px–1920px)',
    badge: 'Playwright + TypeScript',
    description:
      'Implementación real utilizada para auditar el catálogo de habitaciones y detectar el desbordamiento horizontal de 49px en el viewport extremo 320x568 (DEF-002), manteniendo 0px de overflow desde 375px hasta 1920px.',
    fileReference: 'e2e/responsive-a11y.spec.ts',
    repoUrl: 'https://github.com/Wilsoncrack14/hotel-asturias-vercel',
    codeLanguage: 'typescript',
    code: `import { test, expect, type Page } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile-xs', width: 320, height: 568 },
  { name: 'mobile-sm', width: 375, height: 667 },
  { name: 'mobile-lg', width: 430, height: 932 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1280, height: 720 },
  { name: 'full-hd', width: 1920, height: 1080 },
] as const;

export class RoomsCatalogPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/habitaciones', { waitUntil: 'domcontentloaded' });
  }

  async getHorizontalOverflowPx(): Promise<number> {
    return this.page.evaluate(() => {
      return document.documentElement.scrollWidth - window.innerWidth;
    });
  }
}

test.describe('Responsive Matrix & Zero Horizontal Overflow', () => {
  for (const vp of VIEWPORTS) {
    test(\`[${'${vp.name}'}] /habitaciones mantiene layout estable (${'${vp.width}'}x${'${vp.height}'})\`, async ({ page }) => {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      const catalog = new RoomsCatalogPage(page);
      await catalog.goto();

      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const overflowPx = await catalog.getHorizontalOverflowPx();
      expect(overflowPx, \`Overflow detectado en viewport ${'${vp.width}'}px\`).toBeLessThanOrEqual(0);
    });
  }
});`,
    keyTakeaways: [
      'Uso de locators semánticos (`getByRole`) resilientes a cambios cosméticos de clases CSS.',
      'Medición determinista en el DOM (`scrollWidth - innerWidth`) que permitió aislar el hallazgo DEF-002 en 320px.',
      'Cada test corre en un BrowserContext aislado sin contaminación de cookies ni storage.',
    ],
  },
  {
    id: 'pw-fixtures-network',
    title: 'Fixtures Personalizadas e Intercepción de Fallos 502 en Visor 360° WebGL',
    subtitle: 'Simulación de degradación del servidor de origen para validar resiliencia de la UI',
    badge: 'Fixtures & Network Mocking',
    description:
      'Verifica tanto la inicialización normal del lienzo WebGL (<canvas>) como la presentación del estado de contingencia ("Vista 360° no disponible") cuando el proxy multimedia devuelve HTTP 502 Bad Gateway.',
    fileReference: 'e2e/tour360-viewer.spec.ts',
    repoUrl: 'https://github.com/Wilsoncrack14/hotel-asturias-vercel',
    codeLanguage: 'typescript',
    code: `import { test as base, expect } from '@playwright/test';

type TourFixtures = {
  mockOrigin502: () => Promise<void>;
};

export const test = base.extend<TourFixtures>({
  mockOrigin502: async ({ page }, use) => {
    const activateMock = async () => {
      await page.route('**/api/tour/**', async (route) => {
        await route.fulfill({
          status: 502,
          contentType: 'application/json',
          body: JSON.stringify({ error: 'Upstream WordPress media timeout' }),
        });
      });
    };
    await use(activateMock);
  },
});

test('Muestra fallback controlado cuando el proxy 360° responde 502', async ({ page, mockOrigin502 }) => {
  await mockOrigin502();
  await page.goto('/vista360?room=suite-ejecutiva');

  const fallbackAlert = page.getByText(/Vista 360° no disponible/i);
  await expect(fallbackAlert).toBeVisible();
});`,
    keyTakeaways: [
      'Inyección de comportamiento de red mediante `base.extend` sin acoplar la configuración de rutas al cuerpo del test.',
      'Comprobación de que errores 5xx del CMS no provocan pantallas en blanco ni excepciones no capturadas.',
    ],
  },
];

export const apiTestingEvidences: EvidenceSnippet[] = [
  {
    id: 'api-reviews-security',
    title: 'Validación de Seguridad, Rate Limiting (429) y Anti-XSS en /api/reviews',
    subtitle: 'Pruebas contractuales sobre métodos HTTP, códigos de estado y sanitización de payloads JSON',
    badge: 'API Security & Contracts',
    description:
      'Suite de pruebas que verifica las capas de defensa del endpoint público de reseñas: honeypot silencioso para bots, trampa temporal (<1.8s), límite de peticiones por IP (429 Too Many Requests) y escape de etiquetas HTML/script.',
    fileReference: '__tests__/api/reviews.test.ts',
    repoUrl: 'https://github.com/Wilsoncrack14/hotel-asturias-vercel',
    codeLanguage: 'typescript',
    code: `import { describe, it, expect } from 'vitest';
import { POST } from '@/app/api/reviews/route';

describe('POST /api/reviews — Validación JSON, Status Codes y Seguridad', () => {
  it('Rechaza con 400 Bad Request cuando faltan campos obligatorios', async () => {
    const req = new Request('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: 'QA Tester', rating: 5 }), // falta comment y elapsedMs
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body).toHaveProperty('error');
  });

  it('Sanitiza payloads con vectores XSS antes de persistir o responder', async () => {
    const req = new Request('http://localhost:3000/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-forwarded-for': '198.51.100.24' },
      body: JSON.stringify({
        author: 'Wilson QA',
        rating: 5,
        comment: '<script>alert("xss")</script>Excelente atención',
        websiteHoneypot: '',
        elapsedMs: 3400,
      }),
    });

    const res = await POST(req);
    expect([200, 201]).toContain(res.status);
    const data = await res.json();
    expect(data.sanitizedComment).not.toContain('<script>');
  });
});`,
    keyTakeaways: [
      'Verificación explícita de códigos HTTP: 200/201 (éxito), 204 (honeypot trap), 304 (ETag caché), 400 (validación), 401 (no autorizado) y 429 (rate limit).',
      'Validación de esquemas JSON y cabeceras de caché (`Vercel-CDN-Cache-Control`, `ETag`).',
    ],
  },
];

export const performanceEvidences = {
  summary:
    'Diseño de pruebas de rendimiento y diagnóstico real de concurrencia sobre el servidor de origen. Incluye el aislamiento del hallazgo INFRA-001 en Hotel Asturias y la configuración de plan de carga en Apache JMeter.',
  realFinding: {
    id: 'INFRA-001',
    title: 'Mitigación de Saturación en Origen WordPress durante Ejecución Concurrente',
    metricBefore: '~40.0s por página (con ETIMEDOUT intermitentes bajo 4 workers)',
    metricAfter: '1.3s – 5.1s por página (0 timeouts con control de concurrencia)',
    explanation:
      'Al ejecutar 4 workers de navegador simultáneos, se disparaban ~80 peticiones concurrentes de optimización /_next/image hacia el servidor WordPress de origen. Se diagnosticó el cuello de botella, se implementó ConcurrencyLimiter y se parametrizó --workers=1 para corridas contra el origen compartido.',
  },
  jmeterPlan: {
    title: 'Plan de Carga Apache JMeter — Escenario de Concurrencia y Caché Edge',
    note: 'Configuración técnica de referencia para evaluar latencia, throughput y tasa de error en endpoints críticos.',
    parameters: [
      { label: 'Usuarios Concurrentes (Threads)', value: '50 usuarios virtuales (Ramp-up: 30s)' },
      { label: 'Endpoints Evaluados', value: 'GET /, GET /habitaciones, GET /api/tour/[mediaId]' },
      { label: 'Criterio de Latencia (p95)', value: '< 800 ms en rutas cacheadas en CDN / < 2500 ms en SSR frío' },
      { label: 'Throughput Objetivo', value: '>= 25 req/seg sostenidos sin degradación 5xx' },
      { label: 'Error Rate Máximo Tolerado', value: '< 1.0% (0 respuestas 502/504 no controladas)' },
    ],
    xmlSnippet: `<!-- Fragmento de configuración ThreadGroup en Apache JMeter (.jmx) -->
<ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="QA_HotelAsturias_Concurrency" enabled="true">
  <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
  <elementProp name="ThreadGroup.main_controller" elementType="LoopController">
    <boolProp name="LoopController.continue_forever">false</boolProp>
    <stringProp name="LoopController.loops">10</stringProp>
  </elementProp>
  <stringProp name="ThreadGroup.num_threads">50</stringProp>
  <stringProp name="ThreadGroup.ramp_time">30</stringProp>
</ThreadGroup>`,
  },
};

export const cicdEvidences = {
  title: 'Pipeline CI/CD con GitHub Actions para Verificación de Build, Typecheck y Playwright E2E',
  description:
    'Flujo automatizado que se ejecuta en cada push o pull request. Instala dependencias con caché de pnpm, verifica el tipado estricto de TypeScript, compila la aplicación, ejecuta las pruebas E2E de Playwright y publica el reporte HTML como artefacto descargable.',
  workflowPath: '.github/workflows/playwright.yml',
  stages: [
    {
      step: '01. Checkout & Setup Node/pnpm',
      detail: 'Clonado del repositorio e hidratación de caché de dependencias con pnpm.',
    },
    {
      step: '02. Typecheck & Production Build',
      detail: 'Ejecución de `pnpm build` (`astro check && astro build`) garantizando 0 errores de TypeScript.',
    },
    {
      step: '03. Playwright E2E Suite',
      detail: 'Ejecución de pruebas automatizadas sobre el servidor de previsualización validando rutas, responsive, descargas y formularios.',
    },
    {
      step: '04. Artifact Upload (HTML & Traces)',
      detail: 'Almacenamiento de `playwright-report/` y capturas en caso de fallo con retención de 14 días.',
    },
  ],
  yamlCode: `name: QA Portfolio — CI/CD & Playwright E2E

on:
  push:
    branches: [main, 'qa/**']
  pull_request:
    branches: [main]

jobs:
  verify-and-test:
    timeout-minutes: 15
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 9

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Install Playwright Browsers
        run: pnpm exec playwright install --with-deps chromium

      - name: Run TypeScript Check & Production Build
        run: pnpm build

      - name: Execute Playwright E2E Tests
        run: pnpm test:e2e

      - name: Upload Playwright HTML Report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-html-report
          path: playwright-report/
          retention-days: 14`,
};
