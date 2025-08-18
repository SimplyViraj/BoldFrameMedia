import React, { useEffect } from 'react';
import MobileMenu from '../components/MobileMenu';
import ImageTracker from '../components/ImageTracker';
import MeetTheTeam from '../components/MeetTheTeam';
import Navbar2 from '../components/Navbar2';
import Content from '../components/Content';
import Testimonials from '@/components/Testimonials';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
const About = () => {
  useEffect(() => {
    document.body.classList.add('no-scrollbar');
    document.documentElement.classList.add('no-scrollbar');
    return () => {
      document.body.classList.remove('no-scrollbar');
      document.documentElement.classList.remove('no-scrollbar');
    };
  }, []);

  return (
    <div className="bg-[#0F0F0F] text-white no-scrollbar">
      <Navbar2 logo="2" />

      {/* Hero Section */}
      <section className="relative h-auto flex flex-col text-left">
       <div className='text-6xl md:text-[clamp(9rem,4vw,9rem)] inter-tight-900 font-bold leading-tighter tracking-tighter px-2 py-16 md:py-0 md:px-4'>
        ABOUT US
       </div>
       <Content />
        <div className="absolute right-10 bottom-[-7%] text-gray-400 text-sm animate-bounce z-10">
          ↓ Scroll to Explore
        </div>
      </section>

      
      <section >
        <Testimonials />
      </section>
    
      <section className="bg-[#0F0F0F]">
        <Stats />
      </section>
      <section className='py-10'>
        <span className='text-[#9D9D9D] font-[0.99em] inter-300 leading-tight p-8'>
          (Meet the Team)
        </span>
        <MeetTheTeam />
        </section>
   

      {/* Final CTA */}
      <section className="h-screen flex flex-col items-center justify-center text-center bg-[#0F0F0F] relative">
        <img src="/assets/stock.jpeg" alt="cta-bg" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="z-10">
          <h2 className="text-[clamp(3rem,5vw,6rem)] font-bold mb-6">
            Ready To Build Something <span className="text-red-500">Extraordinary?</span>
          </h2>
          <button className="px-10 py-4 bg-red-500 hover:bg-red-600 transition rounded-full text-white text-lg mt-6">
            Start Your Project
          </button>
        </div>
      </section>

     <Footer />
    </div>
  );
};

export default About;
