import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Loader({ onFinish }) {

  const loaderRef = useRef(null);

  useEffect(() => {
    const chars = loaderRef.current.querySelectorAll('.char');

    const tl = gsap.timeline({
      onComplete: () => {
        if (onFinish) onFinish();
      },
    });

    tl.fromTo(
      loaderRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 1, ease: 'power2.out' }
    );

    chars.forEach((char, i) => {
      const original = char.querySelector('.original-text');
      const clone = char.querySelector('.clone-text');

      gsap.set(clone, {
        yPercent: i % 2 === 0 ? -100 : 100,
      });

      const roll = gsap.to([original, clone], {
        repeat: 2,
        ease: 'none',
        yPercent: i % 2 === 0 ? "+=100" : "-=100",
        duration: 0.4,
      });
      tl.add(roll,0); 
    });

    tl.to(
        loaderRef.current,{
            delay:0.5,
        }
    );
    tl.to(loaderRef.current, {
      yPercent: -100,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, [onFinish]);

  return (
    <div className='relative w-full h-screen bg-black overflow-hidden'>
      <div
        ref={loaderRef}
        className="absolute top-0 left-0 w-full h-screen bg-black flex items-center justify-center text-bf-red sm:text-9xl text-4xl font-bebas"
      >
       <h1 className='flex'>
        {"BOLD FRAME".split('').map((letter, idx) => (
          <span key={idx} className='char overflow-hidden relative'>
            <div className='original-text text-rough2'>{letter}</div>
            <div className='clone-text absolute top-0 left-0 text-rough2'>{letter}</div>
          </span>
        ))}
       </h1>
        <span className='sm:text-4xl pt-4 text-2xl font-semibold sm:pt-20'>Media.</span>
      </div>
    </div>
  );
}
