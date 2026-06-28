import { ThemeProvider } from "./context/ThemeContext";
import { ScrollProvider, useLenisRef } from "./context/ScrollContext";
import SmoothScroll from "./components/layout/SmoothScroll";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Education from "./components/sections/Education";
import Skills from "./components/sections/Skills";
import Projects from "./components/sections/Projects";
import Certificates from "./components/sections/Certificates";
import Achievements from "./components/sections/Achievements";
import Resume from "./components/sections/Resume";
import Contact from "./components/sections/Contact";
import AIAssistant from "./components/assistant/AIAssistant";

function AppContent() {
  const lenisRef = useLenisRef();

  return (
    <ScrollProvider lenisRef={lenisRef}>
      <SmoothScroll lenisRef={lenisRef}>
        <div className="scan-texture min-h-screen">
          <Navbar />
          <main>
            <Hero />
            <Education />
            <Skills />
            <Projects />
            <Certificates />
            <Achievements />
            <Resume />
            <Contact />
          </main>
          <Footer />
          <AIAssistant />
        </div>
      </SmoothScroll>
    </ScrollProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
