import type { ReactNode } from 'react';
import { BRAND, ROUTES } from './brand';

export interface NavItem {
  /** Visible link label. */
  label: string;
  /** Destination URL. */
  href: string;
  /** Render as a link to another origin (opens in a new tab with a safe rel). */
  external?: boolean;
}

export interface HeaderProps {
  /** Brand name rendered on the left. Defaults to the shared BRAND constant. */
  brand?: string;
  /** Primary navigation entries. */
  items?: readonly NavItem[];
  /**
   * Current pathname, used to mark the active item. Supplied by the consumer
   * because this package must stay framework-agnostic — a Next app passes
   * `usePathname()` from a small client wrapper.
   */
  activeHref?: string;
  /** Optional slot rendered on the right (auth buttons, theme switch, ...). */
  actions?: ReactNode;
}

const DEFAULT_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Dashboard', href: ROUTES.dashboard },
  { label: 'Resume', href: ROUTES.resume },
];

/**
 * A nav item is active when it is the current path or an ancestor of it, so
 * `/dashboard/settings` also lights up `/dashboard`. `/` only matches itself.
 */
function isActive(item: NavItem, activeHref: string | undefined): boolean {
  if (!activeHref || item.external) return false;
  if (item.href === '/') return activeHref === '/';
  return activeHref === item.href || activeHref.startsWith(`${item.href}/`);
}

const LINK_BASE = 'border-b-2 pb-0.5 transition-colors';

/**
 * Global site header. Presentational and dependency-free so any source repo can render
 * it inside its own layout.
 */
export function Header({ brand = BRAND, items = DEFAULT_ITEMS, activeHref, actions }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4"
      >
        <a href={ROUTES.home} className="text-lg font-semibold tracking-tight text-slate-900">
          {brand}
        </a>
        <ul className="flex items-center gap-6 text-sm">
          {items.map((item) => {
            const active = isActive(item, activeHref);
            const className = [
              LINK_BASE,
              active
                ? 'border-slate-900 font-medium text-slate-900'
                : 'border-transparent text-slate-600 hover:text-slate-900',
            ].join(' ');

            return (
              <li key={item.href}>
                <a
                  className={className}
                  href={item.href}
                  {...(item.external
                    ? { target: '_blank', rel: 'noreferrer noopener' }
                    : { 'aria-current': active ? 'page' : undefined })}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </nav>
    </header>
  );
}
