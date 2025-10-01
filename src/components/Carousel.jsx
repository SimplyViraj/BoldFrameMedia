import React, { useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { Clock } from 'lucide-react';
gsap.registerPlugin(ScrollTrigger);
export default function Carousel({ products }) {
  const scrollRef = useRef(null);
  const headingRefs = useRef(null);

  // Heading animation
  useEffect(() => {
    if (!headingRefs.current) return;
    const lines = headingRefs.current.querySelectorAll("h2 span");
    gsap.fromTo(
      lines,
      { y: "100%", opacity: 0 },
      {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        ease: "cubic-bezier(0.9, 0.1, 0.1, 0.9)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: headingRefs.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  // Scroll buttons
  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Separate intro card from the rest
  const introCard = products.find((p) => p.type === "intro");
  const otherCards = products.filter((p) => p.type !== "intro");

  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <h2
          ref={headingRefs}
          className="text-2xl font-semibold tracking-tight inline-block overflow-hidden"
        >
          <span className="inline-block translate-y-full">
            {products[0].track}.{<br />}
          </span>
          <br />
          <span className="font-normal text-gray-500 text-lg inline-block">
            {products[0].description}
          </span>
        </h2>

        {/* Carousel */}
        <div className="relative mt-8 flex">
          {/* Fixed Intro Card */}
          {introCard && (
            <div className="min-w-[320px] max-w-[320px] flex-shrink-0 bg-white rounded-2xl shadow-md p-6 mr-6 sticky top-0">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {introCard.title}
                </h3>
                <p className="text-gray-600 whitespace-pre-line mt-2 text-sm">
                  {introCard.subtitle}
                </p>
              </div>
              <div className="flex gap-4 mt-6">
                {introCard.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt=""
                    className="w-20 h-20 rounded-xl object-contain"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scroll Buttons */}
          {/* <button
            onClick={() => scroll("left")}
            className="absolute left-8/30 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button> */}
          {/* Scrollable Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar"
          >
            <button
            onClick={() => scroll("left")}
            className="absolute top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          
            {otherCards.map((product) => (
              <div
                key={product.id}
                className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                onMouseEnter={(e) =>
                  gsap.to(e.currentTarget, {
                    y: -6,
                    duration: 0.7,
                    ease: "cubic-bezier(0.9, 0.1, 0.1, 0.9)",
                  })
                }
                onMouseLeave={(e) =>
                  gsap.to(e.currentTarget, {
                    y: 0,
                    duration: 0.7,
                    ease: "cubic-bezier(0.9, 0.1, 0.1, 0.9)",
                  })
                }
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
                <div className="p-5 flex flex-col gap-1.5">
                  <h3 className="text-lg font-semibold text-gray-900 tracking-tight">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-base font-medium text-gray-800 mt-2">
                    {product.price}{" "}
                    <span className="text-xs text-gray-500">(Incl. taxes)</span>
                  </p>
                  <p className="text-xs text-gray-500">
                    <Clock className="inline p-0 m-0 h-3" /> {product.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
