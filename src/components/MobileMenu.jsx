import React, { useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
  { name: 'Contact', href: '/contact' },
];

const previewImages = {
  Home: '/assets/stock.jpeg',
  About: '/images/preview-about.jpg',
  Work: '/assets/preview-services.jpg',
  Contact: '/images/preview-pricing.jpg',
};

// Utility to split nav item text into animated spans
const splitLines = (text) => {
  return text.split(' ').map((word, i) => (
    <span key={i} className="block overflow-hidden">
      <span className="inline-block translate-y-full">{word}&nbsp;</span>
    </span>
  ));
};

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const overlayRef = useRef(null);
  const navRefs = useRef([]);

  useLayoutEffect(() => {
    if (isOpen && overlayRef.current) {
      setOverlayVisible(true);
      setShowContent(false);
      navRefs.current = [];

      gsap.set(overlayRef.current, { height: 0 });

      gsap.to(overlayRef.current, {
        height: '100vh',
        duration: 0.7,
        ease: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)',
        onComplete: () => {
          setShowContent(true);
          requestAnimationFrame(() => {
            navRefs.current.forEach((el) => {
              const innerSpans = el.querySelectorAll('span span');
              gsap.fromTo(
                innerSpans,
                { y: '100%', opacity: 0 },
                {
                  y: '0%',
                  opacity: 1,
                  duration: 0.7,
                  ease: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)',
                  stagger: 0.05,
                }
              );
            });
          });
        },
      });
    } else if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        height: 0,
        duration: 0.7,
        ease: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)',
        onComplete: () => {
          setOverlayVisible(false);
          setShowContent(false);
        },
      });
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const showPreview = (e, item) => {
    const preview = document.getElementById('cursor-preview');
    const img = document.getElementById('preview-img');
    if (!preview || !img) return;

    img.src = previewImages[item.name];
    preview.style.display = 'block';

    const move = (e) => {
      preview.style.top = `${e.clientY}px`;
      preview.style.left = `${e.clientX}px`;
    };

    move(e);
    window.addEventListener('mousemove', move);
    preview._cleanup = () => window.removeEventListener('mousemove', move);
  };

  const hidePreview = () => {
    const preview = document.getElementById('cursor-preview');
    if (preview && preview._cleanup) preview._cleanup();
    if (preview) preview.style.display = 'none';
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="z-50 fixed top-4 right-4 p-2 bg-white rounded-full shadow-md"
      >
        {isOpen ? <X className="text-black h-8 w-8" /> : <Menu className="text-black h-8 w-8" />}
      </button>

      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed top-0 left-0 w-full bg-[#f4f4f4] z-40 overflow-hidden ${
          overlayVisible ? 'visible' : 'invisible'
        }`}
        style={{ height: '0vh' }}
      >
        {showContent && (
          <div className="flex flex-col h-full text-black relative">

            <div className="flex flex-col lg:flex-row gap-[3.75rem] ">
              {/* Logo */}
              <div className="lg:flex items-start justify-center lg:justify-start p-6">
                <img
                  src="/assets/BFM Icon Red.svg"
                  alt="BFM Logo"
                  className="w-20 h-20"
                />
              </div>

              {/* Navigation and Contact */}
              <div className="flex-1 flex items-center lg:items-start justify-between p-[3.75rem] h-full">
                <ul className="text-[clamp(3rem,8vw,7rem)] text-inter-tight font-black py-16 leading-tight space-y-2">

                  {navItems.map((item, i) => (
                    <li
                      key={item.name}
                      ref={(el) => (navRefs.current[i] = el)}
                      onMouseEnter={(e) => showPreview(e, item)}
                      onMouseLeave={hidePreview}
                      onClick={() => setIsOpen(false)}
                      className="hover:text-rose-500 cursor-pointer transition-colors"
                    >
                      <Link to={item.href} className="inline-block">
                        {splitLines(item.name)}
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Contact Info */}
                <div className="flex flex-col flex-col-reverse items-start space-y-6 lg:items-end text-right">
                  {/* Social Icons */}
                  <div className="flex space-x-4">
                    {['instagram', 'facebook', 'x', 'linkedin', 'youtube'].map((icon, i) => (
                      <div
                        key={i}
                        className="rounded-full bg-gray-200 w-10 h-10 flex items-center justify-center"
                      >
                        <img
                          src={`/icons/${icon}.svg`}
                          alt={icon}
                          className="w-4 h-4 object-contain"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Email and Phone */}
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="text-gray-500">(Inquiries)</span><br />
                      <a href="mailto:john@jt-studio.com" className="underline">john@jt-studio.com</a>
                    </div>
                    <div>
                      <span className="text-gray-500">(Phone)</span><br />
                      <a href="tel:+49123456789" className="underline">+49 1234 56789</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Preview */}
            <div
              id="cursor-preview"
              className="fixed z-50 hidden pointer-events-none"
              style={{
                width: 200,
                height: 200,
                borderRadius: '8px',
                overflow: 'hidden',
                top: 0,
                left: 0,
                transform: 'translate(30%, -80%)',
              }}
            >
              <img
                id="preview-img"
                src=""
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
