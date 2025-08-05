import React, { useLayoutEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { navItems} from '../constants';


// Utility to split nav item text into animated spans
const splitLines = (text) => {
  return text.split(' ').map((word, i) => (
    <span key={i} className="block overflow-hidden">
      <span className="inline-block translate-y-full inter-tight-700 leading-tight">
        {word}&nbsp;
      </span>
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
      const allSpans = navRefs.current.flatMap((el) =>
        Array.from(el?.querySelectorAll('span span') || [])
      );

      gsap.to(allSpans, {
        y: '100%',
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)',
        toggleAction: 'play none none reverse',
        onComplete: () => {
          gsap.to(overlayRef.current, {
            height: 0,
            duration: 0.7,
            ease: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)',
            onComplete: () => {
              setOverlayVisible(false);
              setShowContent(false);
            },
          });
        },
      });
    }
  }, [isOpen]);

  useLayoutEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const showPreview = (e) => {
    const preview = document.getElementById('cursor-preview');
    if (!preview) return;

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
        className="z-50 fixed top-4 right-4 p-2 bg-white rounded-none shadow-md"
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
            <div className="flex flex-col lg:flex-row md:gap-[3.75rem] h-full">
              <div className="lg:flex items-start justify-center lg:justify-start p-6">
                <img
                  src="/assets/BFM Icon Black.svg"
                  alt="BFM Logo"
                  className="w-25 h-auto"
                />
              </div>

              {/* Navigation and Contact */}
              <div className="flex-0 flex flex-col lg:flex-row md:gap-16 lg:gap-[15rem] items-start justify-between p-[3.75rem] h-full w-full">

          
                <ul className="text-[clamp(3rem,8vw,7rem)] py-4 md:py-8 leading-[1.6] md:leading-tight tracking-tighter w-full">
                  {navItems.map((item, i) => (
                    <li
                      key={item.name}
                      ref={(el) => (navRefs.current[i] = el)}
                      style={{
                        marginTop: i !== 0 ? 'clamp(-3rem, -6vw, -3.25rem)' : 0,
                      }}
                      onMouseEnter={(e) => {
                        showPreview(e, item);
                        navRefs.current.forEach((el, idx) => {
                          if (idx !== i) el.style.opacity = '0.5';
                        });
                      }}
                      onMouseLeave={() => {
                        hidePreview();
                        navRefs.current.forEach((el) => {
                          el.style.opacity = '1';
                        });
                      }}
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer transition-colors relative"
                    >
                      <Link to={item.href} className="inline-block relative group">
                        {splitLines(item.name)}
                        <span className="absolute bottom-2 left-0 h-[0.1em] bg-black w-0 group-hover:w-full transition-all ease-[cubic-bezier(0.9,0.1,0.1,0.9)] duration-700" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Contact Info */}
                <div className="flex flex-col justify-end items-start lg:items-start text-left md:space-y-6 md:py-12 h-full w-full max-w-xs">
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
                  <div className="text-sm md:space-y-2">
                    <div>
                      <span className="text-gray-500 hidden md:inline">(Inquiries)</span>
                      <br />
                      <a href="mailto:john@jt-studio.com" className="underline">
                        viraj.com
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-500 hidden md:inline">(Phone)</span>
                      <br />
                      <a href="tel:+8688344975" className="underline">
                        +8688344975
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
