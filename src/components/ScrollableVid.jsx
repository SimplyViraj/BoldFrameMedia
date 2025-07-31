import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { services } from "../constants";
import MobileMenu from "../components/MobileMenu";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollableVideo() {
    const sectionRefs = useRef([]);
    const videoRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, services.length);

        services.forEach((_, index) => {
            ScrollTrigger.create({
                trigger: sectionRefs.current[index],
                start: "top bottom",
                end: "bottom center",
                onEnter: () => setCurrentIndex(index),
                onEnterBack: () => setCurrentIndex(index),
            });
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    // Video scaling on scroll
    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            ScrollTrigger.getById(`video-${index}`)?.kill();
            if (index == 0) {
                video.style.transform = "scale(1)";
                return;
            }
            gsap.fromTo(
                video,
                { scale: 0 },
                {
                    scale: 1,
                    ease: "cubic-bezier(0.9,0.1,0.1,0.9)",
                    transformOrigin: "center center",
                    scrollTrigger: {
                        id: `video-${index}`,
                        trigger: sectionRefs.current[index],
                        start: "top bottom",
                        end: "bottom bottom",
                        scrub: true,

                    },
                }
            );
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <>
            <div className="flex flex-col md:flex-row">
                {/* Scrollable Content */}
                <div className="md:w-1/2 w-full">
                    {services.map((service, i) => (
                        <section
                            key={service.id}
                            ref={(el) => (sectionRefs.current[i] = el)}
                            className="h-screen flex flex-col justify-center px-32 bg-white"
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
                            <h2 className="text-5xl inter-tight-bold tracking-tight leading font-bold mb-2">{service.title}</h2>

                            {/* Divider */}
                            <hr className="border-[#D9D9D9] mb-4 w-full border-1" />

                            {/* Features */}
                            <div className="flex flex-wrap gap-x-[0.94rem] gap-y-[0.5rem] inter-500 mb-2 text-lg text-black">
                                {service.features?.map((feature, idx) => (
                                    <span key={idx} className="flex items-center">
                                        ● {feature}
                                    </span>
                                ))}
                            </div>

                            {/* Second Divider */}
                            <hr className="border-[#D9D9D9] mb-2 w-full border-1" />

                            {/* Description */}
                            <p className="text-[#9D9D9D] font-[0.99em] inter-300 leading-tight">
                                {service.description}
                            </p>
                        </section>
                    ))}
                </div>

                {/* Desktop Video Scaling */}
                <div className="hidden md:block w-1/2 h-screen bg-black sticky top-0 overflow-hidden">
                    {services.map((service, i) => (
                        <video
                            key={service.id}
                            ref={(el) => (videoRefs.current[i] = el)}
                            src={service.videoSrc}
                            muted
                            loop
                            playsInline
                            autoPlay
                            className="w-full h-full absolute inset-0 object-cover pointer-events-none scale-1"
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
