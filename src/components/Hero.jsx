import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LightRays from './LightRays';
import Navbar2 from './Navbar2';
import { Button } from "@/components/ui/button";
export default function Hero({
  mainCtaText = "Get a Quote",
  secondCtaText = "View Portfolio",
}) {
  const textRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from(textRef.current.querySelectorAll('h1, p'), {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
    });

    tl.from(lightRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
    }, "-=0.5");
  }, []);

  return (
    <div className="min-h-screen relative bg-black text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/background.jpg')] bg-size-[70%] md:bg-[calc(55%)_-7rem] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(15,15,15,0.6)_30%,_rgba(15,15,15,1)_100%)]" />
      </div>

      {/* Light rays */}
      <div ref={lightRef} style={{ width: '100%', height: '690px', position: 'relative' }}>
        <LightRays
          raysOrigin="top-center"
          raysColor="#D3403F"
          raysSpeed={1}
          lightSpread={0.8}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0}
          distortion={0}
          className="custom-rays"
        />
      </div>

      {/* Text + CTA with divider nearer CTA */}
      <div
        ref={textRef}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] md:w-[63%] z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-[2fr_minmax(200px,1fr)] items-start gap-12">
          {/* Left column - heading + paragraph */}
          <div>
            <h1 className="text-5xl font-bold tracking-tight inter-tight-black text-left p-0 m-0 leading-tight">
              Frame <span className="text-red-500">Bold</span> Ideas!
            </h1>
            <p className="p-0 text-gray-300 max-w-xl text-lg inter-tight-black text-left mb-2">
              Crafting digital experiences that captivate and stand out.
            </p>
          </div>


          <div className="pl-8 border-l border-white/20 flex flex-col gap-2 items-start md:items-end">

            <Button
              className="px-6 md:px-10 py-2 md:py-3 bg-white text-black text-sm md:text-base font-medium 
               hover:bg-gray-100 hover:-translate-y-1 transition-all duration-200 pointer-events-auto"
            >
              {mainCtaText}
            </Button>


            <Button
              variant="outline"
              className="px-6 md:px-10 py-2 md:py-3 text-sm md:text-base font-medium 
               bg-white/5 border border-white/20 text-white/50 backdrop-blur-lg 
               shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:bg-white/10 hover:text-white hover:-translate-y-1 
               transition-all duration-200 pointer-events-auto"
            >
              {secondCtaText}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
