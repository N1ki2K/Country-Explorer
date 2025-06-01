import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import About from '../../src/pages/About';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('About Page', () => {
  it('renders main heading correctly', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('About Country Explorer')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Country Explorer');
  });

  it('renders welcome section', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Welcome to Country Explorer!')).toBeInTheDocument();
    expect(screen.getByText(/Welcome to Country Explorer, your passport to discovering/)).toBeInTheDocument();
    expect(screen.getByText(/Our mission is to provide a clean, engaging/)).toBeInTheDocument();
  });

  it('renders what we offer section', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('What We Offer')).toBeInTheDocument();
  });

  it('displays comprehensive country data feature', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Comprehensive Country Data:')).toBeInTheDocument();
    expect(screen.getByText(/Dive into details for countries from around the world/)).toBeInTheDocument();
    expect(screen.getByText(/capital city, continent, official languages, currency/)).toBeInTheDocument();
  });

  it('displays easy navigation features', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Easy Navigation:')).toBeInTheDocument();
    expect(screen.getByText('Browse:')).toBeInTheDocument();
    expect(screen.getByText('Search:')).toBeInTheDocument();
    expect(screen.getByText('Filter:')).toBeInTheDocument();
  });

  it('explains browse functionality', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText(/Scroll through an extensive list of countries/)).toBeInTheDocument();
  });

  it('explains search functionality', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText(/Quickly find any country by typing its name/)).toBeInTheDocument();
  });

  it('explains filter functionality', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText(/Narrow down your exploration by filtering countries by continent/)).toBeInTheDocument();
  });

  it('displays detailed country pages feature', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Detailed Country Pages:')).toBeInTheDocument();
    expect(screen.getByText(/Click on any country to see a dedicated page/)).toBeInTheDocument();
  });

  it('displays customizable viewing experience feature', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Customizable Viewing Experience:')).toBeInTheDocument();
    expect(screen.getByText(/Tailor the website's appearance to your preference/)).toBeInTheDocument();
    expect(screen.getByText(/Choose between light, dark, or system default themes/)).toBeInTheDocument();
  });

  it('renders data source section', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Our Data Source')).toBeInTheDocument();
    expect(screen.getByText(/All the information you see on Country Explorer is sourced from the Countries Trevor Blades API/)).toBeInTheDocument();
  });

  it('renders closing message', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('We hope you enjoy your journey with Country Explorer!')).toBeInTheDocument();
  });

  it('has correct page structure and styling', () => {
    renderWithRouter(<About />);
    
    // Check main container has min-height
    const mainContainer = screen.getByText('About Country Explorer').closest('.min-h-screen');
    expect(mainContainer).toBeInTheDocument();
    
    // Check container has proper max-width
    const contentContainer = screen.getByText('About Country Explorer').closest('.max-w-3xl');
    expect(contentContainer).toBeInTheDocument();
  });

  it('renders all content sections with proper backgrounds', () => {
    renderWithRouter(<About />);
    
    // All content sections should have backdrop styling
    const welcomeSection = screen.getByText('Welcome to Country Explorer!').closest('.bg-background\\/50');
    const offerSection = screen.getByText('What We Offer').closest('.bg-background\\/50');
    const dataSourceSection = screen.getByText('Our Data Source').closest('.bg-background\\/50');
    const closingSection = screen.getByText('We hope you enjoy your journey with Country Explorer!').closest('.bg-background\\/50');
    
    expect(welcomeSection).toBeInTheDocument();
    expect(offerSection).toBeInTheDocument();
    expect(dataSourceSection).toBeInTheDocument();
    expect(closingSection).toBeInTheDocument();
  });

  it('has proper heading hierarchy', () => {
    renderWithRouter(<About />);
    
    // Main heading should be h1
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('About Country Explorer');
    
    // Section headings should be h2
    const h2Headings = screen.getAllByRole('heading', { level: 2 });
    expect(h2Headings).toHaveLength(3);
    expect(h2Headings[0]).toHaveTextContent('Welcome to Country Explorer!');
    expect(h2Headings[1]).toHaveTextContent('What We Offer');
    expect(h2Headings[2]).toHaveTextContent('Our Data Source');
  });

  it('includes Navbar component', () => {
    renderWithRouter(<About />);
    
    // Check that navbar elements are present
    expect(screen.getByText('Country')).toBeInTheDocument();
    expect(screen.getByText('Explorer')).toBeInTheDocument();
  });

  it('has proper spacing and layout classes', () => {
    renderWithRouter(<About />);
    
    const mainHeading = screen.getByText('About Country Explorer');
    expect(mainHeading).toHaveClass('text-center', 'mb-10', 'text-4xl', 'font-bold', 'text-design-purple');
    
    const sectionHeadings = screen.getAllByText(/Welcome to Country Explorer!|What We Offer|Our Data Source/);
    sectionHeadings.forEach(heading => {
      if (heading.tagName === 'H2') {
        expect(heading).toHaveClass('text-3xl', 'font-semibold', 'mb-6');
      }
    });
  });

  it('renders feature list correctly', () => {
    renderWithRouter(<About />);
    
    // Check that the feature list has proper structure
    const featureList = screen.getByText('Comprehensive Country Data:').closest('ul');
    expect(featureList).toHaveClass('space-y-4', 'text-lg', 'leading-relaxed');
    
    // Check nested list for navigation features
    const nestedList = screen.getByText('Browse:').closest('ul');
    expect(nestedList).toHaveClass('list-disc', 'list-inside', 'ml-6', 'mt-2', 'space-y-1');
  });
});