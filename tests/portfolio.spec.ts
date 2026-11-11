import { test, expect } from './pages/PortfolioPage';

const REQUIRED_VIEWPORTS = [
  { width: 360, height: 800 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
] as const;

test.describe('Portafolio QA Automation — Wilson Cueva E2E Suite', () => {
  test('1. Landing Page renderiza identidad, terminal Playwright, 12 tecnologías y 3 proyectos destacados (Wireframe 01)', async ({
    portfolioPage,
    page,
  }) => {
    const consoleErrors: string[] = [];
    page.on('pageerror', (err) => consoleErrors.push(err.message));

    await portfolioPage.goto('/');
    await expect(portfolioPage.mainHeading).toContainText('Wilson Cueva');
    await expect(page.getByText('QA Automation Engineer / Software QA').first()).toBeVisible();
    await expect(page.getByText('Lima, Perú').first()).toBeVisible();

    // Terminal demo
    await expect(page.getByText('npx playwright test')).toBeVisible();
    await expect(page.getByText('All tests passed in 12.1s')).toBeVisible();

    // 12 Tecnologías y 3 Proyectos destacados
    await expect(page.getByRole('heading', { name: /Tecnologías que utilizo/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Proyectos destacados/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Hotel Asturias/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Shoot Studio/i }).first()).toBeVisible();
    await expect(page.getByRole('heading', { name: /Supabase Auth/i }).first()).toBeVisible();

    expect(consoleErrors).toHaveLength(0);
  });

  test('2. Navegación principal y renderizado de todas las rutas (/projects, /dashboard, /evidence, /about, /contact)', async ({
    portfolioPage,
    page,
  }) => {
    const routes = [
      { path: '/projects', heading: /Casos de estudio/i },
      { path: '/projects/hotel-asturias', heading: /Hotel Asturias — QA Automation/i },
      { path: '/projects/hotel-asturias/report', heading: /Hotel Asturias — Reporte de Auditoría QA/i },
      { path: '/projects/shoot-studio', heading: /Shoot Studio — Web Testing/i },
      { path: '/projects/supabase-auth', heading: /Supabase Auth — API & Functional Testing/i },
      { path: '/dashboard', heading: /Resultados de pruebas/i },
      { path: '/evidence', heading: /Automatización y resultados/i },
      { path: '/about', heading: /Wilson Cueva/i },
      { path: '/contact', heading: /Conversemos sobre Calidad y Automatización/i },
    ];

    for (const r of routes) {
      const response = await page.goto(r.path, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `Status 200 esperado en ${r.path}`).toBe(200);
      await expect(portfolioPage.mainHeading).toContainText(r.heading);
    }
  });

  test('3. Validación responsive Mobile-First (360px, 390px, 768px, 1024px, 1440px, 1920px) sin scroll horizontal', async ({
    portfolioPage,
    page,
  }) => {
    test.setTimeout(60000);
    const pathsToCheck = ['/', '/projects', '/dashboard', '/evidence', '/contact'];

    for (const vp of REQUIRED_VIEWPORTS) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const path of pathsToCheck) {
        await portfolioPage.goto(path);
        await portfolioPage.verifyNoHorizontalOverflow(vp.width);
      }
    }
  });

  test('4. Descarga de CV y verificación de enlaces externos', async ({
    portfolioPage,
    page,
    request,
  }) => {
    await portfolioPage.goto('/');

    const cvLink = page.locator('a[download]').first();
    await expect(cvLink).toHaveAttribute('href', '/CV_Wilson_Cueva_QA_Automation.pdf');

    const pdfResponse = await request.get('/CV_Wilson_Cueva_QA_Automation.pdf');
    expect(pdfResponse.status()).toBe(200);
    const bodyText = await pdfResponse.text();
    expect(bodyText.startsWith('%PDF')).toBe(true);

    // Enlaces externos en /contact
    await portfolioPage.goto('/contact');
    await expect(page.locator('a[href*="github.com/Wilsoncrack14"]').first()).toBeVisible();
    await expect(page.locator('a[href*="linkedin.com"]').first()).toBeVisible();
  });

  test('5. Filtros del QA Dashboard integrado en el Reporte del Proyecto e inspección de ejecución', async ({
    portfolioPage,
    page,
  }) => {
    await portfolioPage.goto('/projects/hotel-asturias/report');

    await expect(page.getByTestId('kpi-total')).toContainText('243');
    await expect(page.getByTestId('kpi-pass-rate')).toContainText('100%');
    await expect(page.getByText('#HA-ALL-31')).toBeVisible();

    // Abrir modal de reporte
    const reportBtn = page.getByRole('button', { name: /Consultar reporte #HA-ALL-31/i });
    await reportBtn.click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByText(/Reporte de Ejecución — Hotel Asturias/i)).toBeVisible();

    // Cerrar modal
    await page.getByRole('button', { name: /Cerrar ventana/i }).first().click();
    await expect(page.getByRole('dialog')).toBeHidden();
  });

  test('6. Interacción de pestañas y Bento Grid en Evidencias Técnicas (Wireframe 04)', async ({
    portfolioPage,
    page,
  }) => {
    await portfolioPage.goto('/evidence');

    await expect(page.getByText('tests/e2e/booking.spec.ts')).toBeVisible();
    await expect(page.getByText('/wp-json/wp/v2/habitaciones')).toBeVisible();

    await page.getByRole('tab', { name: /API Testing/i }).click();
    await expect(page.getByText('/api/revalidate · /api/reviews · /api/tour/[id]')).toBeVisible();

    await page.getByRole('tab', { name: /JMeter \(Performance\)/i }).click();
    await expect(page.getByText(/INFRA-001/i)).toBeVisible();

    await page.getByRole('tab', { name: /CI\/CD \(GitHub Actions\)/i }).click();
    await expect(page.getByText(/\.github\/workflows\/playwright\.yml/i)).toBeVisible();
  });

  test('7. Validación estricta del Formulario de Contacto (estados de error y éxito)', async ({
    portfolioPage,
    page,
  }) => {
    await portfolioPage.goto('/contact');

    const submitButton = page.getByRole('button', { name: /Validar y preparar envío/i });
    await submitButton.click();

    await expect(page.getByTestId('contact-error-banner')).toBeVisible();
    await expect(page.getByText('El nombre completo es obligatorio.').first()).toBeVisible();

    await page.getByLabel(/Nombre completo/i).fill('Carlos Mendoza');
    await page.getByLabel(/Correo electrónico/i).fill('carlos.mendoza@techcorp.pe');
    await page.getByLabel(/Asunto/i).fill('Proceso QA Automation Engineer');
    await page
      .getByLabel(/Mensaje/i)
      .fill(
        'Hola Wilson, revisamos tu portafolio y nos gustaría agendar una entrevista técnica esta semana.'
      );

    await submitButton.click();

    await expect(page.getByTestId('contact-success-banner')).toBeVisible();
    await expect(page.getByText('¡Formulario validado correctamente!')).toBeVisible();
  });
});
