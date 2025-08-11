// import { useEffect, useRef } from 'react';

// export default function ImageTracker() {
//   const trackRef = useRef(null);

//   useEffect(() => {
//     const track = trackRef.current;
//     if (!track) return;

//     track.dataset.mouseDownAt = "0";
//     track.dataset.prevPercentage = "0";
//     track.dataset.percentage = "0";

//     const handleOnDown = (e) => {
//       track.dataset.mouseDownAt = e.clientX;
//     };

//     const handleOnUp = () => {
//       track.dataset.mouseDownAt = "0";
//       track.dataset.prevPercentage = track.dataset.percentage;
//     };

//     const handleOnMove = (e) => {
//       if (track.dataset.mouseDownAt === "0") return;

//       const containerWidth = track.offsetWidth;
//       const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
//       const maxDelta = containerWidth / 2;

//       const percentage = (mouseDelta / maxDelta) * -100;
//       const nextPercentageUnconstrained =
//         parseFloat(track.dataset.prevPercentage) + percentage;
//       const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

//       track.dataset.percentage = nextPercentage;

//       track.animate(
//         { transform: `translateX(${nextPercentage}%)` },
//         { duration: 800, fill: "forwards", easing: "ease-out" }
//       );

//       for (const image of track.getElementsByClassName("about-image")) {
//         image.animate(
//           { objectPosition: `${100 + nextPercentage}% center` },
//           { duration: 800, fill: "forwards", easing: "ease-out" }
//         );
//       }
//     };

//     const handleWheel = (e) => {
//       const delta = e.deltaX || e.deltaY * 0.3;
//       if (Math.abs(delta) < 1) return;

//       const containerWidth = track.offsetWidth;
//       const maxDelta = containerWidth / 2;
//       const percentage = (delta / maxDelta) * -50;

//       const nextPercentageUnconstrained =
//         parseFloat(track.dataset.percentage) + percentage;
//       const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

//       track.dataset.percentage = nextPercentage;

//       track.animate(
//         { transform: `translateX(${nextPercentage}%)` },
//         { duration: 1000, fill: 'forwards', easing: 'ease-out' }
//       );

//       for (const image of track.getElementsByClassName('about-image')) {
//         image.animate(
//           { objectPosition: `${100 + nextPercentage}% center` },
//           { duration: 1000, fill: 'forwards', easing: 'ease-out' }
//         );
//       }
//     };

//     // Mouse & touch events
//     window.addEventListener("mousedown", handleOnDown);
//     window.addEventListener("mouseup", handleOnUp);
//     window.addEventListener("mousemove", handleOnMove);
//     window.addEventListener("touchstart", (e) => handleOnDown(e.touches[0]));
//     window.addEventListener("touchend", handleOnUp);
//     window.addEventListener("touchmove", (e) => handleOnMove(e.touches[0]));
//     window.addEventListener("wheel", handleWheel, { passive: true });

//     return () => {
//       window.removeEventListener('mousedown', handleOnDown);
//       window.removeEventListener('mouseup', handleOnUp);
//       window.removeEventListener('mousemove', handleOnMove);
//       window.removeEventListener('touchstart', (e) => handleOnDown(e.touches[0]));
//       window.removeEventListener('touchend', handleOnUp);
//       window.removeEventListener('touchmove', (e) => handleOnMove(e.touches[0]));
//       window.removeEventListener('wheel', handleWheel);
//     };
//   }, []);

//   return (
//     <div className="h-screen w-screen bg-white flex items-center justify-center relative overflow-hidden no-scrollbar">
//       <div>
//         <span className='absolute top-0 left-0 text-[#9D9D9D] font-[0.99em] inter-300 leading-tight p-8'>
//           (Our work)
//         </span>
//       </div>

//   <div
//     ref={trackRef}
//     className="image-tracker flex gap-4 absolute left-1/2 top-1/2 -translate-y-1/2 z-10 select-none no-scrollbar"
//     style={{ transform: "translateX(0%)", userSelect: "none" }}
//   >
//     {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
//       <img
//         key={num}
//         src={`/images/stock${num}.jpg`}
//         className="about-image pointer-events-none select-none"
//         draggable="false"
//         onDragStart={(e) => e.preventDefault()}
//       />
//     ))}
//   </div>
// </div>

//   );
// }


