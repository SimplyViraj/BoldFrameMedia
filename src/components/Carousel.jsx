import React, { useEffect, useRef } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Carousel({ products }) {
  const scrollRef = useRef(null);
  const headingRefs = useRef(null);

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

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-6">
      
        <h2
          ref={headingRefs}
          className="text-2xl font-semibold tracking-tight inline-block overflow-hidden"
        >
          <span className="inline-block translate-y-full">
          Branding & Visual Design.{" "}
          </span>
          <br />
          <span className="font-normal text-gray-500 text-lg inline-block">
            Essentials that pair perfectly with your favourite devices.
          </span>
        </h2>

        {/* Carousel */}
        <div className="relative mt-8">
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 z-10 hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-scroll scroll-smooth no-scrollbar"
          >
            {products.map((product) =>
              product.type === "intro" ? (
                <div
                  key={product.id}
                  className="min-w-[320px] max-w-[320px] flex-shrink-0 bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line mt-2 text-sm">
                      {product.subtitle}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    {product.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt=""
                        className="w-20 h-20 rounded-xl object-contain"
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key={product.id}
                  className="min-w-[280px] max-w-[280px] flex-shrink-0 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full rounded-t-2xl object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-base font-medium text-gray-900 leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      MRP {product.price} (Incl. of all taxes)
                    </p>
                  </div>
                </div>
              )
            )}
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
