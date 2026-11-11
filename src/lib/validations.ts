import type { ContactFormPayload, ContactValidationErrors } from '../types/portfolio';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactForm(payload: ContactFormPayload): {
  isValid: boolean;
  errors: ContactValidationErrors;
} {
  const errors: ContactValidationErrors = {};

  const fullName = payload.fullName.trim();
  const email = payload.email.trim();
  const subject = payload.subject.trim();
  const message = payload.message.trim();

  if (!fullName) {
    errors.fullName = 'El nombre completo es obligatorio.';
  } else if (fullName.length < 3) {
    errors.fullName = 'Ingresa al menos 3 caracteres para el nombre.';
  } else if (fullName.length > 80) {
    errors.fullName = 'El nombre no debe exceder 80 caracteres.';
  }

  if (!email) {
    errors.email = 'El correo electrónico es obligatorio.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Ingresa un formato de correo electrónico válido (ejemplo@dominio.com).';
  }

  if (!subject) {
    errors.subject = 'El asunto del mensaje es obligatorio.';
  } else if (subject.length < 5) {
    errors.subject = 'El asunto debe contener al menos 5 caracteres.';
  }

  if (!message) {
    errors.message = 'El mensaje es obligatorio.';
  } else if (message.length < 20) {
    errors.message = 'Detalla tu consulta con al menos 20 caracteres.';
  } else if (message.length > 1500) {
    errors.message = 'El mensaje no debe superar los 1500 caracteres.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
