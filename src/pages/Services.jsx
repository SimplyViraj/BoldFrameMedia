import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import ImageTracker from '../components/ImageTracker';
import Footer from '../components/Footer';
import Carousel from '@/components/Carousel';
import { designer,videoeditor,threedmodeldesign,videographer } from '@/constants';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Prices from '@/components/Prices';
gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const headingRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;
    const lines = headingRef.current.querySelectorAll("span");

    gsap.fromTo(
      lines,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "cubic-bezier(0.9, 0.1, 0.1, 0.9)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div className="min-h-screen text-black scroll-smooth">
      <Navbar dark={true} />

      <section className="mt-64 mb-8 px-8">
        <span className="text-[#9D9D9D] font-[0.99em] inter-300 leading-tight block mb-4">
          (About)
        </span>
        <h1
          ref={headingRef}
          className="md:text-[3.4rem] text-[2rem] inter-tight-700 tracking-tighter leading-none text-left max-w-[1000px] ml-auto"
        >
          <span className=" overflow-hidden">
            <span className="inline-block translate-y-full ml-60">
              Premium branding, websites, 
            </span>
          </span>
          <span className="overflow-hidden">
            <span className="inline-block translate-y-full">
              and digital solutions designed to give your
            </span>
          </span>
          <span className="overflow-hidden">
            <span className="inline-block translate-y-full">
               business a competitive advantage.
            </span>
          </span>
        </h1>
      </section>

      <div className="parallax-section h-screen md:h-[120vh] bg-cover md:bg-size-[120%] bg-center">
        <div className="photo-wrapper">
          <video
            src="/videos/parallaxvid.mp4"
            autoPlay
            loop
            muted
            playsInline
            playbackRate={1.5}
            className="photo w-[80%] h-full object-cover"
          />
        </div>
      </div>

      {/* <div className="w-full h-[10vh] md:h-[30vh] bg-white" /> */}
     <Prices />
      <div id="branding">
        <Carousel products={designer} />
      </div>
      <div id="web-design">
        <Carousel products={videoeditor} />
      </div>
      <div id="marketing">
        <Carousel products={threedmodeldesign} />
      </div>
      <div>
        <Carousel products={videographer} />
      </div>

      <section className="relative h-screen w-full">
        <ImageTracker />
      </section>

      <Footer />
    </div>
  );
};

export default Services;
