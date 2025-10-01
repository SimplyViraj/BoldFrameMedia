import React, { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollableVideo from "@/components/ScrollableVid";
import Testimonials from "@/components/Testimonials";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import FAQsThree from "@/components/FaqItems";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    // === Your GSAP animations ===
    const img = imgRef.current;
    gsap.set(img, { scale: 0.75, transformOrigin: "50% -50%" });

    gsap.to(img, {
      scale: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: img,
        start: "top center",
        end: "top top",
        scrub: true,
        markers: false,
      },
    });

    // Refresh ScrollTrigger in case of layout changes
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      // Properly kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-[#0F0F0F]">
      <Navbar />
      <Hero />

      <div className="relative flex justify-center items-center bg-fill max-w-[100%] mx-auto">
        <img
          ref={imgRef}
          src="/assets/stock.jpeg"
          alt="Scaling Image"
          className="image h-auto object-cover"
        />
      </div>

      <div className="flex flex-col items-center justify-center max-w-[65%] mx-auto text-white text-lg text-center mt-10">
        <h1 className="mb-4">
          We have over half a decade of experience upscaling businesses, making
          users happy, and utilising our expertise to set new standards. We go
          the extra mile to create impactful digital solutions for Fintech,
          SaaS, Healthcare, E-commerce, Web, and Mobile products.
        </h1>
        <span className="text-[#f93535] text-5xl p-20 font-inter-tight-bold text-rough font-bold">Still why choose us...?</span>
      </div>

      <div>
        <Features />
      </div>
      <div>
        <Testimonials />
      </div>
      <div className="py-20">
        <ScrollableVideo />
      </div>
      <FAQsThree />
      <Footer />
    </div>
  );
};

export default Home;
