import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../src/components/Navbar';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Navbar', () => {
  it('renders brand logo correctly', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Explorer')).toBeInTheDocument();
    
    const countryText = screen.getByText('Country');
    const explorerText = screen.getByText('Explorer');
    
    expect(countryText).toHaveClass('text-design-purple');
    expect(explorerText).toHaveClass('text-design-coral');
  });

  it('renders desktop navigation links', () => {
    renderWithRouter(<Navbar />);
    
    // Desktop navigation should be visible on larger screens
    const desktopNav = screen.getByText('Home').closest('.hidden.md\\:flex');
    expect(desktopNav).toBeInTheDocument();
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('osu!')).toBeInTheDocument();
  });

  it('has correct navigation link hrefs', () => {
    renderWithRouter(<Navbar />);
    
    const homeLinks = screen.getAllByText('Home');
    const aboutLinks = screen.getAllByText('About');
    const brandLink = screen.getByText('Country').closest('a');
    
    expect(brandLink).toHaveAttribute('href', '/');
    
    // Check that at least one Home link points to home
    const homeLink = homeLinks.find(link => link.closest('a')?.getAttribute('href') === '/');
    expect(homeLink).toBeDefined();
    
    // Check that at least one About link points to about
    const aboutLink = aboutLinks.find(link => link.closest('a')?.getAttribute('href') === '/about');
    expect(aboutLink).toBeDefined();
  });

  it('shows mobile menu button on small screens', () => {
    renderWithRouter(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton.closest('.md\\:hidden')).toBeInTheDocument();
  });

  it('toggles mobile menu visibility', () => {
    renderWithRouter(<Navbar />);
    
    // Mobile menu should be hidden initially
    expect(screen.queryByText('Home ')).not.toBeInTheDocument();
    
    // Click hamburger menu button
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Mobile menu should now be visible
    expect(screen.getByText('Home ')).toBeInTheDocument();
  });

  it('changes menu icon when menu is open', () => {
    renderWithRouter(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    
    // Initially should show Menu icon (hamburger)
    expect(menuButton.querySelector('[data-lucide="menu"]')).toBeInTheDocument();
    
    // Click to open menu
    fireEvent.click(menuButton);
    
    // Should now show X icon
    expect(menuButton.querySelector('[data-lucide="x"]')).toBeInTheDocument();
  });

  it('closes mobile menu when menu item is clicked', () => {
    renderWithRouter(<Navbar />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Verify menu is open
    expect(screen.getByText('Home ')).toBeInTheDocument();
    
    // Click on a menu item
    const mobileHomeLink = screen.getByText('Home ');
    fireEvent.click(mobileHomeLink);
    
    // Menu should close - the mobile menu items should not be visible
    expect(screen.queryByText('Home ')).not.toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    renderWithRouter(<Navbar />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass(
      'w-full',
      'py-4',
      'px-6',
      'md:px-10',
      'lg:px-20',
      'fixed',
      'top-0',
      'left-0',
      'z-50',
      'bg-background/90',
      'backdrop-blur-md'
    );
  });

  it('renders mobile menu with correct animation class', () => {
    renderWithRouter(<Navbar />);
    
    // Open mobile menu
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    // Check for mobile menu container with animation class
    const mobileMenu = screen.getByText('Home ').closest('.animate-fade-in');
    expect(mobileMenu).toBeInTheDocument();
  });

  it('has proper navigation structure', () => {
    renderWithRouter(<Navbar />);
    
    // Check that nav contains proper flex structure
    const mainContainer = screen.getByText('Country').closest('.flex.justify-between.items-center');
    expect(mainContainer).toBeInTheDocument();
    
    // Check desktop nav container
    const desktopNav = screen.getByText('Home').closest('.hidden.md\\:flex.items-center.space-x-8');
    expect(desktopNav).toBeInTheDocument();
  });

  it('maintains menu state correctly', () => {
    renderWithRouter(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    
    // Open menu
    fireEvent.click(menuButton);
    expect(screen.getByText('Home ')).toBeInTheDocument();
    
    // Close menu
    fireEvent.click(menuButton);
    expect(screen.queryByText('Home ')).not.toBeInTheDocument();
    
    // Open again
    fireEvent.click(menuButton);
    expect(screen.getByText('Home ')).toBeInTheDocument();
  });
});