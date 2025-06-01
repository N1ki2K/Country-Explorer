import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../../src/components/CountryCard';

const mockCountry = {
  code: 'US',
  name: 'United States',
  capital: 'Washington D.C.',
  continent: { name: 'North America' },
  languages: [{ name: 'English' }],
  currency: 'USD',
  emoji: '🇺🇸'
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Washington D.C.')).toBeInTheDocument();
    expect(screen.getByText('North America')).toBeInTheDocument();
    expect(screen.getByText('1 languages')).toBeInTheDocument();
    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
  });

  it('handles missing capital correctly', () => {
    const countryWithoutCapital = { ...mockCountry, capital: '' };
    renderWithRouter(<CountryCard country={countryWithoutCapital} />);
    
    expect(screen.getByText('No capital')).toBeInTheDocument();
  });

  it('displays correct language count for single language', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText('1 languages')).toBeInTheDocument();
  });

  it('displays correct language count for multiple languages', () => {
    const countryWithMultipleLanguages = {
      ...mockCountry,
      languages: [{ name: 'English' }, { name: 'Spanish' }, { name: 'French' }]
    };
    renderWithRouter(<CountryCard country={countryWithMultipleLanguages} />);
    
    expect(screen.getByText('3 languages')).toBeInTheDocument();
  });

  it('creates correct link to country detail page', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/country/US');
  });

  it('applies hover classes correctly', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    const card = screen.getByRole('link');
    expect(card.firstChild).toHaveClass('group', 'hover:shadow-2xl', 'transition-all', 'duration-300', 'hover:-translate-y-2');
  });

  it('displays continent badge in correct position', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    const continentBadge = screen.getByText('North America');
    expect(continentBadge).toBeInTheDocument();
    expect(continentBadge).toHaveClass('absolute', 'top-3', 'right-3');
  });

  it('shows "Click to explore" call-to-action', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText('Click to explore →')).toBeInTheDocument();
  });

  it('handles empty languages array', () => {
    const countryWithNoLanguages = {
      ...mockCountry,
      languages: []
    };
    renderWithRouter(<CountryCard country={countryWithNoLanguages} />);
    
    expect(screen.getByText('0 languages')).toBeInTheDocument();
  });

  it('renders emoji in correct size', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    const emoji = screen.getByText('🇺🇸');
    expect(emoji).toHaveClass('text-6xl');
  });
});