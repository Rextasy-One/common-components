import { render, screen } from '@testing-library/react';
import { BRAND } from './brand';
import { Footer } from './Footer';

describe('<Footer />', () => {
  it('renders the contentinfo landmark with the shared brand and current year', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      `© ${new Date().getFullYear()} ${BRAND}`,
    );
  });

  it('honours an explicit owner and year', () => {
    render(<Footer owner="Acme Inc." year={1999} />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent('© 1999 Acme Inc.');
  });
});
