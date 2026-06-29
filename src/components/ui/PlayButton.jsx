import { motion } from "framer-motion";
import { LuPlay, LuSquare } from "react-icons/lu";
import { useSpeech } from "../../hooks/useSpeech";
import { cn } from "../../utils/helpers";

export default function PlayButton({ narration, className, label = "Play section narration" }) {
  const { speak, stopSpeaking, isSpeaking } = useSpeech();

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(narration);
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={isSpeaking ? "Stop narration" : label}
      className={cn(
        "hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium panel-stroke transition-colors",
        isSpeaking ? "bg-accent/15 text-accent dark:text-accent-light" : "hover:bg-accent/10",
        className
      )}
      whileTap={{ scale: 0.95 }}
    >
      {isSpeaking ? <LuSquare size={12} /> : <LuPlay size={12} />}
      <span>{isSpeaking ? "Stop" : "Listen"}</span>
    </motion.button>
  );
}
