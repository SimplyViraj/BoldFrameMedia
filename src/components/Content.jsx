import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useEffect,useRef} from 'react';

gsap.registerPlugin(ScrollTrigger);
export default function Content() {
      const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;

    gsap.set(img, {
      scale: 1.6,
      transformOrigin: '50% 0%',
    });

    gsap.to(img, {
      scale: 1, 
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: img,
        start: 'top center', 
        end: 'top top',    
        duration: 3,
        scrub: true,
      },
    });
  }, []);

    return (
        <section className>
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-12">
                <img
                    className="rounded-(--radius) grayscale"
                    src="https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2747&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="team image"
                    height=""
                    width=""
                    loading="lazy"
                    ref={imgRef}
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-12">
                    <h2 className="text-4xl font-medium">The Lyra ecosystem brings together our models, products and platforms.</h2>
                    <div className="space-y-6">
                        <p>Lyra is evolving to be more than just the models. It supports an entire ecosystem — from products to the APIs and platforms helping developers and businesses innovate.</p>

                        <Button
                            asChild
                            variant="secondary"
                            size="sm"
                            className="gap-1 pr-1.5">
                            <Link href="#">
                                <span>Learn More</span>
                                <ChevronRight className="size-2" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}