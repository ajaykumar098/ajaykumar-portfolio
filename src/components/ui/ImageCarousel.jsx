import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuChevronLeft, LuChevronRight, LuPlay, LuPause } from "react-icons/lu";
import { asset } from "../../utils/helpers";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const AUTOPLAY_INTERVAL = 8000;

export default function ImageCarousel({ images, alt, className = "", objectFit = "cover" }) {
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const reducedMotion = useReducedMotion();
  const timerRef = useRef(null);
  const wrapperRef = useRef(null);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAutoPlay(true);
        } else {
          setAutoPlay(false);
          setIndex(0);
        }
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    if (!autoPlay || reducedMotion || !images?.length || images.length < 2) return;
    timerRef.current = setInterval(next, AUTOPLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [autoPlay, reducedMotion, next, images?.length]);

  const manualGoTo = (fn) => {
    clearInterval(timerRef.current);
    fn();
  };

  if (!images?.length) {
    return (
      <div className={`frame-16-9 panel-stroke flex items-center justify-center text-sm opacity-60 ${className}`}>
        Preview coming soon
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className={`relative frame-16-9 panel-stroke group overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={index}
          src={asset(images[index])}
          alt={`${alt} - image ${index + 1}`}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          style={{ objectFit }}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => manualGoTo(prev)}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          >
            <LuChevronLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => manualGoTo(next)}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          >
            <LuChevronRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => setAutoPlay((p) => !p)}
            aria-label={autoPlay ? "Pause slideshow" : "Play slideshow"}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/55 text-white flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          >
            {autoPlay ? <LuPause size={12} /> : <LuPlay size={12} />}
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                onClick={() => manualGoTo(() => setIndex(i))}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-5 bg-accent-light" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}