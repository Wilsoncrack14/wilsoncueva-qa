export const profileData = {
  initials: 'WC',
  name: 'Wilson Cueva',
  role: 'QA Automation Engineer / Software QA',
  specialization: 'Web Testing · API Testing · Pruebas E2E · Rendimiento',
  location: 'Lima, Perú',
  heroDescription:
    'Construyo automatizaciones de pruebas confiables para garantizar la calidad del software, con enfoque en Web Testing, API Testing, pruebas E2E y rendimiento.',
  academicProfile:
    'Egresado de Administración de Sistemas para la Transformación Digital en Certus, con formación en desarrollo web, testing de software, automatización y tecnologías cloud.',
  email: 'cueva.vilchez.wilson@gmail.com',
  githubUrl: 'https://github.com/Wilsoncrack14',
  linkedinUrl: 'https://www.linkedin.com/in/wilson-cueva/',
  cvUrl: '/CV_Wilson_Cueva_QA_Automation.pdf',
  education: [
    {
      institution: 'Instituto Certus — Lima, Perú',
      program: 'Administración de Sistemas para la Transformación Digital',
      status: 'Formación académica terminada',
      summary:
        'Formación orientada a arquitectura de software, aseguramiento de calidad (QA), desarrollo web moderno, automatización de procesos e infraestructura cloud.',
      focusAreas: [
        'Ingeniería de Calidad de Software y Diseño de Casos Basados en Riesgo',
        'Automatización E2E y Pruebas de Integración (Playwright / Vitest)',
        'Arquitecturas Web Modernas (Next.js, React, TypeScript, REST APIs)',
        'Infraestructura Cloud, Contenedores Docker, Cloudflare CDN y CI/CD',
      ],
    },
  ],
  knowledgePillars: [
    {
      title: 'QA Automation & Testing E2E',
      items: [
        'Diseño de matrices de prueba trazables a riesgos de negocio',
        'Automatización E2E multi-viewport con Playwright y TypeScript',
        'Patrón Page Object Model (POM), Fixtures personalizadas y aislamiento de tests',
        'Pruebas unitarias y contratos de API con Vitest',
      ],
    },
    {
      title: 'API Testing & Seguridad',
      items: [
        'Validación funcional y contractual de endpoints REST con Postman y Playwright APIRequestContext',
        'Verificación de códigos de estado HTTP (200, 204, 304, 400, 401, 404, 429, 502)',
        'Pruebas de seguridad en endpoints públicos: rate limiting por IP, honeypot, sanitización XSS y validación de cabeceras CORS/ETag',
      ],
    },
    {
      title: 'Performance, SEO Técnico & Accesibilidad',
      items: [
        'Pruebas de carga, concurrencia, latencia y throughput con Apache JMeter',
        'Diagnóstico de cuellos de botella en servidores de origen y optimización de caché CDN',
        'Auditoría de Core Web Vitals (LCP, INP, CLS, TTFB), SEO técnico y accesibilidad WCAG 2.2 AA',
      ],
    },
    {
      title: 'Desarrollo Web & DevOps CI/CD',
      items: [
        'Comprensión profunda del código bajo prueba (Next.js App Router, React, TypeScript, WordPress Headless)',
        'Integración continua con GitHub Actions para ejecución automatizada y publicación de artefactos HTML/JSON',
        'Entornos reproducibles con Docker y despliegues en Vercel / Cloudflare',
      ],
    },
  ],
  practicalExperience: [
    {
      project: 'Hotel Asturias — Plataforma Headless & Suite QA Automation',
      role: 'Full-Stack Developer & QA Automation Engineer (Proyecto Técnico Real)',
      period: '2026',
      description:
        'Diseño y ejecución de una estrategia integral de calidad sobre una aplicación Next.js + WordPress Headless en producción (5 sedes en Lima).',
      achievements: [
        '78 casos de prueba diseñados y mapeados a 16 riesgos de negocio en 15 módulos técnicos y funcionales.',
        'Implementación de 221 pruebas automatizadas en Vitest (26 suites en 5.84s) y 22 pruebas E2E en Playwright (5 suites en 6 viewports desde 320px hasta 1920px).',
        'Detección y documentación de hallazgos reales: Soft-404 por streaming en Next.js (DEF-001), overflow horizontal de 49px en viewport 320x568 (DEF-002) y mitigación de saturación en servidor de origen (INFRA-001).',
      ],
    },
    {
      project: 'Shoot Studio — Web Testing & Validación Headless REST API',
      role: 'Software QA & Test Designer (Caso de Estudio Técnico)',
      period: '2026',
      description:
        'Estructuración del plan de pruebas funcionales, navegación, contenido dinámico, integración WordPress REST API y validación multimedia.',
      achievements: [
        'Definición de escenarios de prueba para integridad de galerías multimedia, tiempos de respuesta REST y adaptación responsive.',
        'Documentación transparente de casos pendientes de ejecución automatizada siguiendo estándares de trazabilidad.',
      ],
    },
    {
      project: 'Supabase Authentication — API & Functional Security Testing',
      role: 'Software QA Engineer (Caso de Estudio Técnico)',
      period: '2026',
      description:
        'Diseño de suite de pruebas para flujos críticos de autenticación: registro, inicio de sesión, validación de formularios, persistencia de sesiones JWT y casos negativos.',
      achievements: [
        'Cobertura de escenarios positivos y negativos (credenciales inválidas, expiración de sesión, inyección en inputs y límites de tasa).',
      ],
    },
  ],
  careerObjectives: [
    'Integrarme a un equipo de ingeniería de software como QA Automation Engineer / Software QA o SDET Junior-Mid, aportando automatización mantenible y mentalidad preventiva desde el diseño.',
    'Reducir el escape de defectos a producción combinando pruebas unitarias/contractuales rápidas, flujos E2E estables en CI/CD y análisis riguroso de APIs y rendimiento.',
    'Continuar especializándome en arquitecturas cloud-native, observabilidad de pruebas y calidad continua en entornos ágiles.',
  ],
};
