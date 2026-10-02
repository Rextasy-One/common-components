/**
 * Canonical brand name for every Rex Staples site.
 * Single source of truth so `Header` and `Footer` never drift.
 */
export const BRAND = 'Rex Staples';

/**
 * Canonical site destinations. All relative: the marketing site proxies
 * `/dashboard` to the dashboard app (see its `next.config.ts`), so no consumer
 * needs to know which port or origin the dashboard runs on.
 *
 * There is intentionally no `home` route: the brand wordmark in the header is the
 * way back to the root, so a redundant "Home" nav item is not needed.
 */
export const ROUTES = {
  dashboard: '/dashboard',
  resume: '/resume',
  login: '/login',
} as const;
