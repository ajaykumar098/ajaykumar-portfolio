import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import ImageCarousel from "../ui/ImageCarousel";

export default function Education() {
  // Reorder: College (University), HSC, SSLC
  const items = [
    portfolioData.education.find((e) => e.id === "college"),
    portfolioData.education.find((e) => e.id === "hsc"),
    portfolioData.education.find((e) => e.id === "sslc"),
  ].filter(Boolean);

  return (
    <section id="education" className="section-shell">
      <div className="flex items-start justify-between mb-10">
        <div>
          <p className="section-subtitle">Education</p>
          <h2 className="section-title">Academic Background</h2>
        </div>
        <PlayButton narration={narrations.education} />
      </div>

      <div className="space-y-6 lg:space-y-0">
        {items.map((edu, index) => (
          <div key={edu.id} className="py-6 flex items-center justify-center">
            <article className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 p-4 md:p-6 lg:p-8 rounded-2xl panel h-auto lg:h-[85vh]">
              <div className="h-[40vh] lg:h-[75vh] w-full">
                <ImageCarousel images={edu.images} alt={edu.institution} className="rounded-none h-full" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-xs font-mono text-accent dark:text-accent-light uppercase tracking-widest mb-2">
                  Education {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg md:text-xl mb-2 font-semibold">{edu.institution}</h3>
                <p className="text-sm font-medium mb-1">{edu.degree}</p>
                <p className="text-xs opacity-70 mb-3">{edu.location}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-accent dark:text-accent-light font-mono uppercase tracking-wider">
                    {edu.year}
                  </span>
                  <span className="inline-block px-2 py-1 rounded-full text-xs bg-accent/10 text-accent dark:text-accent-light font-semibold">
                    {edu.score}
                  </span>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}
