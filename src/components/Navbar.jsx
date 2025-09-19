// components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { navItems } from "../constants";

export default function Navbar({ dark = false }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up");
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.from(headerRef.current, {
        y: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // header background + blur
  const headerStyles =
    isScrolled && scrollDirection === "up"
      ? {
          backdropFilter: "blur(20px)",
          backgroundColor: "rgba(0, 0, 0, 1)",
          color: "rgba(255, 255, 255, 1)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease-in-out",
        }
      : {
          backdropFilter: "none",
          backgroundColor: "transparent",
          boxShadow: "none",
          transition: "all 0.3s ease-in-out",
        };

  // dynamic logo selection
  const logoSrc =
    isScrolled && scrollDirection === "up"
      ? "/assets/BFM Logo Red - White.svg"
      : dark
      ? "/assets/BFM Icon Black.svg"
      : "/assets/BFM Logo Red - White.svg";

  const hmax = isScrolled && scrollDirection === "up" ?"h-40" : dark ? "h-20" : "h-40";

  const linkClass =
    isScrolled && scrollDirection === "up"
      ? "text-white text-base lg:text-lg font-medium inter-tight-700 transition-colors duration-200 hover:text-rose-500"
      : dark
      ? "text-black text-base lg:text-lg font-medium inter-tight-700 transition-colors duration-200 hover:text-rose-500"
      : "text-white text-base lg:text-lg font-medium inter-tight-700 transition-colors duration-200 hover:text-rose-500";

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={headerStyles}
    >
      <div className="mx-auto max-w-8xl px-6 lg:px-10">
        <div className="relative flex items-center h-16 lg:h-20">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0 z-10">
            <Link to="/" className="flex items-center">
              <div className={`h-10 ${hmax} flex items-center`}>
                <img
                  src={logoSrc}
                  alt="Bold Frame Media"
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Center: Nav */}
          <nav
            aria-label="Primary"
            className={`hidden lg:flex absolute inset-y-0 left-1/2 transform -translate-x-1/2 items-center space-x-10 transition-all duration-300 ease-in-out z-0 ${
              scrollDirection === "down"
                ? "opacity-0 pointer-events-none -translate-y-3"
                : "opacity-100 pointer-events-auto translate-y-0"
            }`}
          >
            {navItems.map((item) => (
              <Link key={item.name} to={item.href} className={linkClass}>
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center z-10">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
}
