/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ darkMode, toggleDarkMode, activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Accueil' },
    { id: 'services', label: 'Expertise' },
    { id: 'projects', label: 'Projets' },
    { id: 'about', label: 'Parcours' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-white/70 dark:bg-[#030303]/75 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/5 shadow-sm'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand / Developer Name */}
          <button 
            type="button"
            onClick={() => handleItemClick('hero')}
            className="flex items-center space-x-3 group text-left cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:scale-105 shadow-md shadow-indigo-500/20">
              <span className="text-sm font-display font-bold text-white">
                F
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <span className="block text-sm font-display font-semibold text-zinc-900 dark:text-white leading-none">
                Fenohasina Andrinirina
              </span>
              <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-medium tracking-wider">
                SYMFONY & API PLATFORM
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200/10 rounded-md -z-0"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Available Badge, Dark Mode & Premium CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Pulsing Status Pill */}
            <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Freelance Dispo</span>
            </div>

            {/* Dark Mode Switcher */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full border border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              aria-label="Changer de thème"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Quick Contact CTA */}
            <button
              onClick={() => handleItemClick('contact')}
              className="bg-zinc-900 text-white dark:bg-white dark:text-black border border-zinc-900 dark:border-white/15 text-xs font-bold px-4 py-2 rounded-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 hover:scale-[1.02] active:scale-95 transition-all text-sm font-semibold tracking-wide cursor-pointer transition-colors duration-205"
            >
              Contactez-moi
            </button>
          </div>

          {/* Mobile Menu Action Icon */}
          <div className="flex md:hidden items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg border border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg border border-zinc-200 dark:border-white/5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all cursor-pointer"
              aria-label="Ouvrir le menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (with slide & fade animations) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-zinc-200/50 dark:border-white/5 bg-white/95 dark:bg-[#030303]/95 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`block w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white pl-6 border-l-2 border-indigo-500'
                        : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900">
                <button
                  type="button"
                  onClick={() => handleItemClick('contact')}
                  className="flex w-full items-center justify-center px-4 py-3 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Me contacter
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
