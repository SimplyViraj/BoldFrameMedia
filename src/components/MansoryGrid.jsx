import React, { useEffect, useRef } from "react";

const images = [
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg", speed: 0.3, alt: "Gallery image 1" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-1.jpg", speed: 0.6, alt: "Gallery image 2" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-2.jpg", speed: 0.4, alt: "Gallery image 3" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-3.jpg", speed: 0.5, alt: "Gallery image 4" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-4.jpg", speed: 0.2, alt: "Gallery image 5" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-5.jpg", speed: 0.2, alt: "Gallery image 6" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-6.jpg", speed: 0.4, alt: "Gallery image 7" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-7.jpg", speed: 0.6, alt: "Gallery image 8" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-8.jpg", speed: 0.3, alt: "Gallery image 9" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-9.jpg", speed: 0.5, alt: "Gallery image 10" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-10.jpg", speed: 0.2, alt: "Gallery image 11" },
  { src: "https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image-11.jpg", speed: 0.6, alt: "Gallery image 12" },
];

export default function ParallaxGallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll("[data-speed]");
    const targets = Array.from(elements).map((el) => ({
      el,
      speed: parseFloat(el.getAttribute("data-speed")) || 0,
      current: 0,
      target: 0,
    }));

    const lerp = (a, b, n) => a + (b - a) * n;

    const animate = () => {
      targets.forEach((t) => {
        const rect = t.el.getBoundingClientRect();
        t.target = (window.innerHeight / 2 - rect.top) * t.speed * 0.5;

        // Smooth follow
        t.current = lerp(t.current, t.target, 0.15);
        t.el.style.transform = `translate3d(0, ${t.current}px, 0)`;
      });
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
      {Array(4)
        .fill(0)
        .map((_, colIndex) => (
          <div key={colIndex} className="grid gap-4">
            {images
              .slice(colIndex * 3, colIndex * 3 + 3)
              .map(({ src, speed, alt }, idx) => (
                <div key={idx} className="overflow-hidden rounded-lg">
                  <img
                    data-speed={speed}
                    src={src}
                    alt={alt}
                    loading="lazy"
                    className="h-auto max-w-full rounded-lg will-change-transform transform-gpu"
                  />
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}
