import Lenis from "lenis";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
    });

    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      if (typeof window !== "undefined") {
        delete (window as any).lenis;
      }
    };
  }, []);
}
