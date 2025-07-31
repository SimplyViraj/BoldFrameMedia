import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import LightRays from './LightRays';

export default function Hero({
  headline = "FRAME BIG IDEAS!",
  mainCtaText = "Get a Quote",
  secondCtaText = "View Portfolio",
}) {
  const textRef = useRef(null);
  const lightRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl.from(textRef.current.querySelectorAll('h1'), {
      y: 30,
      opacity: 0,
      stagger: 0.3,
      duration: 1,
    });

    tl.from(lightRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
    }, "-=0.5"); 
  }, []);

  return (
    <div className="min-h-screen relative bg-black bg-auto text-white overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/assets/background.jpg')] bg-cover opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_30%,_rgba(0,0,0,0.9)_100%)]" />
        <div className="flex items-center justify-center h-full">
          <img
            src="/assets/BFM Icon Red.svg"
            className="w-[40%] min-w-[500px] h-auto opacity-90 object-contain"
            alt="BFM Icon"
          />
        </div>
      </div>
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
      <div ref={textRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center">
        <h1 className="font-proxima text-white font-bold leading-tight tracking-tight max-w-[18ch] text-[clamp(2rem,4vw,2.6rem)] drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)] md:drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          {headline}
        </h1>
        <h1 className="text-rough font-bebas font-bold leading-tight tracking-tight max-w-[32ch] text-[clamp(2rem,4vw,2.6rem)] text-bf-red drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)] md:drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]">
          Creative digital services that stand out
        </h1>

        <div className="mt-8 flex gap-4 items-center">
          <button className="px-6 md:px-10 py-2 md:py-3 bg-white text-black text-sm md:text-base font-medium rounded-full transition-all duration-200 hover:bg-gray-100 hover:-translate-y-1 pointer-events-auto">
            {mainCtaText}
          </button>

          <button className="px-6 md:px-10 py-2 md:py-3 text-sm md:text-base font-medium rounded-full bg-white/5 border border-white/20 text-white/50 backdrop-blur-lg shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-200 hover:bg-white/10 hover:-translate-y-1 pointer-events-auto">
            {secondCtaText}
          </button>
        </div>
      </div>
    </div>
  );
}
