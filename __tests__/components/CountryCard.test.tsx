import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CountryCard from '../../src/components/CountryCard';

const mockCountry = {
  code: 'US',
  name: 'United States',
  capital: 'Washington D.C.',
  continent: {
    name: 'North America'
  },
  languages: [
    { name: 'English' },
    { name: 'Spanish' }
  ],
  currency: 'USD',
  emoji: '🇺🇸'
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('CountryCard', () => {
  it('renders country information correctly', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    expect(screen.getByText('United States')).toBeInTheDocument();
    expect(screen.getByText('Washington D.C.')).toBeInTheDocument();
    expect(screen.getByText('North America')).toBeInTheDocument();
    expect(screen.getByText('2 languages')).toBeInTheDocument();
    expect(screen.getByText('🇺🇸')).toBeInTheDocument();
  });

  it('renders "No capital" when capital is not provided', () => {
    const countryWithoutCapital = { ...mockCountry, capital: '' };
    renderWithRouter(<CountryCard country={countryWithoutCapital} />);
    
    expect(screen.getByText('No capital')).toBeInTheDocument();
  });

  it('has correct link to country detail page', () => {
    renderWithRouter(<CountryCard country={mockCountry} />);
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/country/US');
  });
});