# Portafolio Profesional — Wilson Cueva (QA Automation Engineer / Software QA)

Portafolio técnico especializado en **QA Automation, Web Testing, API Testing, Pruebas E2E y Rendimiento**, diseñado bajo una identidad visual **Dark Tech Editorial (`#080B0A` / `#B7FF35`)** con arquitectura limpia, tipado estricto en TypeScript y evidencias reales verificables.

---

## 1. Stack Tecnológico

- **Framework Principal:** Astro 4 + Islas de React 18 (`@astrojs/react`)
- **Lenguaje:** TypeScript (`strict` mode)
- **Estilos y Diseño:** Tailwind CSS (`#080B0A`, `#101513`, `#151B18`, `#B7FF35`, `#8EDB24`)
- **Iconografía:** Lucide React (`lucide-react`)
- **Visualización de Métricas:** Recharts (`recharts`)
- **Automatización E2E del Portafolio:** Playwright (`@playwright/test`) con Page Object Model y Fixtures
- **Integración Continua:** GitHub Actions (`.github/workflows/playwright.yml`)

---

## 2. Arquitectura y Estructura del Proyecto

```text
src/
├── pages/
│   ├── index.astro                # A. Landing Page (/)
│   ├── projects/
│   │   ├── index.astro            # B. Projects & Case Studies (/projects)
│   │   └── [slug].astro           # Detalle por proyecto (/projects/hotel-asturias, etc.)
│   ├── proyectos/[slug].astro     # Compatibilidad con enlaces previos
│   ├── dashboard.astro            # C. QA Dashboard (/dashboard)
│   ├── evidence.astro             # D. Technical Evidence (/evidence)
│   ├── about.astro                # E. About Me (/about)
│   ├── contact.astro              # F. Contact (/contact)
│   ├── robots.txt.ts              # SEO robots.txt
│   └── sitemap.xml.ts             # SEO sitemap.xml
├── components/
│   ├── layout/                    # Navbar.tsx, Footer.astro, Container.astro
│   ├── sections/                  # Hero.astro, TerminalDemo.tsx, TechGrid.tsx, FeaturedProjects.astro, AboutPreview.astro
│   ├── projects/                  # ProjectCard.astro, TestCasesTable.tsx
│   ├── dashboard/                 # QADashboard.tsx, MetricsCards.tsx, ExecutionCharts.tsx, ExecutionTable.tsx
│   ├── evidence/                  # EvidenceTabs.tsx
│   └── contact/                   # ContactForm.tsx
├── data/
│   ├── profile.ts                 # Perfil real de Wilson Cueva (Certus, Lima, Perú)
│   ├── skills.ts                  # Las 12 tecnologías principales
│   ├── projects.ts                # Hotel Asturias (datos auditados reales), Shoot Studio y Supabase Auth
│   ├── dashboard.ts               # Dataset normalizado de ejecuciones reales vs planificadas
│   └── evidence.ts                # Snippets de código Playwright, API Testing, JMeter y CI/CD
├── content/projects/
│   └── hotel-asturias-headless-qa.json  # Fuente de datos auditada original (78 casos, 221 Vitest, 22 E2E)
├── lib/
│   ├── utils.ts                   # Funciones de formato y clases
│   └── validations.ts             # Validación tipada del formulario de contacto
└── types/
    └── portfolio.ts               # Contratos e interfaces TypeScript
```

---

## 3. Comandos de Desarrollo, Build y Pruebas QA

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm dev

# Ejecutar validación estricta de tipos (TypeScript + Astro Check)
pnpm typecheck

# Compilar para producción
pnpm build

# Ejecutar la suite de pruebas E2E con Playwright (6 viewports + flujos funcionales)
pnpm test:e2e
```

---

## 4. Cómo Ampliar o Actualizar Datos Reales de Ejecución

1. **Agregar nuevas corridas al Dashboard (`/dashboard`):**
   Edita [`src/data/dashboard.ts`](src/data/dashboard.ts) e incorpora un nuevo registro `DashboardExecutionRun` indicando `isRealExecution: true` cuando provenga de un reporte real de Playwright/Vitest.
2. **Actualizar estados de casos de prueba (`/projects/[slug]`):**
   Edita [`src/data/projects.ts`](src/data/projects.ts) cambiando el estado de `Pendiente de ejecución` a `Aprobado` o `Parcial` únicamente cuando exista evidencia de ejecución verificada.
