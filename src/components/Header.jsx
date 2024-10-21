import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa'; // Importing FontAwesome icons
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 w-full bg-[#1F2937] shadow-xl z-40">
      <div className="container mx-auto flex items-center justify-between py-2 px-5">
        {/* Logo Section */}
        <Link to={"/"} className='bg-white rounded-lg'>
          <img src="/logo.png" alt="Huddle Hub logo" width={130} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex">
          <ul className="flex space-x-6">
            <li>
              <a href="#" className="hover:text-orange-500">Home</a>
            </li>
            <li>
              <a href="#features" className="hover:text-orange-500">Features</a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-orange-500">Pricing</a>
            </li>
            <li>
              <a href="#contact" className="hover:text-orange-500">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="md:hidden z-50 relative">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 h-screen w-full bg-[#1F2937] flex flex-col items-center justify-center space-y-8 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out md:hidden`}
        >
          <ul className="text-center flex flex-col gap-5">
            <li>
              <a href="#" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#features" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Pricing
              </a>
            </li>
            <li>
              <a href="#contact" className="text-white text-xl hover:text-orange-500" onClick={toggleMenu}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
