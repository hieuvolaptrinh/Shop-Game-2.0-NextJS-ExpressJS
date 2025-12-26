import { format, formatDistance, formatDistanceToNow, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';
import { APP_CONFIG } from '@/constants/config';

/**
 * Format date to string
 */
export function formatDate(
  date: string | Date,
  formatStr: string = APP_CONFIG.DATE_FORMAT.DEFAULT
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr, { locale: vi });
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, APP_CONFIG.DATE_FORMAT.WITH_TIME);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: vi });
}

/**
 * Format distance between two dates
 */
export function formatDateDistance(dateLeft: string | Date, dateRight: string | Date): string {
  const left = typeof dateLeft === 'string' ? parseISO(dateLeft) : dateLeft;
  const right = typeof dateRight === 'string' ? parseISO(dateRight) : dateRight;
  return formatDistance(left, right, { locale: vi });
}
