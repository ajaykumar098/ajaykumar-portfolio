import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuFileText, LuDownload, LuExternalLink } from "react-icons/lu";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import { asset } from "../../utils/helpers";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export default function Resume() {
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          immediateRender: false,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            onRefresh: (self) => {
              if (self.progress > 0 || self.scroll() > self.start) {
                gsap.set(cardRef.current, { opacity: 1, y: 0 });
              }
            },
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const resumeHref = asset(portfolioData.resumePdf);

  return (
    <section id="resume" className="section-shell flex flex-col items-center">
      <div className="w-full flex items-start justify-between mb-10">
        <div>
          <p className="section-subtitle">Resume</p>
          <h2 className="section-title">Official Document</h2>
        </div>
        <PlayButton narration={narrations.resume} />
      </div>

      <div
        ref={cardRef}
        className="w-full max-w-xl panel rounded-2xl p-10 flex flex-col items-center text-center gap-5"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/15 to-violet/15 panel-stroke flex items-center justify-center text-accent dark:text-accent-light">
          <LuFileText size={28} />
        </div>
        <p className="opacity-80 max-w-sm">
          Full resume with education, skills, projects, and certifications.
        </p>
        <a
          href={resumeHref}
          download
          className="btn-primary"
        >
          <LuDownload size={16} />
          Download Resume
        </a>
        <a
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent dark:text-accent-light hover:underline flex items-center gap-1"
        >
          Preview PDF in new tab <LuExternalLink size={13} />
        </a>
      </div>
    </section>
  );
}
