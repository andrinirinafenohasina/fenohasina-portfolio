/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import { SERVICES_DATA } from '../data.ts';

// Dynamic Lucide icon component map helper
function ServiceIcon({ name, className }: { name: string; className?: string }) {
  // Safe lookup with fallsbacks
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.Cpu;
  return <IconComponent className={className} />;
}

export default function Services() {
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section id="services" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with subtle accent line */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-3">
            Expertise Backend
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Des services sur-mesure pour vos ambitions techniques
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-4 max-w-2xl mx-auto">
            De la conception de l'architecture de microservices à l'optimisation minutieuse des bases de données SQL, découvrez comment je propulse la performance de votre infrastructure.
          </p>
        </div>

        {/* Services Showcase Cards Grid */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {SERVICES_DATA.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ 
                y: -6,
                transition: { duration: 0.2, ease: 'easeOut' }
              }}
              className="relative p-7 rounded-2xl glass-card border border-zinc-200/60 dark:border-white/5 bg-white/40 dark:bg-zinc-900/10 hover:shadow-lg transition-all duration-300 shadow-sm flex flex-col justify-between group overflow-hidden"
            >
              {/* Subtle hover gradient ring background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div>
                {/* Floating, animated service category Icon */}
                <div className="inline-flex items-center justify-center p-3.5 bg-zinc-100 dark:bg-zinc-900 rounded-xl text-zinc-800 dark:text-zinc-200 border border-zinc-200/30 dark:border-white/5 mb-6 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white dark:group-hover:text-neutral-950 transition-all duration-300">
                  <ServiceIcon name={service.iconName} className="w-5 h-5 animate-pulse" />
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Technologies Sub-badges */}
              <div className="pt-4 border-t border-zinc-200/40 dark:border-white/5 flex flex-wrap gap-1.5">
                {service.tech.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono font-medium px-2 py-1 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border border-zinc-200/20 dark:border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
