import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CountryDetail from '../../src/pages/CountryDetail';
import * as countriesApi from '../../src/services/countriesApi';

const mockCountry = {
  code: 'US',
  name: 'United States',
  capital: 'Washington D.C.',
  continent: {
    name: 'North America'
  },
  languages: [
    { name: 'English' }
  ],
  currency: 'USD',
  emoji: '🇺🇸'
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      refetchOnWindowFocus: false,
    },
  },
});

jest.mock('../../src/services/countriesApi', () => ({
  fetchCountries: jest.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('CountryDetail', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('shows loading state initially', () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue([]);
    window.history.pushState({}, '', '/country/US');
    renderWithProviders(<CountryDetail />);
    expect(screen.getByText(/loading country details/i)).toBeInTheDocument();
  });

  it('shows not found if country does not exist', async () => {
    (countriesApi.fetchCountries as jest.Mock).mockResolvedValue([]);
    window.history.pushState({}, '', '/country/INVALID');
    renderWithProviders(<CountryDetail />);
    await waitFor(() => {
      expect(screen.getByText(/country not found/i)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /return to home/i })).toBeInTheDocument();
  });

  it('renders country details if found', async () => {
    (countriesApi.fetchCountries as jest.Mock).mockImplementation(() => {
      // eslint-disable-next-line no-console
      console.log('fetchCountries called, returning:', [mockCountry]);
      return Promise.resolve([mockCountry]);
    });
    window.history.pushState({}, '', '/country/US');
    renderWithProviders(<CountryDetail />);
    await waitFor(() => {
      expect(screen.getByText((content, node) => (node ? node.textContent === 'United States' : false))).toBeInTheDocument();
      expect(screen.getByText('Washington D.C.')).toBeInTheDocument();
      expect(screen.getByText('USD')).toBeInTheDocument();
      expect(screen.getByText('English')).toBeInTheDocument();
    });
  });
}); 