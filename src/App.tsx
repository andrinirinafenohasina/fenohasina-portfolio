/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground.tsx';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Services from './components/Services.tsx';
import Projects from './components/Projects.tsx';
import About from './components/About.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';

export default function App() {
  // Dark mode states (SaaS standard, defaults to Dark mode)
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return true; // default dark
  });

  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

  // Sync dark theme class on the document element for Tailwind responsiveness
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Tracking responsive scrolls with Intersection Observer for accurate active-section highlights
  useEffect(() => {
    // If we are inspecting a detailed project, skip general section highlights
    if (selectedProjectSlug) {
      setActiveSection('projects');
      return;
    }

    const sections = ['hero', 'services', 'projects', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -40% 0px', // Focused viewport center triggers section
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [selectedProjectSlug]);

  const handleNavigate = (sectionId: string) => {
    // If a project detail page is open, click highlights return to baseline first
    if (selectedProjectSlug) {
      setSelectedProjectSlug(null);
      window.location.hash = sectionId;
    }

    setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        const headerOffset = 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 50);
  };

  return (
    <div className={`min-h-screen text-zinc-900 dark:text-zinc-100 transition-colors duration-700 font-sans relative ${darkMode ? 'bg-[#030303]' : 'bg-zinc-50'}`}>
      
      {/* 1. Deep vector ambient light sources */}
      <AmbientBackground darkMode={darkMode} />

      {/* 2. Top level navigation triggers */}
      <Navbar
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* 3. Core structural views. If an architecture case is being reviewed, hide core scrolling blocks for native experience */}
      <main className="relative z-10">
        {selectedProjectSlug ? (
          <div className="pt-24 min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Projects
              onNavigate={handleNavigate}
              selectedProjectSlug={selectedProjectSlug}
              setSelectedProjectSlug={setSelectedProjectSlug}
            />
          </div>
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            <Services />
            <Projects
              onNavigate={handleNavigate}
              selectedProjectSlug={selectedProjectSlug}
              setSelectedProjectSlug={setSelectedProjectSlug}
            />
            <About />
            <Contact />
          </>
        )}
      </main>

      {/* 4. Global footer disclosures */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
