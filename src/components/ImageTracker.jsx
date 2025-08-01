import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function ImageTracker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Lock body overflow globally
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = "0";
    track.dataset.percentage = "0";

    const handleOnDown = (e) => {
      track.dataset.mouseDownAt = e.clientX;
    };

    const handleOnUp = () => {
      track.dataset.mouseDownAt = "0";
      track.dataset.prevPercentage = track.dataset.percentage;
    };

    const handleOnMove = (e) => {
      if (track.dataset.mouseDownAt === "0") return;

      const containerWidth = track.offsetWidth;
      const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
      const maxDelta = containerWidth / 2;

      const percentage = (mouseDelta / maxDelta) * -100;
      const nextPercentageUnconstrained =
        parseFloat(track.dataset.prevPercentage) + percentage;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      track.dataset.percentage = nextPercentage;

      track.animate(
        { transform: `translateX(${nextPercentage}%)` },
        { duration: 800, fill: "forwards", easing: "ease-out" }
      );

      for (const image of track.getElementsByClassName("about-image")) {
        image.animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: 800, fill: "forwards", easing: "ease-out" }
        );
      }
    };

    const handleWheel = (e) => {
      if (!track) return;

      const delta = e.deltaX || e.deltaY * 0.5; // slow it down by half
      if (Math.abs(delta) < 1) return;

      const containerWidth = track.offsetWidth;
      const maxDelta = containerWidth / 2;
      const percentage = (delta / maxDelta) * -50; // dampen to -50 instead of -100

      const nextPercentageUnconstrained =
        parseFloat(track.dataset.percentage) + percentage;
      const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

      track.dataset.percentage = nextPercentage;

      track.animate(
        { transform: `translateX(${nextPercentage}%)` },
        { duration: 1000, fill: 'forwards', easing: 'ease-out' }
      );

      for (const image of track.getElementsByClassName('about-image')) {
        image.animate(
          { objectPosition: `${100 + nextPercentage}% center` },
          { duration: 1000, fill: 'forwards', easing: 'ease-out' }
        );
      }
    };

    

    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("mouseup", handleOnUp);
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
    window.addEventListener("touchend", () => handleOnUp());
    window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      window.removeEventListener('mousedown', handleOnDown);
      window.removeEventListener('mouseup', handleOnUp);
      window.removeEventListener('mousemove', handleOnMove);
      window.removeEventListener('touchstart', (e) => handleOnDown(e.touches[0]));
      window.removeEventListener('touchend', () => handleOnUp());
      window.removeEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0F0F0F] overflow-hidden flex items-center justify-center relative">
      <div className='absolute left-0 p-4 inter-tight-700 text-white text-[clamp(5rem,2vw,6rem)] z-0'> 
       Some Of Our Work
      </div>
      <div
        ref={trackRef}
        className="image-tracker flex gap-4 absolute left-1/2 top-1/2 -translate-y-1/2  overflow-x-hidden z-10"
      >
          <img 
            src="/assets/stock1.jpeg"
            className="about-image"
            draggable="false"
          />
          <img
            src="/assets/stock2.jpeg"
            className="about-image"
            draggable="false"
          />
          <img
            src="/assets/stock3.jpeg"
            className="about-image"
            draggable="false"
          />
          <img
            src="/assets/stock4.jpeg"
            className="about-image"
            draggable="false"
          />
          <img
            src="/assets/stock5.jpeg"
            className="about-image"
            draggable="false"
          />
          <img
            src="/assets/stock6.jpeg"
            className="about-image"
            draggable="false"
          />
          <img
            src="/assets/stock7.jpeg"
            className="about-image"
            draggable="false"
          />
          <img
            src="/assets/stock8.jpeg"
            className="about-image"
            draggable="false"
          />
      </div>
    </div>
  );
}
