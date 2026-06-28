import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext(null);

function getInitialTheme() {
  if (typeof document === "undefined") return "dark";
  const cookie = document.cookie.match(/theme=(light|dark)/);
  if (cookie) return cookie[1];
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
    document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
