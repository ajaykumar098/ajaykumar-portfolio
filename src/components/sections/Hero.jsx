import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import { asset } from "../../utils/helpers";
import { useScroll } from "../../context/ScrollContext";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const taglines = portfolioData.taglines;

export default function Hero() {
  const [curtainDone, setCurtainDone] = useState(false);
  const [tagIdx, setTagIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const { scrollToSection } = useScroll();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setCurtainDone(true);
      return;
    }
    const t = setTimeout(() => setCurtainDone(true), 1200);
    return () => clearTimeout(t);
  }, [reducedMotion]);

  useEffect(() => {
    const current = taglines[tagIdx];
    let charIdx = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (charIdx <= current.length) {
        setDisplayText(current.slice(0, charIdx));
        charIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => setTagIdx((i) => (i + 1) % taglines.length), 2000);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [tagIdx]);

  return (
    <section id="home" className="section-shell min-h-screen flex items-center justify-center">
      <div className="flex justify-end mb-2 md:absolute md:top-24 md:right-8 md:mb-0 z-10">
        <PlayButton narration={narrations.home} />
      </div>

      {!reducedMotion && (
        <>
          <motion.div
            className="fixed inset-y-0 left-0 w-1/2 z-40 bg-paper dark:bg-paper-dark pointer-events-none"
            initial={{ x: 0 }}
            animate={curtainDone ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="fixed inset-y-0 right-0 w-1/2 z-40 bg-paper dark:bg-paper-dark pointer-events-none"
            initial={{ x: 0 }}
            animate={curtainDone ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}

      <div className="flex flex-col lg:flex-row items-center w-full max-w-7xl mx-auto gap-6 lg:gap-10">
        {/* Left: Content — 55% */}
        <motion.div
          className="w-full lg:w-[55%] flex flex-col justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={curtainDone || reducedMotion ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.5 }}
        >
          <div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-3">
              {portfolioData.name}
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-mono font-medium h-8 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-accent to-violet dark:from-accent-light dark:to-violet-light">
              {displayText}
              <span className="animate-pulse">_</span>
            </p>
            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed opacity-85 text-justify">
              Artificial Intelligence and Data Science graduate with hands-on experience developing data-driven and AI-based solutions, eager to apply technical knowledge in a dynamic organization while continuously learning and growing professionally. Building intelligent systems that solve real-world problems from healthcare diagnostics to cybersecurity drives my passion for AI and data science.
            </p>

            {/* Quick info */}
            <div className="text-xs sm:text-sm opacity-80 mt-2 space-y-1">
              <p>📍 Thanjavur, Tamil Nadu</p>
              <p>🎓 B.Tech in AI & Data Science</p>
              <p>🎯 AI / ML / Cybersecurity / Software Development</p>
              <p>💼 Open to Internships & Full-time roles</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <button 
                type="button" 
                className="btn-primary" 
                style={{ padding: '8px 20px', fontSize: '14px' }}
                onClick={() => scrollToSection("projects")}
              >
                View Projects
              </button>
              <button 
                type="button" 
                className="btn-outline" 
                style={{ padding: '8px 20px', fontSize: '14px' }}
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: Profile photo — 45%, pushed to far right */}
        <motion.div
          className="w-full lg:w-[45%] lg:ml-auto flex items-center justify-center lg:justify-end min-h-[300px] md:min-h-[400px] lg:min-h-[500px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={curtainDone || reducedMotion ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.7 }}
        >
          <div className="relative w-full max-w-md min-h-[300px] md:min-h-[400px] lg:min-h-[500px] h-full">
            <div className="absolute -inset-4 rounded-2xl panel-stroke rotate-3 bg-gradient-to-br from-accent/15 to-violet/15" />
            <img
              src={asset("Profile - 1.jpeg")}
              alt={`${portfolioData.name} profile photo`}
              className="relative w-full h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] object-cover object-top rounded-2xl panel-stroke shadow-xl"
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
