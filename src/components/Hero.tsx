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

          {/* Hero Right Visual Column - Premium Code + Photo Layered Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: 'spring', stiffness: 50, damping: 15, delay: 0.3 }}
            className="lg:col-span-5 relative flex items-center justify-center perspective-[1000px] w-full min-h-[460px]"
          >
            {/* Absolute Decorative Glow behind the visual dashboard */}
            <div className="absolute inset-0 bg-indigo-500/10 dark:bg-purple-500/10 rounded-3xl filter blur-[60px] transform scale-90 -z-10 animate-pulse" style={{ animationDuration: '6s' }} />

            {/* Microservices & API Visualizer Mock (Shifted back slightly slightly rotated) */}
            <div className="w-full max-w-[360px] sm:max-w-md glass-card rounded-2xl border border-zinc-200/40 dark:border-white/5 p-4 sm:p-5 shadow-xl relative overflow-hidden backdrop-blur-xl -translate-x-6 -translate-y-4 rotate-[-1deg] transition-all hover:rotate-0 duration-500">
              
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
              <ul className="space-y-3 font-mono text-[11px] text-zinc-650 dark:text-zinc-300">
                <li className="flex items-start">
                  <span className="text-zinc-400 select-none mr-2.5 w-3 text-right">1</span>
                  <span>
                    <span className="text-indigo-500 font-semibold">App\Entity:</span>
                  </span>
                </li>
                <li className="flex items-start pl-3.5">
                  <span className="text-zinc-400 select-none mr-2.5 w-3 text-right">2</span>
                  <span>
                    <span className="text-purple-400">Book:</span> <span className="text-zinc-400"># API Resource</span>
                  </span>
                </li>
                <li className="flex items-start pl-7 text-zinc-400 dark:text-zinc-400">
                  <span className="text-zinc-400 select-none mr-2.5 w-3 text-right">3</span>
                  <span>
                    <span className="text-purple-400">security:</span> 
                    <span className="text-indigo-500 font-medium"> "is_granted('ROLE_USER')"</span>
                  </span>
                </li>
                <li className="flex items-start pl-7">
                  <span className="text-zinc-400 select-none mr-2.5 w-3 text-right">4</span>
                  <span>
                    <span className="text-purple-400">operations:</span>
                  </span>
                </li>
                <li className="flex items-start pl-10 text-zinc-500 text-[10px]">
                  <span className="text-zinc-400 select-none mr-2.5 w-3 text-right">5</span>
                  <span>
                    - <span className="text-indigo-405 font-semibold">Get:</span> normalize: ['read']
                  </span>
                </li>
                <li className="flex items-start pl-10 text-zinc-500 text-[10px]">
                  <span className="text-zinc-400 select-none mr-2.5 w-3 text-right">6</span>
                  <span>
                    - <span className="text-indigo-405 font-semibold">Post:</span> <span className="text-amber-500 font-semibold">messenger:</span> true
                  </span>
                </li>
              </ul>

              {/* Floating metrics visual inside the code display */}
              <div className="mt-4 pt-3.5 border-t border-zinc-200/30 dark:border-white/5 grid grid-cols-3 gap-2">
                <div className="bg-zinc-100/30 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-white/5 rounded-lg p-2 text-center">
                  <Cpu className="w-3.5 h-3.5 mx-auto text-indigo-500 mb-0.5" />
                  <span className="block text-[8px] text-zinc-400 font-mono">CPU load</span>
                  <span className="block text-[10px] font-semibold text-zinc-850 dark:text-white font-mono mt-0.5">2.4%</span>
                </div>
                <div className="bg-zinc-100/30 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-white/5 rounded-lg p-2 text-center">
                  <Database className="w-3.5 h-3.5 mx-auto text-purple-500 mb-0.5" />
                  <span className="block text-[8px] text-zinc-400 font-mono">DB query</span>
                  <span className="block text-[10px] font-semibold text-zinc-850 dark:text-white font-mono mt-0.5">8ms</span>
                </div>
                <div className="bg-zinc-100/30 dark:bg-zinc-900/40 border border-zinc-200/40 dark:border-white/5 rounded-lg p-2 text-center">
                  <Server className="w-3.5 h-3.5 mx-auto text-indigo-400 mb-0.5" />
                  <span className="block text-[8px] text-zinc-400 font-mono">Cache hit</span>
                  <span className="block text-[10px] font-semibold text-zinc-850 dark:text-white font-mono mt-0.5">99.7%</span>
                </div>
              </div>
            </div>

            {/* Overlapping Premium Portrait Photo Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.55, type: 'spring', stiffness: 60, damping: 15 }}
              className="absolute bottom-1 right-2 sm:right-6 w-[170px] sm:w-[200px] rounded-2xl border border-zinc-200/60 dark:border-white/10 bg-white/90 dark:bg-zinc-950/90 p-2.5 sm:p-3 shadow-2xl z-20 backdrop-blur-md transform hover:translate-y-[-6px] hover:scale-[1.03] transition-all duration-300"
            >
              {/* Photo Container Frame with sleek gradient */}
              <div className="relative aspect-[1/1] w-full rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/40 dark:border-white/5 p-0.5 mb-2.5">
                <img
                  src="/src/assets/images/profile_photo_1779863617014.png"
                  alt="Fenohasina Andrinirina"
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />

                {/* Engagement status dot */}
                <span className="absolute bottom-2 left-2 inline-flex items-center space-x-1 px-2 py-1 rounded-full bg-emerald-500/90 text-[8px] text-white font-bold tracking-wide shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  <span>DISPO</span>
                </span>
                
                {/* Tech micro badge */}
                <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-indigo-600/95 text-[7px] text-white font-mono font-bold uppercase tracking-wider shadow">
                  ★ SYMFONY
                </span>
              </div>

              {/* Developer Info text */}
              <div className="text-left">
                <h4 className="text-xs font-display font-extrabold text-zinc-900 dark:text-white leading-tight">
                  Fenohasina A.
                </h4>
                <p className="text-[10px] font-mono font-medium text-zinc-500 dark:text-indigo-400 mt-0.5">
                  Architecte & Coder Senior
                </p>
              </div>
            </motion.div>

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
