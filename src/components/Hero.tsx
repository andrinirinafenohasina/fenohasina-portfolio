/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowDown, Mail, Cpu, Database, Server } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_DATA } from '../data.ts';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Animation container variants for staggered child entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 18,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden z-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Hero Left Content Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start space-y-6 text-left"
          >
            {/* Status Online Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              <span>Disponible en freelance</span>
            </motion.div>

            {/* Developer Title */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]"
            >
              <span className="block text-indigo-500 dark:text-indigo-450 font-sans text-sm sm:text-base font-bold tracking-widest uppercase mb-3">
                Expert Senior
              </span>
              <span>Symfony </span>
              <span className="block mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-400 bg-clip-text text-transparent">
                Backend Engineer.
              </span>
            </motion.h1>

            {/* Subtitle / Value Proposition */}
            <motion.p
              variants={itemVariants}
              className="max-w-xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans"
            >
              {HERO_DATA.subtitle}
            </motion.p>

            {/* Call To Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto"
            >
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/10 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Me contacter
                <Mail className="ml-2 w-4 h-4" />
              </button>
              
              <button
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 hover:bg-zinc-100 dark:hover:bg-zinc-900/40 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                Voir mes projets
              </button>
            </motion.div>

            {/* Counter Stats Section (With premium hover design) */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 sm:pt-14 border-t border-zinc-200/50 dark:border-white/5 w-full"
            >
              {HERO_DATA.stats.map((stat, i) => (
                <div key={i} className="group">
                  <div className="text-3xl font-display font-bold text-zinc-900 dark:text-white transition-all group-hover:text-indigo-500 dark:group-hover:text-indigo-400">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 mt-1 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Right Visual Column - Premium Code Dashboard Mock */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.3 }}
            className="lg:col-span-5 relative flex items-center justify-center perspective-[1000px] w-full"
          >
            {/* Absolute Decorative Glow behind the visual dashboard */}
            <div className="absolute inset-0 bg-indigo-500/10 dark:bg-purple-500/10 rounded-3xl filter blur-[60px] transform scale-90 -z-10" />

            {/* Microservices & API Visualizer Mock */}
            <div className="w-full max-w-md glass-card rounded-2xl border border-zinc-200/60 dark:border-white/5 p-5 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Window Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-200/30 dark:border-white/5 font-mono text-[10px]">
                <div className="flex items-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-400/80" />
                </div>
                <div className="text-zinc-400 dark:text-zinc-500 font-medium">api_platform_core.yaml</div>
                <div className="w-4 h-4 rounded bg-zinc-100 dark:bg-zinc-900" />
              </div>

              {/* Code blocks with live glowing parameters */}
              <ul className="space-y-3.5 font-mono text-xs text-zinc-600 dark:text-zinc-300">
                <li className="flex items-start">
                  <span className="text-zinc-400 select-none mr-3 w-4 text-right">1</span>
                  <span>
                    <span className="text-indigo-500 font-semibold">App\Entity:</span>
                  </span>
                </li>
                <li className="flex items-start pl-4">
                  <span className="text-zinc-400 select-none mr-3 w-4 text-right">2</span>
                  <span>
                    <span className="text-purple-400">Book:</span> <span className="text-zinc-400"># API Platform Resource</span>
                  </span>
                </li>
                <li className="flex items-start pl-8 text-zinc-400 dark:text-zinc-400">
                  <span className="text-zinc-400 select-none mr-3 w-4 text-right">3</span>
                  <span>
                    <span className="text-purple-400">attributes:</span> 
                    <br />
                    <span className="pl-4">security: </span>
                    <span className="text-indigo-500 font-medium">"is_granted('ROLE_USER')"</span>
                  </span>
                </li>
                <li className="flex items-start pl-8">
                  <span className="text-zinc-400 select-none mr-3 w-4 text-right">4</span>
                  <span>
                    <span className="text-purple-400">operations:</span>
                  </span>
                </li>
                <li className="flex items-start pl-12 text-zinc-500">
                  <span className="text-zinc-400 select-none mr-3 w-4 text-right">5</span>
                  <span>
                    - <span className="text-indigo-400 font-semibold">Get:</span> <span className="text-purple-400">normalization_context</span>: [groups: ['read']]
                  </span>
                </li>
                <li className="flex items-start pl-12 text-zinc-500">
                  <span className="text-zinc-400 select-none mr-3 w-4 text-right">6</span>
                  <span>
                    - <span className="text-indigo-400 font-semibold">Post:</span> <span className="text-amber-500 font-semibold">messenger:</span> true
                  </span>
                </li>
              </ul>

              {/* Floating metrics visual inside the code display */}
              <div className="mt-5 pt-4 border-t border-zinc-200/30 dark:border-white/5 grid grid-cols-3 gap-3">
                <div className="bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/30 dark:border-white/5 rounded-lg p-2.5 text-center">
                  <Cpu className="w-4 h-4 mx-auto text-indigo-500 mb-1" />
                  <span className="block text-[10px] text-zinc-400 font-mono">CPU load</span>
                  <span className="block text-xs font-semibold text-zinc-800 dark:text-white font-mono mt-0.5">2.4%</span>
                </div>
                <div className="bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/30 dark:border-white/5 rounded-lg p-2.5 text-center">
                  <Database className="w-4 h-4 mx-auto text-purple-500 mb-1" />
                  <span className="block text-[10px] text-zinc-400 font-mono">DB query</span>
                  <span className="block text-xs font-semibold text-zinc-800 dark:text-white font-mono mt-0.5">8ms</span>
                </div>
                <div className="bg-zinc-100/50 dark:bg-zinc-900/50 border border-zinc-200/30 dark:border-white/5 rounded-lg p-2.5 text-center">
                  <Server className="w-4 h-4 mx-auto text-indigo-400 mb-1" />
                  <span className="block text-[10px] text-zinc-400 font-mono">Cache hit</span>
                  <span className="block text-xs font-semibold text-zinc-800 dark:text-white font-mono mt-0.5">99.7%</span>
                </div>
              </div>

              {/* Glowing Ambient Light Badge overlay */}
              <span className="absolute bottom-2 right-3 font-mono text-[8px] text-zinc-400 dark:text-zinc-500 tracking-wider">
                V3.2 STABLE
              </span>
            </div>
          </motion.div>

        </div>

        {/* Scroll Down Visual Prompt */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => onNavigate('services')}>
          <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400">Découvrir</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5 text-neutral-400" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
