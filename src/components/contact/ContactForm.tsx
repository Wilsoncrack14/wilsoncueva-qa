import React, { useState } from 'react';
import { validateContactForm } from '../../lib/validations';
import type { ContactFormPayload, ContactValidationErrors } from '../../types/portfolio';
import { profileData } from '../../data/profile';
import { Send, CheckCircle2, AlertCircle, Mail, Copy, Check } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormPayload>({
    fullName: '',
    email: '',
    companyOrRole: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [status, setStatus] = useState<'IDLE' | 'VALIDATING' | 'READY' | 'ERROR'>('IDLE');
  const [copied, setCopied] = useState<boolean>(false);

  const handleChange = (
    field: keyof ContactFormPayload,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (status === 'ERROR' || status === 'READY') {
      const nextPayload = { ...formData, [field]: value };
      const validation = validateContactForm(nextPayload);
      setErrors(validation.errors);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus('VALIDATING');

    const validation = validateContactForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      setStatus('ERROR');
      return;
    }

    setStatus('READY');
  };

  const buildMailtoHref = () => {
    const subjectEncoded = encodeURIComponent(
      `[Portafolio QA] ${formData.subject.trim()} — ${formData.fullName.trim()}`
    );
    const bodyLines = [
      `Nombre: ${formData.fullName.trim()}`,
      `Correo: ${formData.email.trim()}`,
      formData.companyOrRole.trim() ? `Empresa/Rol: ${formData.companyOrRole.trim()}` : '',
      '',
      'Mensaje:',
      formData.message.trim(),
    ]
      .filter(Boolean)
      .join('\n');

    return `mailto:${profileData.email}?subject=${subjectEncoded}&body=${encodeURIComponent(bodyLines)}`;
  };

  const handleCopyMessage = async () => {
    const formatted = `Para: ${profileData.email}\nDe: ${formData.fullName} <${formData.email}>\nAsunto: ${formData.subject}\n\n${formData.message}`;
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulario de contacto validado"
      className="rounded-2xl border border-border-subtle bg-surface p-6 sm:p-8 space-y-5"
    >
      <div className="space-y-1 border-b border-border-subtle pb-4">
        <span className="font-mono text-xs uppercase text-accent-lime">
          Validación de Entradas Estricta
        </span>
        <h2 className="text-xl font-bold text-text-primary">Envíame un mensaje directo</h2>
        <p className="text-xs text-text-secondary">
          Todos los campos marcados con * son validados antes de preparar el envío directo a{' '}
          <strong className="text-text-primary">{profileData.email}</strong>.
        </p>
      </div>

      {/* Error Alert Summary */}
      {status === 'ERROR' && Object.keys(errors).length > 0 && (
        <div
          role="alert"
          data-testid="contact-error-banner"
          className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-xs text-red-200 flex items-start gap-3"
        >
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="space-y-1">
            <p className="font-bold text-red-300">
              Por favor corrige los campos señalados antes de continuar:
            </p>
            <ul className="list-disc pl-4 space-y-0.5">
              {Object.values(errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Validated & Ready Alert (Honest no-fake-backend flow) */}
      {status === 'READY' && (
        <div
          role="status"
          data-testid="contact-success-banner"
          className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-5 text-xs text-emerald-200 space-y-3"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div className="space-y-1">
              <p className="font-bold text-sm text-emerald-300">
                ¡Formulario validado correctamente!
              </p>
              <p className="text-text-secondary leading-relaxed">
                Para mantener total transparencia técnica (este portafolio estático no utiliza un backend SMTP simulado), tu mensaje ha sido validado y estructurado. Elige cómo enviarlo ahora mismo:
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={buildMailtoHref()}
              className="inline-flex items-center gap-2 rounded-lg bg-accent-lime px-4 py-2 font-mono text-xs font-bold text-bg-primary hover:bg-accent-lime-dim transition"
            >
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              Abrir en cliente de correo ({profileData.email})
            </a>
            <button
              type="button"
              onClick={handleCopyMessage}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border-subtle bg-bg-secondary px-3.5 py-2 font-mono text-xs text-text-primary hover:border-accent-lime/50"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
                  Copiado al portapapeles
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-accent-lime" aria-hidden="true" />
                  Copiar mensaje estructurado
                </>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Nombre completo */}
        <div className="space-y-1.5">
          <label htmlFor="fullName" className="block font-mono text-xs text-text-primary">
            Nombre completo *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="Ej. Ana Torres"
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? 'error-fullName' : undefined}
            className={`w-full rounded-lg border bg-bg-primary px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none ${
              errors.fullName
                ? 'border-red-500 focus:border-red-400'
                : 'border-border-subtle focus:border-accent-lime'
            }`}
          />
          {errors.fullName && (
            <p id="error-fullName" className="text-xs text-red-400">
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Correo electrónico */}
        <div className="space-y-1.5">
          <label htmlFor="email" className="block font-mono text-xs text-text-primary">
            Correo electrónico *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="nombre@empresa.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'error-email' : undefined}
            className={`w-full rounded-lg border bg-bg-primary px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none ${
              errors.email
                ? 'border-red-500 focus:border-red-400'
                : 'border-border-subtle focus:border-accent-lime'
            }`}
          />
          {errors.email && (
            <p id="error-email" className="text-xs text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {/* Empresa / Rol (Opcional) */}
        <div className="space-y-1.5">
          <label htmlFor="companyOrRole" className="block font-mono text-xs text-text-primary">
            Empresa / Equipo (Opcional)
          </label>
          <input
            id="companyOrRole"
            name="companyOrRole"
            type="text"
            value={formData.companyOrRole}
            onChange={(e) => handleChange('companyOrRole', e.target.value)}
            placeholder="Ej. Tech Recruiter / Engineering Lead"
            className="w-full rounded-lg border border-border-subtle bg-bg-primary px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:border-accent-lime focus:outline-none"
          />
        </div>

        {/* Asunto */}
        <div className="space-y-1.5">
          <label htmlFor="subject" className="block font-mono text-xs text-text-primary">
            Asunto *
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            required
            value={formData.subject}
            onChange={(e) => handleChange('subject', e.target.value)}
            placeholder="Oportunidad QA Automation / Consulta técnica"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={errors.subject ? 'error-subject' : undefined}
            className={`w-full rounded-lg border bg-bg-primary px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none ${
              errors.subject
                ? 'border-red-500 focus:border-red-400'
                : 'border-border-subtle focus:border-accent-lime'
            }`}
          />
          {errors.subject && (
            <p id="error-subject" className="text-xs text-red-400">
              {errors.subject}
            </p>
          )}
        </div>
      </div>

      {/* Mensaje */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block font-mono text-xs text-text-primary">
          Mensaje * (mínimo 20 caracteres)
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          placeholder="Cuéntame sobre el puesto, proyecto o prueba técnica que deseas conversar..."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'error-message' : undefined}
          className={`w-full rounded-lg border bg-bg-primary px-3.5 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 focus:outline-none ${
            errors.message
              ? 'border-red-500 focus:border-red-400'
              : 'border-border-subtle focus:border-accent-lime'
          }`}
        />
        {errors.message && (
          <p id="error-message" className="text-xs text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <span className="font-mono text-[11px] text-text-secondary">
          Estado: {status === 'READY' ? 'Validado y listo para envío' : status === 'ERROR' ? 'Requiere corrección' : 'Esperando datos'}
        </span>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-accent-lime px-6 py-3 text-sm font-bold text-bg-primary transition hover:bg-accent-lime-dim focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-lime"
        >
          <Send className="h-4 w-4" aria-hidden="true" />
          Validar y preparar envío
        </button>
      </div>
    </form>
  );
}
