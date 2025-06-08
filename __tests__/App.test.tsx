import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {component}
    </QueryClientProvider>
  );
};

describe('App', () => {
  it('renders without crashing', () => {
    renderWithProviders(<App />);
  });

  it('renders the main navigation', () => {
    renderWithProviders(<App />);
    expect(screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === 'CountryExplorer';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node?.children || []).every(
        child => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
  });

  it('renders the home page by default', () => {
    renderWithProviders(<App />);
    expect(screen.getByText((content, node) => {
      const hasText = (node) => node.textContent === 'CountryExplorer';
      const nodeHasText = hasText(node);
      const childrenDontHaveText = Array.from(node?.children || []).every(
        child => !hasText(child)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the about page when navigating to /about', () => {
    window.history.pushState({}, '', '/about');
    renderWithProviders(<App />);
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders 404 page for invalid routes', () => {
    window.history.pushState({}, '', '/invalid-route');
    renderWithProviders(<App />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });

  it('renders country detail page when navigating to /country/:code', () => {
    window.history.pushState({}, '', '/country/US');
    renderWithProviders(<App />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
}); 