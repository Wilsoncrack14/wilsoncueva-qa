interface TechLogoProps {
  id: string;
  className?: string;
}

export default function TechLogo({ id, className = 'h-5 w-5' }: TechLogoProps) {
  switch (id.toLowerCase()) {
    case 'playwright':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          {/* Left Red Mask */}
          <path
            d="M4 8.5C4 6.5 7 5 10.5 6C14 7 15.5 9.5 14.5 14.5C13.5 19.5 10 22.5 6.5 21.5C3.5 20.5 4 13.5 4 8.5Z"
            fill="#E2574C"
          />
          <circle cx="7.5" cy="11.5" r="1.3" fill="#080B0A" />
          <circle cx="11.5" cy="12.5" r="1.3" fill="#080B0A" />
          <path
            d="M6.8 16.5C8 15.2 9.8 15.5 10.8 17"
            stroke="#080B0A"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Right Green Mask */}
          <path
            d="M15 7.5C15.5 5.2 19.5 4.2 23.5 5.5C27.5 6.8 29 10 27.5 16.5C26 23 21.5 26.5 17 25C13 23.5 14 13 15 7.5Z"
            fill="#2EAD33"
          />
          <circle cx="19" cy="11.5" r="1.5" fill="#080B0A" />
          <circle cx="24" cy="12.5" r="1.5" fill="#080B0A" />
          <path
            d="M18 16.8C19.5 19.2 22.5 19.5 24.2 17.5"
            stroke="#080B0A"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'typescript':
    case 'ts':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="28" height="28" rx="4" fill="#3178C6" />
          <path
            d="M7.5 15.5H16.5V18H13.3V26.5H10.5V18H7.5V15.5ZM24.4 18.2C23.7 17.7 22.8 17.5 21.9 17.5C20.9 17.5 20.3 17.9 20.3 18.5C20.3 19.2 21 19.5 22.4 20C24.5 20.7 25.6 21.7 25.6 23.5C25.6 25.5 23.9 26.8 21.4 26.8C19.8 26.8 18.3 26.3 17.4 25.6L18.5 23.4C19.3 24 20.4 24.4 21.4 24.4C22.4 24.4 23 24 23 23.4C23 22.7 22.3 22.4 20.8 21.9C18.9 21.2 17.8 20.3 17.8 18.6C17.8 16.6 19.4 15.3 21.9 15.3C23.3 15.3 24.5 15.6 25.4 16.1L24.4 18.2Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'javascript':
    case 'js':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <rect x="2" y="2" width="28" height="28" rx="4" fill="#F7DF1E" />
          <path
            d="M15.2 23.2C15.2 25.5 13.8 26.8 11.5 26.8C9.8 26.8 8.6 26 8 24.9L10.1 23.6C10.4 24.2 10.8 24.6 11.5 24.6C12.2 24.6 12.6 24.2 12.6 23.1V15.5H15.2V23.2ZM22.4 26.8C20.3 26.8 18.8 25.9 18 24.5L20.1 23.3C20.6 24.2 21.3 24.6 22.4 24.6C23.4 24.6 24 24.1 24 23.4C24 22.6 23.3 22.3 21.9 21.7C19.8 20.8 18.5 19.9 18.5 18C18.5 16.1 20 14.8 22.3 14.8C24 14.8 25.3 15.4 26 16.8L24 18.1C23.6 17.3 23 17 22.3 17C21.5 17 21 17.4 21 18C21 18.7 21.6 19 23.1 19.6C25.2 20.5 26.6 21.4 26.6 23.4C26.6 25.6 24.8 26.8 22.4 26.8Z"
            fill="#000000"
          />
        </svg>
      );

    case 'python':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            d="M15.8 3C10.5 3 10.8 5.3 10.8 5.3V8H16V9H8.6C8.6 9 5 8.6 5 14.2C5 19.8 8.1 19.6 8.1 19.6H10V16.8C10 16.8 9.9 13.7 13 13.7H18.5C18.5 13.7 21.4 13.8 21.4 10.9V5.9C21.4 5.9 21.8 3 15.8 3ZM13 5C13.6 5 14 5.4 14 6C14 6.6 13.6 7 13 7C12.4 7 12 6.6 12 6C12 5.4 12.4 5 13 5Z"
            fill="#3776AB"
          />
          <path
            d="M16.2 29C21.5 29 21.2 26.7 21.2 26.7V24H16V23H23.4C23.4 23 27 23.4 27 17.8C27 12.2 23.9 12.4 23.9 12.4H22V15.2C22 15.2 22.1 18.3 19 18.3H13.5C13.5 18.3 10.6 18.2 10.6 21.1V26.1C10.6 26.1 10.2 29 16.2 29ZM19 27C18.4 27 18 26.6 18 26C18 25.4 18.4 25 19 25C19.6 25 20 25.4 20 26C20 26.6 19.6 27 19 27Z"
            fill="#FFD43B"
          />
        </svg>
      );

    case 'java':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            d="M12.5 22.5C12.5 22.5 10.8 23.5 13.7 23.8C17.2 24.2 19 23.5 22.8 22.2C22.8 22.2 23.8 23 25.2 23.6C16.8 27.2 6.2 23.4 12.5 22.5ZM11.5 18.5C11.5 18.5 9.6 19.9 12.5 20.2C16.2 20.6 19.1 20.3 24.1 18.7C24.1 18.7 24.8 19.4 25.9 19.8C15.9 22.7 4.8 20 11.5 18.5Z"
            fill="#5382A1"
          />
          <path
            d="M18.2 14.2C20.2 11.9 17.7 9.8 17.7 9.8C17.7 9.8 22.4 12.2 19.7 15.2C18.1 17 15.3 18 19.7 20C19.7 20 13.7 18.2 18.2 14.2ZM14.5 3.5C14.5 3.5 18.8 6.9 13.6 11.8C10 15.1 12.8 17 12.8 17C12.8 17 8.4 14.5 11.2 11.1C13.7 8.1 16.5 6.6 14.5 3.5Z"
            fill="#E76F00"
          />
          <path
            d="M9.5 26.8C16.2 28.2 26.5 26.5 26.8 24.2C26.8 24.2 26 25.4 20.8 26C15 26.7 8.2 26.2 9.5 26.8Z"
            fill="#5382A1"
          />
        </svg>
      );

    case 'postman':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="13" fill="#FF6C37" />
          <path
            d="M21.8 10.2L11.5 16.8L14.5 18.2L21.8 10.2ZM14.8 18.6L16.2 21.5L22.2 10.6L14.8 18.6Z"
            fill="#FFFFFF"
          />
          <path
            d="M10.2 16.2L22 10L16 21.8L14.2 18L10.2 16.2Z"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'jmeter':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            d="M25.5 4.5C20 6.5 14 12.5 10.5 19.5L7 26.5L9.5 27.5L12.5 21.5C16.5 21 20.5 18 23.5 13.5C25.5 10.5 26.5 7 25.5 4.5Z"
            fill="url(#jmeterFeather)"
          />
          <path
            d="M8.2 26.8L24.5 5.8"
            stroke="#FFFFFF"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="jmeterFeather" x1="7" y1="27" x2="26" y2="4" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6B21A8" />
              <stop offset="50%" stopColor="#D22128" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'nextjs':
    case 'next.js':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="13" fill="#000000" stroke="#FFFFFF" strokeWidth="1.5" />
          <path
            d="M11.5 21.5V10.5H13.5L21.5 21.5H19.5L13.5 13.2V21.5H11.5ZM19.5 10.5H21.3V17.5L19.5 15V10.5Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'react':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="2.6" fill="#61DAFB" />
          <ellipse cx="16" cy="16" rx="12" ry="4.6" stroke="#61DAFB" strokeWidth="1.6" />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.6"
            transform="rotate(60 16 16)"
            stroke="#61DAFB"
            strokeWidth="1.6"
          />
          <ellipse
            cx="16"
            cy="16"
            rx="12"
            ry="4.6"
            transform="rotate(120 16 16)"
            stroke="#61DAFB"
            strokeWidth="1.6"
          />
        </svg>
      );

    case 'docker':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <rect x="7" y="13" width="3.2" height="3" rx="0.4" fill="#2496ED" />
          <rect x="11" y="13" width="3.2" height="3" rx="0.4" fill="#2496ED" />
          <rect x="15" y="13" width="3.2" height="3" rx="0.4" fill="#2496ED" />
          <rect x="19" y="13" width="3.2" height="3" rx="0.4" fill="#2496ED" />
          <rect x="11" y="9.2" width="3.2" height="3" rx="0.4" fill="#2496ED" />
          <rect x="15" y="9.2" width="3.2" height="3" rx="0.4" fill="#2496ED" />
          <rect x="15" y="5.4" width="3.2" height="3" rx="0.4" fill="#2496ED" />
          <path
            d="M28.5 15.2C27.4 14.5 25.6 14.4 24.4 14.8C24.1 13.4 23.1 12.4 22.1 11.9L21.6 11.6L21.3 12.1C20.7 13.1 20.6 14.7 21.1 15.8C20.5 16.1 19.4 16.5 18 16.5H4.2C3.8 19.2 4.6 22.4 6.8 24.4C8.9 26.2 12 27 15.8 27C21.8 27 26.2 24.2 28 19.2C29.2 19.2 30.5 18.9 31.1 17.6L31.3 17.1L28.5 15.2Z"
            fill="#2496ED"
          />
        </svg>
      );

    case 'github':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M16 3C8.82 3 3 8.82 3 16C3 21.75 6.72 26.62 11.89 28.34C12.54 28.46 12.78 28.06 12.78 27.72C12.78 27.41 12.77 26.59 12.76 25.51C9.15 26.29 8.39 23.77 8.39 23.77C7.8 22.27 6.95 21.87 6.95 21.87C5.77 21.07 7.04 21.09 7.04 21.09C8.34 21.18 9.03 22.43 9.03 22.43C10.19 24.42 12.07 23.84 12.81 23.51C12.93 22.67 13.26 22.1 13.63 21.77C10.75 21.44 7.72 20.33 7.72 15.35C7.72 13.93 8.23 12.77 9.06 11.86C8.93 11.53 8.48 10.2 9.19 8.4C9.19 8.4 10.28 8.05 12.76 9.73C13.8 9.44 14.9 9.3 16 9.29C17.1 9.3 18.2 9.44 19.24 9.73C21.72 8.05 22.81 8.4 22.81 8.4C23.52 10.2 23.07 11.53 22.94 11.86C23.77 12.77 24.28 13.93 24.28 15.35C24.28 20.34 21.24 21.44 18.35 21.76C18.82 22.16 19.23 22.96 19.23 24.19C19.23 25.95 19.21 27.36 19.21 27.72C19.21 28.06 19.45 28.47 20.11 28.34C25.28 26.61 29 21.75 29 16C29 8.82 23.18 3 16 3Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'cloudflare':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            d="M22.8 21.5H8.2C5.9 21.5 4 19.7 4 17.4C4 15.3 5.6 13.6 7.7 13.3C8.4 9.7 11.6 7 15.4 7C19.4 7 22.7 9.9 23.2 13.8C23.6 13.7 24 13.6 24.4 13.6C26.9 13.6 29 15.4 29 17.6C29 19.8 25.3 21.5 22.8 21.5Z"
            fill="#F38020"
          />
          <path
            d="M24.8 14C24.4 14 24 14.1 23.6 14.2C23.1 11.6 21 9.6 18.3 9.3C21.5 9.8 23.9 12.5 23.9 15.8V16.3C25.9 16.5 27.5 18 27.5 20C27.5 20.5 27.4 21 27.2 21.5H27.6C29.5 21.5 31 19.9 31 18C31 15.8 27.2 14 24.8 14Z"
            fill="#FAAE40"
          />
        </svg>
      );

    case 'wordpress':
    case 'wp':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <circle cx="16" cy="16" r="13" stroke="#FFFFFF" strokeWidth="1.6" fill="#151B18" />
          <path
            d="M6.8 16C6.8 19.6 8.9 22.7 12 24.2L7.6 12.2C7.1 13.4 6.8 14.7 6.8 16ZM22.2 15.5C22.2 14.3 21.8 13.4 21.4 12.7C20.9 11.9 20.4 11.2 20.4 10.4C20.4 9.5 21.1 8.6 22.1 8.6H22.3C20.7 7.1 18.5 6.2 16 6.2C12.6 6.2 9.6 7.9 7.9 10.6H9.2C10.3 10.6 12 10.5 12 10.5C12.6 10.5 12.7 11.3 12.1 11.4C12.1 11.4 11.5 11.5 10.8 11.5L14.8 23.4L17.2 16.2L15.5 11.5C14.9 11.5 14.3 11.4 14.3 11.4C13.7 11.3 13.8 10.5 14.4 10.5C14.4 10.5 16.1 10.6 17.2 10.6C18.3 10.6 20 10.5 20 10.5C20.6 10.5 20.7 11.3 20.1 11.4C20.1 11.4 19.5 11.5 18.8 11.5L22.7 23.3L23.8 19.6C24.3 18 22.2 16.6 22.2 15.5ZM16.2 16.8L12.9 26.3C13.9 26.6 14.9 26.8 16 26.8C17.3 26.8 18.5 26.6 19.6 26.1L16.2 16.8ZM24.2 11.4C24.4 12 24.5 12.7 24.5 13.6C24.5 14.9 24.1 16.5 23.3 18.4L20.3 27.1C23.8 25.1 26.2 21.3 26.2 17C26.2 14.9 25.5 13 24.2 11.4Z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'supabase':
      return (
        <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden="true">
          <path
            d="M18.2 28.4C17.4 29.4 15.8 28.8 15.8 27.5V17.5H26.2C27.5 17.5 28.2 19 27.4 20L18.2 28.4Z"
            fill="#249361"
          />
          <path
            d="M13.8 3.6C14.6 2.6 16.2 3.2 16.2 4.5V14.5H5.8C4.5 14.5 3.8 13 4.6 12L13.8 3.6Z"
            fill="#3ECF8E"
          />
        </svg>
      );

    default:
      return null;
  }
}
