import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ lenisRef, children }) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add("lenis");

    // Integrate Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use gsap ticker to keep ScrollTrigger in sync with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Disable default gsap smooth scrolling since Lenis handles it
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove("lenis");
    };
  }, [lenisRef, reducedMotion]);

  return children;
}
