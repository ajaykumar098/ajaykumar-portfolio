import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LuX, LuMenu } from "react-icons/lu";
import portfolioData from "../../data/portfolioData";
import { useScroll } from "../../context/ScrollContext";
import { useActiveSection } from "../../hooks/useSpeech";
import ThemeToggle from "../ui/ThemeToggle";
import { cn } from "../../utils/helpers";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollToSection } = useScroll();
  const sectionIds = portfolioData.sections.map((s) => s.id);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navClick = (id) => {
    scrollToSection(id);
    setMenuOpen(false);
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "py-2 bg-paper/80 dark:bg-paper-dark/80 backdrop-blur-md shadow-sm panel-stroke border-x-0 border-t-0"
            : "py-4 bg-transparent"
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navClick("home")}
            className="font-display text-xl font-semibold hover:text-accent transition-colors"
          >
            AKS
          </button>

          <ul className="hidden md:flex items-center gap-1">
            {portfolioData.sections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navClick(id);
                  }}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                    active === id
                      ? "text-accent bg-accent/10"
                      : "hover:text-accent hover:bg-accent/5"
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              className="md:hidden w-10 h-10 flex items-center justify-center"
              aria-label="Open menu"
              onClick={() => setMenuOpen(true)}
            >
              <LuMenu size={22} />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink/40 dark:bg-black/60"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute top-0 right-0 h-full w-72 max-w-[85vw] bg-paper dark:bg-paper-dark panel-stroke border-y-0 border-r-0 p-6 pt-20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <button
                type="button"
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <LuX size={22} />
              </button>
              <ul className="flex flex-col gap-2">
                {portfolioData.sections.map(({ id, label }) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => navClick(id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg text-lg font-medium transition-colors",
                        active === id ? "bg-accent/15 text-accent" : "hover:bg-accent/5"
                      )}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
