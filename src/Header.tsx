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
  /** Optional slot rendered on the right (auth buttons, theme switch, ...). */
  actions?: ReactNode;
}

const DEFAULT_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: ROUTES.home },
  { label: 'Dashboard', href: ROUTES.dashboard },
  { label: 'Resume', href: ROUTES.resume },
];

/**
 * Global site header. Presentational and dependency-free so any source repo can render
 * it inside its own layout.
 */
export function Header({ brand = BRAND, items = DEFAULT_ITEMS, actions }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4"
      >
        <a href={ROUTES.home} className="text-lg font-semibold tracking-tight text-slate-900">
          {brand}
        </a>
        <ul className="flex items-center gap-6 text-sm text-slate-600">
          {items.map((item) => (
            <li key={item.href}>
              {item.external ? (
                <a
                  className="transition-colors hover:text-slate-900"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {item.label}
                </a>
              ) : (
                <a className="transition-colors hover:text-slate-900" href={item.href}>
                  {item.label}
                </a>
              )}
            </li>
          ))}
        </ul>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </nav>
    </header>
  );
}
