import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuMapPin, LuGraduationCap, LuTarget, LuCircleDot } from "react-icons/lu";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const quickFacts = [
  { label: "Location", value: portfolioData.location, Icon: LuMapPin },
  { label: "Degree", value: "B.Tech AI & DS", Icon: LuGraduationCap },
  { label: "Focus", value: "AI / ML / Security", Icon: LuTarget },
  { label: "Status", value: "Open to opportunities", Icon: LuCircleDot, highlight: true },
];

export default function About() {
  const sectionRef = useRef(null);
  const pageRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        pageRef.current,
        { rotateY: -90, transformOrigin: "left center", opacity: 0 },
        {
          rotateY: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
            onRefresh: (self) => {
              // Force visibility if trigger is already past start point
              if (self.progress > 0 || self.scroll() > self.start) {
                gsap.set(pageRef.current, { rotateY: 0, opacity: 1 });
              }
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="section-shell scan-texture">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-subtitle">About</p>
          <h2 className="section-title">Who I Am</h2>
        </div>
        <PlayButton narration={narrations.about} />
      </div>

      <div
        ref={pageRef}
        className="grid lg:grid-cols-5 gap-8 items-stretch flex-1"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <motion.div
          className="lg:col-span-3 p-8 md:p-10 rounded-2xl panel flex flex-col"
          initial={{ opacity: 1 }}
        >
          <p className="text-xl md:text-2xl font-display leading-snug mb-6">
            {portfolioData.about.bio}
          </p>
          <p className="leading-relaxed opacity-80 mb-8 text-base md:text-lg">
            {portfolioData.about.drives}
          </p>

          <div className="mt-auto">
            <p className="text-xs uppercase tracking-widest opacity-50 font-mono mb-3">Outside of code</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {portfolioData.hobbies.map((h) => (
                <span key={h} className="px-3 py-1.5 rounded-full text-sm panel-stroke bg-violet/8 text-violet dark:text-violet-light">
                  {h}
                </span>
              ))}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm bg-gradient-to-r from-accent/10 to-violet/10 text-accent dark:text-accent-light panel-stroke font-medium">
              <LuTarget size={16} />
              Currently learning: {portfolioData.currentlyLearning}
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl panel flex flex-col">
          <h3 className="font-display text-xl font-semibold mb-1">Quick Facts</h3>
          <p className="text-sm opacity-60 mb-6">A snapshot, at a glance.</p>

          <div className="flex-1 flex flex-col justify-between gap-1">
            {quickFacts.map(({ label, value, Icon, highlight }) => (
              <div
                key={label}
                className="flex items-center justify-between py-4 border-b panel-stroke border-x-0 border-t-0 last:border-b-0"
              >
                <span className="flex items-center gap-2 text-sm opacity-60">
                  <Icon size={15} />
                  {label}
                </span>
                <span className={highlight ? "font-semibold text-accent dark:text-accent-light" : "font-medium"}>
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t panel-stroke border-x-0 border-b-0 grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="font-display text-3xl font-semibold text-accent dark:text-accent-light">4+</p>
              <p className="text-xs opacity-60 mt-1">AI/ML Projects</p>
            </div>
            <div>
              <p className="font-display text-3xl font-semibold text-violet dark:text-violet-light">9</p>
              <p className="text-xs opacity-60 mt-1">Certifications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
