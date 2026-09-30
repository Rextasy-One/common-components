/**
 * Canonical brand name for every Rex Staples site.
 * Single source of truth so `Header` and `Footer` never drift.
 */
export const BRAND = 'Rex Staples';

/**
 * Canonical site destinations. All relative: the marketing site proxies
 * `/dashboard` to the dashboard app (see its `next.config.ts`), so no consumer
 * needs to know which port or origin the dashboard runs on.
 */
export const ROUTES = {
  home: '/',
  dashboard: '/dashboard',
  resume: '/resume',
} as const;
