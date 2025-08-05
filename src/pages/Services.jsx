import React from 'react'
import ScrollableVideo from '../components/ScrollableVid'
import Navbar2 from '../components/Navbar2'
import ImageTracker from '../components/ImageTracker';

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
    </div>
    
  );
}

export default Services;
