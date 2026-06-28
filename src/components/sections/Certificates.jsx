import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuPlay, LuPause } from "react-icons/lu";
import portfolioData from "../../data/portfolioData";
import { narrations } from "../../data/narrations";
import PlayButton from "../ui/PlayButton";
import { asset } from "../../utils/helpers";

const AUTO_ADVANCE_MS = 8000;

export default function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const timerRef = useRef(null);
  const sectionRef = useRef(null);

  const items = portfolioData.certificates;
  const currentItem = items[currentIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isPlaying || !isVisible || items.length < 2) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timerRef.current);
  }, [isPlaying, isVisible, items.length]);

  const handlePrev = () => { setIsPlaying(false); setCurrentIndex((prev) => (prev - 1 + items.length) % items.length); };
  const handleNext = () => { setIsPlaying(false); setCurrentIndex((prev) => (prev + 1) % items.length); };

  return (
    <section id="certificates" ref={sectionRef} className="section-shell">
      <div className="flex items-start justify-between mb-8">
        <div>
          <p className="section-subtitle">Certificates</p>
          <h2 className="section-title">Professional Certifications</h2>
        </div>
        <PlayButton narration={narrations.certificates} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.title}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="w-full"
        >
          <div className="grid lg:grid-cols-[65%_35%] gap-0">
            {/* Image with arrows inside */}
            <div style={{ position: 'relative' }} className="w-full">
              <img
                src={asset(currentItem.images[0])}
                alt={currentItem.title}
                className="w-full h-full object-contain rounded-xl"
                style={{ maxHeight: '70vh' }}
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                onClick={handlePrev}
                style={{
                  position: 'absolute', left: '12px', top: '50%',
                  transform: 'translateY(-50%)', zIndex: 20,
                  background: 'rgba(0,0,0,0.6)', border: 'none',
                  borderRadius: '50%', width: '36px', height: '36px',
                  color: 'white', cursor: 'pointer', fontSize: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >‹</button>
              <button
                type="button"
                onClick={handleNext}
                style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)', zIndex: 20,
                  background: 'rgba(0,0,0,0.6)', border: 'none',
                  borderRadius: '50%', width: '36px', height: '36px',
                  color: 'white', cursor: 'pointer', fontSize: '20px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >›</button>
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                style={{
                  position: 'absolute', top: '12px', right: '12px',
                  zIndex: 20, background: 'rgba(0,0,0,0.55)',
                  border: 'none', borderRadius: '50%',
                  width: '28px', height: '28px', color: 'white',
                  cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'center'
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <LuPause size={12} /> : <LuPlay size={12} />}
              </button>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-center panel-stroke border-l border-t border-b border-r-0 lg:border-l-0 lg:border-r">
              <h3 className="font-display text-xl md:text-2xl font-semibold mb-2">{currentItem.title}</h3>
              <p className="text-base opacity-80 mb-1">{currentItem.issuer}</p>
              <p className="text-sm font-mono opacity-60">{currentItem.date}</p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setIsPlaying(false); setCurrentIndex(idx); }}
            style={{
              height: '8px',
              width: idx === currentIndex ? '32px' : '8px',
              borderRadius: '9999px',
              background: idx === currentIndex ? '#67e8f9' : 'rgba(255,255,255,0.3)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0
            }}
          />
        ))}
      </div>

      <div className="text-center mt-4 text-sm opacity-60 font-mono">
        {currentIndex + 1} / {items.length}
      </div>
    </section>
  );
}