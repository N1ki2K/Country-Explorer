import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="w-full py-4 px-6 md:px-10 lg:px-20 fixed top-0 left-0 z-50 bg-background/90 backdrop-blur-md">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-display font-bold text-design-purple">
            Country<span className="text-design-coral">Explorer</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium effect-underline pb-1">Home</Link>
          <Link to="/about" className="font-medium effect-underline pb-1">About</Link>
          <Link to="/osu" className="font-medium effect-underline pb-1">osu!</Link>
          <div className="flex items-center gap-2">
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md p-6 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="font-medium py-2" onClick={toggleMenu}>Home</Link>
            <Link to="/about" className="font-medium py-2" onClick={toggleMenu}>About</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
