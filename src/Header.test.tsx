import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('<Header />', () => {
  it('renders a banner landmark with the default brand and primary navigation', () => {
    render(<Header />);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Rextasy One' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
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
});
