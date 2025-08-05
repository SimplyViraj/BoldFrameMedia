import { useEffect, useRef } from 'react';

export default function ImageTracker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

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
      const delta = e.deltaX || e.deltaY * 0.3;
      if (Math.abs(delta) < 1) return;

      const containerWidth = track.offsetWidth;
      const maxDelta = containerWidth / 2;
      const percentage = (delta / maxDelta) * -50;

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

    // Mouse & touch events
    window.addEventListener("mousedown", handleOnDown);
    window.addEventListener("mouseup", handleOnUp);
    window.addEventListener("mousemove", handleOnMove);
    window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
    window.addEventListener("touchend", handleOnUp);
    window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleOnDown);
      window.removeEventListener('mouseup', handleOnUp);
      window.removeEventListener('mousemove', handleOnMove);
      window.removeEventListener('touchstart', (e) => handleOnDown(e.touches[0]));
      window.removeEventListener('touchend', handleOnUp);
      window.removeEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center relative overflow-hidden no-scrollbar">
      <div>
        <span className='absolute top-0 left-0 text-[#9D9D9D] font-[0.99em] inter-300 leading-tight p-8'>
          (Our work)
        </span>
      </div>

  <div
    ref={trackRef}
    className="image-tracker flex gap-4 absolute left-1/2 top-1/2 -translate-y-1/2 z-10 select-none no-scrollbar"
    style={{ transform: "translateX(0%)", userSelect: "none" }}
  >
    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
      <img
        key={num}
        src={`/images/stock${num}.jpg`}
        className="about-image pointer-events-none select-none"
        draggable="false"
        onDragStart={(e) => e.preventDefault()}
      />
    ))}
  </div>
</div>

  );
}
