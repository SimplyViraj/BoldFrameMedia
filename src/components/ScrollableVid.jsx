import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { services } from "../constants";
import MobileMenu from "../components/MobileMenu";
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollableVideo() {
    const sectionRefs = useRef([]);
    const videoRefs = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        sectionRefs.current = sectionRefs.current.slice(0, services.length);

        services.forEach((_, index) => {
            ScrollTrigger.create({
                trigger: sectionRefs.current[index],
                start: "top bottom",
                end: "bottom bottom",
                onEnter: () => setCurrentIndex(index),
                onEnterBack: () => setCurrentIndex(index),
            });
        });

        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    useEffect(() => {
        videoRefs.current.forEach((video, index) => {
            if (!video) return;

            ScrollTrigger.getById(`video-${index}`)?.kill();
            if (index == 0) {
                video.style.scale = "1";
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
            <div className="flex flex-col md:flex-row bg-[#0f0f0f] text-white">
                {/* Scrollable Content */}
                <div className="md:w-1/2 w-full">
                    {services.map((service, i) => (
                        <section
                            key={service.id}
                            ref={(el) => (sectionRefs.current[i] = el)}
                            className=" relative md:h-screen flex flex-col justify-center md:px-32 bg-[#0f0f0f] scroll-smoother border-b-8 border-[#E5E5E5] md:pb-0"
                        >
                            
                            <div className="z-10">
                                <div className="flex items-center gap-3 px-4 md:px-0 mb-2">
                                    <h2 className="text-3xl md:text-5xl inter-tight-black tracking-tight leading font-bold">
                                        {service.title}
                                    </h2>
                                </div>
                                <div className="block md:hidden w-[100vw] h-64 mb-4 p-4 overflow-hidden">
                                    <video
                                        src={service.videoSrc}
                                        autoPlay={currentIndex === i}
                                        muted
                                        loop
                                        playsInline
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Divider */}
                                <hr className="border-[#D9D9D9] mb-4 hidden md:block w-full border-1" />

                                {/* Features */}
                                <div className="flex flex-wrap gap-x-[0.94rem] gap-y-[0.5rem] inter-500 mb-2 px-4 md:px-0 text-sm md:text-lg text-grey-200/60">
                                    {service.features?.map((feature, idx) => (
                                        <span key={idx} className="inter-tight-700 md:inter-700 flex items-center">
                                            ● {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Second Divider */}
                                <hr className="border-[#D9D9D9] w-full mb-2 hidden md:block border-1" />

                                {/* Description */}
                                <p className="text-[#4B4B4B] inter-tight-black opacity-[60%] leading-tight px-4 md:px-0 mt-6 md:mt-2 mb-10 text-sm md:text-base md:px-0">
                                    {service.description}
                                </p>
                                {/* Replace Link with button that navigates and scrolls to hash */}
                                <div className="px-4 md:px-0 mb-4">
                                    <button
                                        className="shadcn-btn px-4 py-2 rounded-md bg-white text-black text-sm font-semibold hover:bg-neutral-800 transition-colors"
                                        type="button"
                                        onClick={() => {
                                            navigate(`/services#${service.id}`);
                                            // Wait for navigation, then scroll to the element
                                            setTimeout(() => {
                                                const el = document.getElementById(service.id);
                                                if (el) el.scrollIntoView({ behavior: "smooth" });
                                            }, 100);
                                        }}
                                    >
                                        View in Services
                                    </button>
                                </div>
                                <hr className="border-[#D9D9D9] w-full md:hidden mb-2 md:block border-1" />
                            </div>
                        </section>

                    ))}
                </div>

                {/* Desktop Video Scaling */}
                <div className="hidden md:block w-1/2 h-screen bg-[#0F0F0F] sticky top-0 overflow-hidden">
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
