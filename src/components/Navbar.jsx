// components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { navItems } from '../constants';
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');
  const headerRef = useRef(null);

  useEffect(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
    });

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyles =
    isScrolled && scrollDirection === 'up'
      ? {
          backdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
        }
      : {
          backdropFilter: 'none',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          transition: 'all 0.3s ease-in-out',
        };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={headerStyles}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/assets/BFM Logo Red - White.svg"
              alt="Logo"
              className="w-50 h-50"
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className={`hidden lg:flex items-center space-x-8 transition-all duration-300 ease-in-out ${
              scrollDirection === 'down'
                ? 'opacity-0 pointer-events-none -translate-y-3'
                : 'opacity-100 pointer-events-auto translate-y-0'
            }`}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-white text-lg font-medium inter-tight-700 transition-colors duration-200 hover:text-rose-500"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className='flex items-center space-x-12'>
          <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
