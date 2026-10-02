import { render, screen } from '@testing-library/react';
import { BRAND } from './brand';
import { Header } from './Header';

describe('<Header />', () => {
  it('renders a banner landmark with the shared brand and default navigation', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: BRAND })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute('href', '/resume');
  });

  it('renders a custom brand, navigation items and action slot', () => {
    render(
      <Header
        brand="Acme"
        items={[{ label: 'Docs', href: '/docs' }]}
        actions={<button type="button">Sign in</button>}
      />,
    );

    expect(screen.getByRole('link', { name: 'Acme' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs');
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('opens external links in a new tab with a safe rel', () => {
    render(<Header items={[{ label: 'GitHub', href: 'https://example.com', external: true }]} />);

    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer noopener');
  });

  it('marks the active route with aria-current', () => {
    render(<Header activeHref="/resume" />);

    expect(screen.getByRole('link', { name: 'Resume' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Dashboard' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('marks an ancestor route as active for nested paths', () => {
    render(<Header activeHref="/dashboard/settings" />);

    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('aria-current', 'page');
  });

  it('never marks "/" active for a nested path', () => {
    render(<Header activeHref="/dashboard" />);

    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });

  it('never marks external items active', () => {
    render(
      <Header activeHref="/docs" items={[{ label: 'Docs', href: '/docs', external: true }]} />,
    );

    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
  });

  it('marks nothing active when no pathname is supplied', () => {
    render(<Header />);

    for (const label of ['Home', 'Dashboard', 'Resume']) {
      expect(screen.getByRole('link', { name: label })).not.toHaveAttribute('aria-current');
    }
  });
});