import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ImageTracker() {
  const trackRef = useRef(null);
  const stateRef = useRef({
    mouseDownAt: 0,
    prevPercentage: 0,
    percentage: 0,
    pointerId: null,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const getImages = () => track.getElementsByClassName("about-image");

    const setTransforms = (next) => {
      track.style.transform = `translateX(${next}%)`;
      for (const img of getImages()) {
        img.style.objectPosition = `${100 + next}% center`;
      }
    };

    setTransforms(0);

    const onPointerDown = (e) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      stateRef.current.mouseDownAt = e.clientX;
      stateRef.current.pointerId = e.pointerId ?? null;
      track.style.transition = "none";
      for (const img of getImages()) img.style.transition = "none";
      try {
        if (track.setPointerCapture && e.pointerId != null) {
          track.setPointerCapture(e.pointerId);
        }
      } catch {}
    };

    const onPointerMove = (e) => {
      if (stateRef.current.mouseDownAt === 0) return;
      if (
        stateRef.current.pointerId != null &&
        e.pointerId != null &&
        e.pointerId !== stateRef.current.pointerId
      )
        return;

      const containerWidth = track.offsetWidth || window.innerWidth;
      const mouseDelta = stateRef.current.mouseDownAt - e.clientX;
      const maxDelta = containerWidth / 2;
      const percentage = (mouseDelta / maxDelta) * -100;
      const nextUn = stateRef.current.prevPercentage + percentage;
      const next = Math.max(Math.min(nextUn, 0), -100);
      stateRef.current.percentage = next;
      setTransforms(next);
    };

    const onPointerUp = (e) => {
      if (
        stateRef.current.pointerId != null &&
        e.pointerId != null &&
        e.pointerId !== stateRef.current.pointerId
      )
        return;

      stateRef.current.mouseDownAt = 0;
      stateRef.current.prevPercentage = stateRef.current.percentage;
      stateRef.current.pointerId = null;

      track.style.transition = "transform 0.8s ease-out";
      for (const img of getImages()) {
        img.style.transition = "object-position 0.8s ease-out";
      }
      setTransforms(stateRef.current.percentage);

      try {
        if (track.releasePointerCapture && e.pointerId != null) {
          track.releasePointerCapture(e.pointerId);
        }
      } catch {}
    };

    const onWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaX || e.deltaY * 0.3;
      if (Math.abs(delta) < 1) return;
      const containerWidth = track.offsetWidth || window.innerWidth;
      const maxDelta = containerWidth / 2;
      const percentage = (delta / maxDelta) * -50;
      const nextUn = stateRef.current.percentage + percentage;
      const next = Math.max(Math.min(nextUn, 0), -100);
      stateRef.current.percentage = next;
      stateRef.current.prevPercentage = next;

      track.style.transition = "transform 1s ease-out";
      for (const img of getImages()) {
        img.style.transition = "object-position 1s ease-out";
      }
      setTransforms(next);
    };

    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    track.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      track.removeEventListener("wheel", onWheel);
    };
  }, []);

  const handleHoverIn = (e) => {
    const letters = e.currentTarget.querySelectorAll(".letter");
    const picture = e.currentTarget.querySelector("img");
    gsap.killTweensOf(letters);
    gsap.fromTo(
      letters,
      { y: "100%", opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "cubic-bezier(0.9,0.1,0.1,0.9)" }
    );
    gsap.to(picture,{scale: 1.09, duration: 0.5, ease: "cubic-bezier(0.9,0.1,0.1,0.9)"});

  };

  const handleHoverOut = (e) => {
    const letters = e.currentTarget.querySelectorAll(".letter");
    const picture = e.currentTarget.querySelector("img");
    gsap.killTweensOf(letters);
    gsap.to(letters, {
      y: "100%",
      opacity: 0,
      duration: 0.5,
      stagger: 0.03,
      ease: "cubic-bezier(0.9,0.1,0.1,0.9)",
    });
    gsap.to(picture,{scale: 1, duration: 0.5, ease: "cubic-bezier(0.9,0.1,0.1,0.9)"});
  };

  const images = [
    { num: 1, text: "Udgam" },
    { num: 2, text: "Udgam" },
    { num: 3, text: "Udgam" },
    { num: 4, text: "Udgam" },
    { num: 5, text: "Udgam" },
    { num: 6, text: "Udgam" },
    { num: 7, text: "Udgam" },
    { num: 8, text: "Udgam" },
  ];

  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center relative overflow-hidden no-scrollbar">
      <span className="absolute top-0 left-0 text-[#9D9D9D] text-sm p-8">
        (Our work)
      </span>

      <div
        ref={trackRef}
        className="image-tracker flex gap-4 absolute left-1/2 top-1/2 -translate-y-1/2 z-10 select-none no-scrollbar"
        style={{ transform: "translateX(0%)", userSelect: "none" }}
      >
        {images.map(({ num, text }) => (
          <div
            key={num}
            className="relative overflow-hidden"
            style={{ flex: "0 0 auto" }}
            onMouseEnter={handleHoverIn}
            onMouseLeave={handleHoverOut}
          >
            <img
              src={`/images/stock${num}.jpg`}
              className="about-image select-none w-[320px] h-[460px] object-cover"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
              alt={text}
              style={{ objectPosition: "100% center" }}
            />
            <span
              className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-lg font-semibold flex gap-[2px] select-none pointer-events-none"
              aria-hidden
            >
              {text.split(" ").map((char, i) => (
                <span
                  key={i}
                  className="letter inline-block opacity-0"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
