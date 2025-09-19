import React, { useEffect, useRef } from "react";

export default function ScrollPath() {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path || typeof path.getTotalLength !== "function") {
      console.warn("SVG path not available or getTotalLength unsupported");
      return;
    }

    // initial length + dash setup
    let length = path.getTotalLength();
    path.setAttribute("stroke-dasharray", length);
    path.setAttribute("stroke-dashoffset", length);

    let target = length;
    let current = length;
    let rafId = null;

    const doc = document.documentElement;

    const updateTarget = () => {
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      const scrollY = window.scrollY || window.pageYOffset || doc.scrollTop || 0;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 1;
      target = length - progress * length;
    };

    const onScroll = () => updateTarget();

    const onResize = () => {
      // Recompute path length if SVG or viewport scale changes
      length = path.getTotalLength();
      path.setAttribute("stroke-dasharray", length);
      updateTarget();
    };

    const animate = () => {
      // simple easing toward target
      current += (target - current) * 0.18;
      path.setAttribute("stroke-dashoffset", current);
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // start
    updateTarget();
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // your original 'd' string
  const d = `m355.55806,26.67908c77.16443,217.75782 -356.68844,132.13693 -316.06661,591.71916c153.83245,545.11426 790.47004,206.35276 740.054,854.77046c-31.64836,123.2837 -146.90235,276.6134 -625.84238,230.674c-229.95855,-50.4664 -121.34094,544.3187 -22.895,642.0533c177.00145,175.7225 265.11295,8.9322 497.25982,138.5774c168.87195,94.3086 184.12246,714.8868 -69.22951,686.9277`;

  return (
    <div className="h-[300vh] bg-white flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 802.354 3245.896"
        className="w-[400px] h-[600px]"
      >
        {/* guide dashed stroke */}
        <path d={d} fill="none" stroke="#000" strokeWidth="2" strokeDasharray="8" />

        {/* animated stroke (ref must be on the real <path>) */}
        <path ref={pathRef} d={d} fill="none" stroke="#000" strokeWidth="3" />
      </svg>
    </div>
  );
}
