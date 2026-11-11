import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  if (seconds <= 0) return '0.0s';
  if (seconds < 60) return `${seconds.toFixed(1)}s`;
  const mins = Math.floor(seconds / 60);
  const rem = (seconds % 60).toFixed(0);
  return `${mins}m ${rem}s`;
}

export function calculatePassRate(passed: number, total: number): number {
  if (total <= 0) return 0;
  return Number(((passed / total) * 100).toFixed(1));
}
