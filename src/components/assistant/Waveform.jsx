import { motion } from "framer-motion";

export default function Waveform({ active }) {
  return (
    <div className="flex items-center gap-0.5 h-5" aria-hidden={!active}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full bg-accent"
          animate={
            active
              ? { height: [4, 16, 8, 20, 6], transition: { repeat: Infinity, duration: 0.8, delay: i * 0.1 } }
              : { height: 4 }
          }
        />
      ))}
    </div>
  );
}
