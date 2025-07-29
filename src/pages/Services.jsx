import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import Navbar from "../components/Navbar";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "logo-design",
    title: "Logo Design",
    description: "We build magnetic brand identities.",
    videoSrc: "/videos/Cam.mp4",
    color: "black",
    color2: "bf-red",
  },
  {
    id: "web-design",
    title: "Web Design",
    description: "Crafting immersive digital experiences.",
    videoSrc: "/videos/Graphic Design.mp4",
    color: "black",
    color2: "bf-red",
  },
  {
    id: "marketing",
    title: "Marketing",
    description: "Helping your brand find its voice.",
    videoSrc: "/videos/Video Edit.mp4",
    color: "black",
    color2: "bf-red",
  },
];

export default function Services() {
  const sectionRefs = useRef([]);
  const scrollRef = useRef(null);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Index tracking based on scroll
  useEffect(() => {
    sectionRefs.current = sectionRefs.current.slice(0, services.length);

    services.forEach((_, index) => {
      ScrollTrigger.create({
        trigger: sectionRefs.current[index],
        start: "top center",
        end: "bottom center",
        scroller: scrollRef.current,
        onEnter: () => setCurrentIndex(index),
        onEnterBack: () => setCurrentIndex(index),
      });
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

useEffect(() => {
  videoRefs.current.forEach((video, index) => {
    if (!video) return;

    // Kill previous triggers
    ScrollTrigger.getById(`video-${index}`)?.kill();

    gsap.fromTo(
      video,
      { scale: 0 },
      {
        scale: 1,
        ease: "cubic-bezier(0.9, 0.1, 0.1, 0.9)",
        transformOrigin: "center center",
        scrollTrigger: {
          id: `video-${index}`,
          trigger: sectionRefs.current[index],
          start: "top bottom",
          end: "bottom bottom",
          scroller: scrollRef.current,
          scrub: true,
        },
      }
    );
  });

  return () => ScrollTrigger.getAll().forEach(t => t.kill());
}, []);

  return (
    <>
    <div className="bg-white h-screen">

    </div>
    <div className="flex flex-col md:flex-row h-screen">
      {/* Scrollable Content */}
      <div
        className="md:w-1/2 w-full overflow-y-scroll scroll-smooth h-screen no-scrollbar"
        ref={scrollRef}
      >
        {services.map((service, i) => (
          <section
            key={service.id}
            ref={(el) => (sectionRefs.current[i] = el)}
            className={`h-screen snap-start flex flex-col p-8 c-space r-space bg-${service.color}`}
          >
            {/* Mobile: video inside each section */}
            <div className="block md:hidden w-full h-64 mb-6 overflow-hidden rounded-xl shadow-lg">
              <video
                src={service.videoSrc}
                autoPlay={currentIndex === i}
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>

            <span
              className={`text-md font-light mb-3 text-${service.color2} c-space`}
            >
              0{i + 1}
            </span>
            <h2
              className={`text-3xl md:text-4xl font-bold mb-4 text-${service.color2} c-space`}
            >
              {service.title}
            </h2>
            <p className={`text-lg text-${service.color2} c-space`}>
              {service.description}
            </p>
          </section>
        ))}
      </div>

      {/* Desktop Video Scaling */}
      <div className="hidden md:block w-1/2 h-screen bg-black relative overflow-hidden">
        {services.map((service, i) => (
          <video
            key={service.id}
            ref={(el) => (videoRefs.current[i] = el)}
            src={service.videoSrc}
            muted
            loop
            playsInline
            autoPlay
            className={`w-full h-full absolute inset-0 object-cover pointer-events-none`}
            style={{
              transform: i === currentIndex ? "scale(1)" : "scale(0)",
            }}
          />
        ))}
      </div>
    </div>
    </>
  );
}
