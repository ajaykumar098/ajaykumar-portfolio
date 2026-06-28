import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuPlay, LuPause } from "react-icons/lu";
import ImageCarousel from "./ImageCarousel";
import { cn } from "../../utils/helpers";

const AUTO_ADVANCE_MS = 8000;

export default function SlideshowSection({
  id,
  subtitle,
  title,
  items,
  getItemKey,
  renderContent,
  narration,
  PlayButton,
  autoAdvance = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoAdvance);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);
  const progressRef = useRef(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!autoAdvance || !isPlaying || !isVisible) {
      clearInterval(timerRef.current);
      progressRef.current = 0;
      return;
    }

    timerRef.current = setInterval(() => {
      progressRef.current += 100;
      if (progressRef.current >= AUTO_ADVANCE_MS) {
        progressRef.current = 0;
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }
    }, 100);

    return () => clearInterval(timerRef.current);
  }, [autoAdvance, isPlaying, isVisible, items.length]);

  const handleNext = () => {
    setIsPlaying(false);
    progressRef.current = 0;
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setIsPlaying(false);
    progressRef.current = 0;
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    progressRef.current = 0;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentItem = items[currentIndex];

  return (
    <section id={id} ref={sectionRef} className="section-shell">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-subtitle">{subtitle}</p>
          <h2 className="section-title">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="w-10 h-10 flex items-center justify-center rounded-lg panel-stroke hover:bg-accent/10 transition-colors"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <LuPause size={18} /> : <LuPlay size={18} />}
          </button>
          {PlayButton && <PlayButton narration={narration} />}
        </div>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={getItemKey(currentItem, currentIndex)}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="w-full"
          >
            {renderContent(currentItem, currentIndex)}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            className="w-12 h-12 flex items-center justify-center rounded-full panel-stroke hover:bg-accent/10 transition-colors"
            aria-label="Previous"
          >
            <LuChevronLeft size={24} />
          </button>

          {/* Progress Indicator */}
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  progressRef.current = 0;
                  setCurrentIndex(idx);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  idx === currentIndex
                    ? "w-8 bg-accent dark:bg-accent-light"
                    : "bg-accent/30 dark:bg-accent-light/30"
                )}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-12 h-12 flex items-center justify-center rounded-full panel-stroke hover:bg-accent/10 transition-colors"
            aria-label="Next"
          >
            <LuChevronRight size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        {autoAdvance && isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/10 dark:bg-accent-light/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent dark:bg-accent-light"
              initial={{ width: 0 }}
              animate={{
                width: `${(progressRef.current / AUTO_ADVANCE_MS) * 100}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        )}
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-sm opacity-60 font-mono">
        {currentIndex + 1} / {items.length}
      </div>
    </section>
  );
}
