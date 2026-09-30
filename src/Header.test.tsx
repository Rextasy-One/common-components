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
});
