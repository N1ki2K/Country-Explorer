import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../src/components/Navbar';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navbar', () => {
  it('renders the logo and brand name', () => {
    renderWithRouter(<Navbar />);
    // The logo text is split between 'Country' and 'Explorer' in a span
    expect(screen.getByText((content, node) => {
      const hasText = (node: Element) =>
        node.textContent === 'CountryExplorer';
      const nodeHasText = hasText(node as Element);
      const childrenDontHaveText = Array.from(node?.children || []).every(
        child => !hasText(child as Element)
      );
      return nodeHasText && childrenDontHaveText;
    })).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    renderWithRouter(<Navbar />);
    // Desktop links are always in the document
    expect(screen.getAllByText('Home')[0]).toBeInTheDocument();
    expect(screen.getAllByText('About')[0]).toBeInTheDocument();
  });

  it('toggles mobile menu when menu button is clicked', () => {
    renderWithRouter(<Navbar />);
    // Click menu button
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    // Mobile menu links should now be visible
    expect(screen.getAllByText('Home')[1]).toBeVisible();
    expect(screen.getAllByText('About')[1]).toBeVisible();
    // Click menu button again to close
    fireEvent.click(menuButton);
    // Mobile menu links should be removed from the DOM
    expect(screen.queryByText('Home', {selector: 'a.font-medium.py-2'})).toBeNull();
  });

  it('closes mobile menu when a link is clicked', () => {
    renderWithRouter(<Navbar />);
    // Open menu
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    // Click the mobile Home link
    const homeLink = screen.getAllByText('Home')[1];
    fireEvent.click(homeLink);
    // Mobile menu should be closed
    expect(homeLink).not.toBeVisible();
  });

  it('has correct navigation links', () => {
    renderWithRouter(<Navbar />);
    const homeLink = screen.getAllByText('Home')[0].closest('a');
    const aboutLink = screen.getAllByText('About')[0].closest('a');
    expect(homeLink).toHaveAttribute('href', '/');
    expect(aboutLink).toHaveAttribute('href', '/about');
  });
});