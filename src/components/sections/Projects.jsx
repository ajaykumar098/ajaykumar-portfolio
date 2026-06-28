import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LuGithub, LuFileText } from "react-icons/lu";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import ImageCarousel from "../ui/ImageCarousel";
import { asset } from "../../utils/helpers";
import { useReducedMotion } from "../../hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          immediateRender: false,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 82%",
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

  return (
    <article ref={cardRef} className="flex flex-row items-center gap-8 px-4 rounded-2xl panel w-full" style={{ height: '85vh' }}>
      {/* Image - 65% */}
      <div style={{ width: '65%', height: '90%' }}>
        <ImageCarousel images={project.images} alt={project.title} className="rounded-xl h-full" objectFit="contain" />
      </div>

      {/* Content - 35% */}
      <div style={{ width: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '12px', padding: '8px 0' }}>
        <span className="text-[10px] font-mono text-accent dark:text-accent-light uppercase tracking-widest">
          Project {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="font-display font-semibold leading-tight" style={{ fontSize: '1.2rem', margin: 0 }}>
          {project.title}
        </h3>
        <p className="leading-relaxed opacity-85 text-justify" style={{ fontSize: '0.8rem', margin: 0 }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span key={t} className="px-1.5 py-0.5 text-[10px] rounded panel-stroke bg-accent/5 font-mono">
              {t}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={project.github} className="btn-outline text-xs py-1.5 px-3" target="_blank" rel="noopener noreferrer">
            <LuGithub size={12} /> GitHub
          </a>
          {project.pdf && (
            <a href={asset(project.pdf)} className="btn-outline text-xs py-1.5 px-3" target="_blank" rel="noopener noreferrer">
              <LuFileText size={12} /> View PDF
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-shell">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-subtitle">Projects</p>
          <h2 className="section-title">Featured Work</h2>
        </div>
        <PlayButton narration={narrations.projects} />
      </div>

      <div className="space-y-0">
        {portfolioData.projects.map((project, i) => (
          <div key={project.id} className="h-screen flex items-center justify-center overflow-hidden px-2">
            <ProjectCard project={project} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
