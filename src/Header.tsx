import type { ReactNode } from 'react';

export interface NavItem {
  /** Visible link label. */
  label: string;
  /** Destination URL. */
  href: string;
}

export interface HeaderProps {
  /** Brand name rendered on the left. */
  brand?: string;
  /** Primary navigation entries. */
  items?: readonly NavItem[];
  /** Optional slot rendered on the right (auth buttons, theme switch, ...). */
  actions?: ReactNode;
}

const DEFAULT_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
];

/**
 * Global site header. Presentational and dependency-free so any source repo can render
 * it inside its own layout.
 */
export function Header({ brand = 'Aws Rex', items = DEFAULT_ITEMS, actions }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4"
      >
        <a href="/" className="text-lg font-semibold tracking-tight text-slate-900">
          {brand}
        </a>
        <ul className="flex items-center gap-6 text-sm text-slate-600">
          {items.map((item) => (
            <li key={item.href}>
              <a className="transition-colors hover:text-slate-900" href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </nav>
    </header>
  );
}
