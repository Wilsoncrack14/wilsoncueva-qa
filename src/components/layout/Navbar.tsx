import { useState, useEffect } from 'react';
import { Menu, X, Download, ArrowUpRight } from 'lucide-react';
import { profileData } from '../../data/profile';

interface NavbarProps {
  currentPath?: string;
}

// Streamlined primary navigation: 3 core destinations to avoid visual clutter
const PRIMARY_NAV_ITEMS = [
  { label: 'Inicio', href: '/' },
  { label: 'Proyectos', href: '/projects' },
  { label: 'Evidencias', href: '/evidence' },
] as const;

const SECONDARY_NAV_ITEMS = [
  { label: 'Sobre mí', href: '/about' },
  { label: 'Contacto', href: '/contact' },
] as const;

export default function Navbar({ currentPath = '/' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') return currentPath === '/';
    return currentPath === href || currentPath.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-bg-primary/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Brand: Minimalist WC badge + Wilson Cueva */}
        <a
          href="/"
          aria-label="Wilson Cueva — Inicio"
          className="group flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] bg-surface font-mono text-xs font-bold tracking-wider text-accent-lime transition group-hover:border-accent-lime/40">
            {profileData.initials}
          </span>
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold tracking-tight text-text-primary">
              {profileData.name}
            </span>
            <span className="hidden sm:inline-block h-3.5 w-px bg-white/[0.1]" aria-hidden="true" />
            <span className="hidden sm:inline-block font-mono text-[11px] text-text-secondary">
              QA Automation
            </span>
          </div>
        </a>

        {/* Center Pill Navigation (Only 4 primary items for clean UX) */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.07] bg-bg-secondary/90 p-1"
        >
          {PRIMARY_NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60 ${
                  active
                    ? 'bg-white/[0.09] text-text-primary shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {active && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-accent-lime"
                    aria-hidden="true"
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Sobre mí + Contacto + Subtle CV Download */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="/about"
            className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isActive('/about')
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Sobre mí
          </a>

          <a
            href="/contact"
            className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
              isActive('/contact')
                ? 'text-text-primary'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span>Contacto</span>
            <ArrowUpRight className="h-3 w-3 opacity-60" aria-hidden="true" />
          </a>

          <span className="mx-1 h-4 w-px bg-white/[0.08]" aria-hidden="true" />

          <a
            href={profileData.cvUrl}
            download="Wilson_Cueva_CV_QA_Automation.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-surface px-3 py-1.5 text-xs font-medium text-text-primary transition hover:border-accent-lime/40 hover:text-accent-lime focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime/60"
          >
            <Download className="h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile menu controls */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href={profileData.cvUrl}
            download="Wilson_Cueva_CV_QA_Automation.pdf"
            className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-surface px-2.5 py-1.5 text-xs font-medium text-text-primary"
          >
            <Download className="h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
            <span>CV</span>
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-surface text-text-primary hover:border-white/[0.2] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Navegación móvil"
          className="border-t border-white/[0.06] bg-bg-secondary px-4 py-4 md:hidden"
        >
          <ul className="grid grid-cols-2 gap-1.5">
            {[...PRIMARY_NAV_ITEMS, ...SECONDARY_NAV_ITEMS].map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
                      active
                        ? 'border border-white/[0.1] bg-surface text-text-primary'
                        : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                    }`}
                  >
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-accent-lime" />}
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
