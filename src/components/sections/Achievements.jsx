import { LuMedal } from "react-icons/lu";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import SlideshowSection from "../ui/SlideshowSection";
import ImageCarousel from "../ui/ImageCarousel";

export default function Achievements() {
  return (
    <SlideshowSection
      id="achievements"
      subtitle="Achievements"
      title="Hackathons & Honors"
      items={portfolioData.achievements}
      getItemKey={(ach, idx) => ach.title || idx}
      narration={narrations.achievements}
      PlayButton={PlayButton}
      renderContent={(ach) => (
        <div className="w-full">
          <div className="grid lg:grid-cols-[65%_35%] gap-0">
            <div className="aspect-video w-full">
              <ImageCarousel images={ach.images} alt={ach.title} className="rounded-none h-full" />
            </div>
            <div className="p-6 flex flex-col justify-center panel-stroke border-l border-t border-b border-r-0 lg:border-l-0 lg:border-r">
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">{ach.title}</h3>
              <p className="text-base opacity-80 mb-1 text-justify hyphens-auto">{ach.issuer}</p>
              <p className="text-sm opacity-70 leading-relaxed mb-3 text-justify hyphens-auto">{ach.description}</p>
              <p className="text-sm font-mono opacity-60">{ach.date}</p>
            </div>
          </div>
        </div>
      )}
    />
  );
}
