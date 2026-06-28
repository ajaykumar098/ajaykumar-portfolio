import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import { getSkillIcon } from "../../data/skillIcons";
import PlayButton from "../ui/PlayButton";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  const sectionRef = useRef(null);
  const chipsRef = useRef([]);
  const reducedMotion = useReducedMotion();

  const allSkills = Object.entries(portfolioData.skills);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      chipsRef.current.forEach((chip, i) => {
        if (!chip) return;
        gsap.fromTo(
          chip,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            delay: (i % 8) * 0.04,
            scrollTrigger: {
              trigger: chip,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  let chipIndex = 0;

  return (
    <section id="skills" ref={sectionRef} className="section-shell scan-texture">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-subtitle">Skills</p>
          <h2 className="section-title">Technical Toolkit</h2>
        </div>
        <PlayButton narration={narrations.skills} />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {allSkills.map(([category, skills]) => (
          <div key={category} className="panel rounded-2xl p-6">
            <h3 className="font-display text-lg mb-4 text-accent dark:text-accent-light font-semibold">
              {category}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {skills.map((skill) => {
                const idx = chipIndex++;
                const { Icon, color } = getSkillIcon(skill);
                return (
                  <div
                    key={skill}
                    ref={(el) => (chipsRef.current[idx] = el)}
                    className="flex flex-col items-center gap-2 px-3 py-4 rounded-xl panel-stroke bg-paper/40 dark:bg-surface-dark/40 text-center hover:-translate-y-1 hover:shadow-md transition-all"
                  >
                    <Icon size={26} style={{ color }} aria-hidden />
                    <span className="text-xs font-medium leading-tight">{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
