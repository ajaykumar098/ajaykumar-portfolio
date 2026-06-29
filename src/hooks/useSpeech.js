import { useState, useEffect, useCallback, useRef } from "react";

export function useActiveSection(sectionIds, offset = 120) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const onScroll = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, offset]);

  return active;
}

// Preference order for a male voice.
// We try these by name first (common on Chrome/Edge/Safari/iOS/Android), then fall back
// to any voice flagged "Male", then any en-US/en-GB voice.
const PREFERRED_VOICE_NAMES = [
  "Microsoft David",
  "Microsoft Guy Online (Natural) - English (United States)",
  "Microsoft Mark Online (Natural) - English (United States)",
  "Daniel",
  "Alex",
  "Google US English Male",
  "Google UK English Male",
  "Google US English",
  "en-US-Standard-B",
  "en-US-Standard-D",
  "com.apple.voice.compact.en-US.Samantha",
  "Samantha",
  "Fred",
  "Junior",
  "Ralph",
  "Thomas",
];

function pickMaleVoice(voices) {
  if (!voices?.length) return null;

  for (const name of PREFERRED_VOICE_NAMES) {
    const exact = voices.find((v) => v.name === name);
    if (exact) return exact;
  }

  const male = voices.find(
    (v) => /male|david|guy|mark|daniel|alex|james|john|tom/i.test(v.name) && /^en/i.test(v.lang)
  );
  if (male) return male;

  const enUS = voices.find((v) => v.lang === "en-US" && /male|david|guy|mark/i.test(v.name));
  if (enUS) return enUS;

  const anyEnUS = voices.find((v) => v.lang === "en-US");
  if (anyEnUS) return anyEnUS;

  const anyEn = voices.find((v) => /^en/i.test(v.lang));
  return anyEn || voices[0];
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synthRef = useRef(typeof window !== "undefined" ? window.speechSynthesis : null);
  const voiceRef = useRef(null);
  const voicesLoadedRef = useRef(false);

  useEffect(() => {
    if (!synthRef.current) return;

    const loadVoices = () => {
      const voices = synthRef.current.getVoices();
      if (voices.length) {
        voiceRef.current = pickMaleVoice(voices);
        voicesLoadedRef.current = true;
      }
    };

    loadVoices();
    synthRef.current.addEventListener?.("voiceschanged", loadVoices);
    return () => synthRef.current?.removeEventListener?.("voiceschanged", loadVoices);
  }, []);

  const speak = useCallback((text, onEnd) => {
    if (!synthRef.current || !text) return;
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.pitch = 0.6;
    if (voiceRef.current) {
      utterance.voice = voiceRef.current;
    }
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd?.();
    };
    utterance.onerror = () => setIsSpeaking(false);
    synthRef.current.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    synthRef.current?.cancel();
    setIsSpeaking(false);
  }, []);

  return {
    speak,
    stopSpeaking,
    isSpeaking,
  };
}
