import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;

    gsap.set(img, {
      scale: 0.75,
      transformOrigin:'50% -50%',
    });

    gsap.to(img, {
      scale: 1, 
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: img,
        start: 'top center', 
        end: 'top top',    
        scrub: true,
        markers:false,
        duration: 3,
      },
    });
  }, []);

  return (
    <div className="bg-black">
      <Navbar />
      <Hero />

      <div className="relative flex justify-center items-center bg-[url('/assets/background.jpg')] bg-fill max-w-[100%]] mx-auto">
        <img
          ref={imgRef}
          src="/assets/stock.jpeg"
          alt="Scaling Image"
          className="image h-auto object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center max-w-[65%] mx-auto text-white text-[24px] text-center mt-10">
        <h1 className="mb-4">We have over half a decade of experience upscaling businesses, making users happy, and utilising our expertise to set new standards. We go the extra mile to create impactful digital solutions for Fintech, SaaS, Healthcare, E-commerce, Web, and Mobile products.</h1>
        <span className="text-rough font-bold">Still why choose us...?</span>
        </div>

      <div className="h-[200vh] bg-black"></div>
    </div>
  );
};

export default Home;
