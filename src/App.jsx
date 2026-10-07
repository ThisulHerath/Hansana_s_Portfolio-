import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import "./App.css";
import { useState } from 'react';
import FloatingBackground from './components/FloatingBackground';
import useScrollSection from './hooks/useScrollSection';

export default function App() {
  const { activeSection, scene } = useScrollSection();
  const [paused, setPaused] = useState(false);
  return (
    <div className="portfolio" data-motion={paused ? 'paused' : 'playing'}>
      <FloatingBackground scene={scene} paused={paused} />
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar activeSection={activeSection} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
      </main>
      <Contact />
      <button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '↻ Resume motion' : 'Ⅱ Pause motion'}</button>
    </div>
  );
}
