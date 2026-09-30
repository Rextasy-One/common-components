import { render, screen } from '@testing-library/react';
import { Footer } from './Footer';

describe('<Footer />', () => {
  it('renders the contentinfo landmark with the default owner and current year', () => {
    render(<Footer />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent(
      `© ${new Date().getFullYear()} Aws Rex`,
    );
  });

  it('honours an explicit owner and year', () => {
    render(<Footer owner="Acme Inc." year={1999} />);

    expect(screen.getByRole('contentinfo')).toHaveTextContent('© 1999 Acme Inc.');
  });
});
