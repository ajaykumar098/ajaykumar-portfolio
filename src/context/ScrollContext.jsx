import { createContext, useContext, useCallback, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ScrollContext = createContext(null);

export function ScrollProvider({ children, lenisRef }) {
  const scrollToSection = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) {
        console.error(`Element with id "${id}" not found`);
        return;
      }
      
      // Simple reliable native scroll
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [lenisRef]
  );

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScroll must be used within ScrollProvider");
  return ctx;
}

export function useLenisRef() {
  return useRef(null);
}
