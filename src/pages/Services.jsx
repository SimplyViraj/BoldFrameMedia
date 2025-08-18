import React from 'react'
import ScrollableVideo from '../components/ScrollableVid'
import Navbar2 from '../components/Navbar2'
import ImageTracker from '../components/ImageTracker';
import Footer from '../components/footer';

const Services = () => {
  return (
    <div className="bg-white min-h-screen text-black scroll-smooth ">

     <Navbar2 />

      <section className="mt-16 mb-8 ">
        <span className='text-[#9D9D9D] font-[0.99em] inter-300 leading-tight p-8'>
          (About)
        </span>
        <h1 className="md:text-[3.4rem] text-[2rem] inter-tight-700 tracking-tighter leading-none text-left max-w-[1000px] ml-auto">
          <span className='ml-60'>Premium branding</span>, websites, and digital solutions designed to give your business a competitive advantage.
        </h1>
      </section>

      <div className="parallax-section h-screen md:h-[120vh]  bg-cover md:bg-size-[120%] bg-center">
      <div className="photo-wrapper">
        <img src="/assets/stock.jpeg" alt="Parallax Image" className="photo" />
      </div>
    </div>


    <div className="w-[100%] h-[10vh] md:h-[30vh] bg-white " />
      <ScrollableVideo />
      
    <div className="w-[100%] h-[10vh] md:h-[30vh] bg-white " />
    <section className="relative h-screen w-full">
            <ImageTracker />
          </section>

      <Footer />
    </div>

    
  );
}

export default Services;

// import React, { useLayoutEffect, useRef } from 'react';
// import ScrollableVideo from '../components/ScrollableVid';
// import Navbar2 from '../components/Navbar2';
// import ImageTracker from '../components/ImageTracker';
// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const splitLines = (element) => {
//   if (!element) return null;

//   // Step 1: Grab words and insert as spans
//   const words = element.textContent.trim().split(/\s+/).map(w => w + '\u00A0');
//   element.innerHTML = words.map(w => `<span class="word" style="display:inline-block">${w}</span>`).join('');

//   const wordSpans = Array.from(element.querySelectorAll('.word'));

//   // Step 2: Batch read — get all tops first
//   const tops = wordSpans.map(word => Math.round(word.getBoundingClientRect().top));

//   // Step 3: Group into lines
//   const lines = [];
//   let currentLine = [];
//   let prevTop = null;
//   const tolerance = 3;

//   wordSpans.forEach((word, i) => {
//     const top = tops[i];
//     if (prevTop === null || Math.abs(top - prevTop) <= tolerance) {
//       currentLine.push(word);
//     } else {
//       lines.push(currentLine);
//       currentLine = [word];
//     }
//     prevTop = top;
//   });
//   if (currentLine.length) lines.push(currentLine);

//   // Step 4: Wrap lines in single DOM pass
//   const frag = document.createDocumentFragment();
//   lines.forEach(line => {
//     const outer = document.createElement('span');
//     outer.style.display = 'block';
//     outer.style.overflow = 'hidden';
//     outer.className = 'line-wrap';

//     const inner = document.createElement('span');
//     inner.style.display = 'inline-block';
//     inner.style.transform = 'translateY(100%)';
//     inner.className = 'line-inner';

//     line.forEach(word => inner.appendChild(word));
//     outer.appendChild(inner);
//     frag.appendChild(outer);
//   });

//   element.innerHTML = '';
//   element.appendChild(frag);

//   // Step 5: Animate with ScrollTrigger
//   return gsap.fromTo(
//     element.querySelectorAll('.line-inner'),
//     { yPercent: 100, opacity: 0 },
//     {
//       yPercent: 0,
//       opacity: 1,
//       duration: 0.7,
//       ease: 'cubic-bezier(0.9, 0.1, 0.1, 0.9)',
//       stagger: 0.12,
//       scrollTrigger: {
//         trigger: element,
//         start: 'top 80%',
//         toggleActions: 'play none none reverse'
//       }
//     }
//   );
// };

// export default function Services() {
//   const textRefs = useRef([]);

//   useLayoutEffect(() => {
//     const tweens = textRefs.current.map(ref => ref ? splitLines(ref) : null).filter(Boolean);

//     return () => {
//       tweens.forEach(t => {
//         try { t.scrollTrigger?.kill(); } catch {}
//         try { t.kill(); } catch {}
//       });
//     };
//   }, []);

//   return (
//     <div className="bg-white min-h-screen text-black scroll-smooth">
//       <Navbar2 />

//       <section className="mt-16 mb-8">
//         <span
//           ref={el => (textRefs.current[0] = el)}
//           className="text-[#9D9D9D] font-[0.99em] inter-300 leading-tight p-8 block"
//         >
//           (About)
//         </span>

//         <h1
//           ref={el => (textRefs.current[1] = el)}
//           className="md:text-[3.4rem] text-[2rem] inter-tight-700 tracking-tighter leading-none text-left max-w-[1000px] ml-auto"
//         >
//           Premium branding, websites, and digital solutions designed to give your business a competitive advantage.
//         </h1>
//       </section>

//       <div className="parallax-section h-screen md:h-[120vh] bg-cover md:bg-size-[120%] bg-center">
//         <div className="photo-wrapper">
//           <img src="/assets/stock.jpeg" alt="Parallax" className="photo" />
//         </div>
//       </div>

//       <div className="w-full h-[10vh] md:h-[30vh] bg-white" />
//       <ScrollableVideo />
//       <div className="w-full h-[10vh] md:h-[30vh] bg-white" />

//       <section className="relative h-screen w-full">
//         <ImageTracker />
//       </section>
//     </div>
//   );
// }
