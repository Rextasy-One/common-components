import { BRAND } from './brand';

export interface FooterProps {
  /** Copyright owner shown in the footer. Defaults to the shared BRAND constant. */
  owner?: string;
  /** Copyright year. Defaults to the current year. */
  year?: number;
}

/** Global site footer. Presentational and dependency-free. */
export function Footer({ owner = BRAND, year = new Date().getFullYear() }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-6 text-sm text-slate-500 sm:flex-row">
        <p>
          &copy; {year} {owner}. All rights reserved.
        </p>
        <p>Built with Next.js &amp; Tailwind CSS</p>
      </div>
    </footer>
  );
}
