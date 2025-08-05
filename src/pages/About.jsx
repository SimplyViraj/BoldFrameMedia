import React, { useEffect } from 'react';
import MobileMenu from '../components/MobileMenu';
import ImageTracker from '../components/ImageTracker';
import MeetTheTeam from '../components/MeetTheTeam';

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

      {/* Navigation */}
      <MobileMenu />

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        >
          <source src="/assets/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="z-10 px-4">
          <h1 className="text-[clamp(3rem,6vw,7rem)] font-bold inter-tight leading-tight">
            Crafting <span className="text-red-500">Bold</span> Digital Experiences
          </h1>
          <p className="mt-6 text-gray-300 max-w-2xl mx-auto text-lg">
            We merge creativity, strategy, and technology to transform brands into unforgettable experiences.
          </p>
        </div>
        <div className="absolute bottom-10 text-gray-400 text-sm animate-bounce z-10">
          ↓ Scroll to Explore
        </div>
      </section>

      {/* Values Section */}
      <section className="min-h-screen bg-[#111] px-12 py-24 grid md:grid-cols-2 gap-16 relative">
        {[
          { title: 'RESULT ORIENTED', desc: 'We brainstorm collectively and implement actionable solutions that drive results.', img: '/assets/stock.jpeg' },
          { title: 'TRANSPARENT', desc: 'Clear communication and openness power everything we do.', img: '/assets/stock.jpeg' },
          { title: 'HELPING', desc: 'We nurture a culture of collaboration and shared growth.', img: '/assets/stock.jpeg' },
          { title: 'FREEDOM', desc: 'Creativity thrives when ideas can flow freely.', img: '/assets/stock.jpeg' }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-6 items-start">
            <img src={item.img} alt={item.title} className="w-32 h-32 rounded-lg object-cover shadow-lg" />
            <div>
              <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Our Work (Image Tracker) */}
      <section className="relative h-screen w-full">
        <ImageTracker />
      </section>

      {/* Story Section */}
      <section className="bg-[#0F0F0F] py-24 px-10 relative">
        <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-bold text-center mb-16">
          Our Journey
        </h2>
        <div className="flex flex-col gap-16 max-w-4xl mx-auto relative">
          {[
            { year: '2020', text: 'Founded with a vision to redefine creativity.' },
            { year: '2022', text: 'Expanded into full-service brand storytelling.' },
            { year: '2024', text: 'Partnered with global brands to deliver bold campaigns.' }
          ].map((step, idx) => (
            <div key={idx} className={`flex ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8 items-center`}>
              <div className="w-1/2">
                <h3 className="text-4xl text-red-500 font-bold">{step.year}</h3>
                <p className="text-gray-400 mt-4">{step.text}</p>
              </div>
              <div className="w-1/2">
                <img src="/assets/stock.jpeg" alt="journey" className="rounded-lg shadow-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>

    
        <MeetTheTeam />
   

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

      {/* Footer */}
      <footer className="py-10 text-center text-gray-600 text-sm border-t border-gray-800">
        © {new Date().getFullYear()} Bold Frame Media. All rights reserved.
      </footer>
    </div>
  );
};

export default About;
