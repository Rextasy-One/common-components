/**
 * Canonical brand name for every Rex Staples site.
 * Single source of truth so `Header` and `Footer` never drift.
 */
export const BRAND = 'Rex Staples';

/**
 * Canonical set of internal site routes. `Resume` is used by consumers to
 * suppress the link until a resume page exists.
 */
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  resume: '/resume',
} as const;
