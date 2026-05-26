/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Code2, GitMerge, GraduationCap, Award, CheckCircle, Terminal, HardDrive, ShieldAlert, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { TIMELINE_DATA, SKILLS_BADGES } from '../data.ts';

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="about" className="relative py-24 z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-450 uppercase tracking-widest mb-3">
            Mon Parcours
          </h2>
          <p className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Ingénieur passionné & Architecte solution
          </p>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Storytelling Grid: Text, Photo Accent */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column Story & Skill Badges */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="text-lg font-display font-bold text-zinc-900 dark:text-white mb-4">
                La quête de la robustesse et de la scalabilité
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans mb-4">
                Depuis plus de 8 ans, j’interviens auprès d’entreprises technologiques pour concevoir des systèmes web complexes. Expert Symfony certifié dans l’âme, je considère le code comme un actif à forte valeur ajoutée, qui doit être lisible, testable, et capable de grandir sans failles.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans mb-4">
                Mon approche de l’ingénierie logicielle s’appuie sur les préceptes de la <strong>Clean Architecture</strong>, du <strong>DDD (Domain-Driven Design)</strong>, et des normes de sécurité multi-tenants. Mon expertise s’étend de la conception de microservices interconnectés par bus de messages (RabbitMQ) à la livraison de portails headless de grande envergure.
              </p>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                Aujourd’hui développeur indépendant, j’accompagne mes clients de la phase de cadrage de leur architecture technique jusqu’au déploiement de solutions distribuées en continu.
              </p>
            </div>

            {/* Core Skills Badge Grid grouped by Category */}
            <div className="pt-6 border-t border-zinc-200/50 dark:border-white/5">
              <h4 className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-5">
                Cartographie des technologies maîtrisées
              </h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS_BADGES.map((badge, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-zinc-200/50 dark:border-white/5 bg-white/50 dark:bg-zinc-900/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:bg-indigo-500/10 hover:border-indigo-500/20"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>{badge.name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column stylized Photo Grid-Frame / Abstract Icon */}
          <div className="lg:col-span-5 relative">
            {/* Absolute Ambient Background Blur Behind Graphic */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-3xl filter blur-[40px] transform scale-95" />
            
            {/* Elegant Floating Glass Frame displaying profile metadata */}
            <div className="relative p-6 sm:p-8 rounded-2xl glass-card border border-zinc-200/60 dark:border-white/5 bg-white/40 dark:bg-zinc-900/10 shadow-2xl flex flex-col items-center text-center">
              
              {/* Graphic Profile Symbol / Avatar Container */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-indigo-400 p-1 mb-6 shadow-xl animate-pulse" style={{ animationDuration: '4s' }}>
                <div className="w-full h-full rounded-full bg-[#030303] flex items-center justify-center overflow-hidden">
                  {/* Decorative Abstract geometric layout of Symfony / PHP structure */}
                  <Terminal className="w-10 h-10 text-indigo-400" />
                </div>
                {/* Glow ring badge */}
                <div className="absolute bottom-0 right-0 p-2 rounded-full bg-indigo-600 text-white border-2 border-white dark:border-zinc-950">
                  <Award className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Developer Metadata */}
              <h4 className="text-xl font-display font-extrabold text-zinc-900 dark:text-white leading-none">
                Fenohasina Andrinirina
              </h4>
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-2 font-medium">
                Ingénieur Backend Freelance Expert
              </span>

              {/* Little detail attributes list */}
              <div className="w-full mt-6 pt-5 border-t border-zinc-200/50 dark:border-white/5 space-y-3.5 text-left text-xs font-sans text-zinc-500 dark:text-zinc-400">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-medium font-sans">Statut juridique</span>
                  <span className="font-semibold text-zinc-900 dark:text-white font-mono">Micro-entreprise</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-medium font-sans">Localisation</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">France (Disponible remote)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-medium font-sans">TJM moyen</span>
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400 font-mono">600€ - 700€ / jour</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 font-medium font-sans">Taux d'engagement</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">Temps plein ou partiel</span>
                </div>
              </div>

              {/* Fast Quote Badge */}
              <div className="mt-6 w-full p-3 rounded-xl bg-indigo-550/[0.03] dark:bg-indigo-500/[0.02] border border-indigo-500/10 text-[11px] font-mono leading-relaxed text-indigo-600 dark:text-indigo-400">
                "Plus rapide, plus robuste, mieux écrit."
              </div>
            </div>
          </div>

        </div>

        {/* Timeline representation block */}
        <div className="mt-28">
          <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 uppercase text-center mb-16">
            Chronologie de mon parcours professionnel
          </h3>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="relative border-l border-zinc-200 dark:border-white/5 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12"
          >
            {/* Absolute top circle gradient trigger */}
            <div className="absolute top-0 left-[-3.5px] w-1.5 h-1.5 rounded-full bg-indigo-500" />

            {TIMELINE_DATA.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className="relative group pr-2"
              >
                {/* Visual Timeline Marker Node */}
                <div className="absolute left-[-31px] sm:left-[-45px] top-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-white dark:bg-[#030303] border border-zinc-300 dark:border-white/10 group-hover:border-indigo-500 group-hover:scale-120 transition-all duration-300 shadow" />
                <div className="absolute left-[-31px] sm:left-[-45px] top-1 w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-indigo-500 scale-0 group-hover:scale-80 transition-transform duration-300" />

                {/* Milestones Content */}
                <span className="inline-block text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded mb-2">
                  {exp.period}
                </span>

                <h4 className="text-lg font-display font-extrabold text-zinc-900 dark:text-white leading-tight">
                  {exp.role}
                </h4>

                <span className="block text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 mt-1">
                  @ {exp.company}
                </span>

                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-3 max-w-2xl">
                  {exp.description}
                </p>

                {/* Achievements list */}
                <ul className="mt-4 space-y-2 max-w-2xl">
                  {exp.achievements.map((ach, index) => (
                    <li key={index} className="flex items-start text-xs text-zinc-600 dark:text-zinc-400 font-sans leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5 mr-2.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech badges list */}
                <div className="flex flex-wrap gap-1 pt-4 border-t border-zinc-100 dark:border-white/5 mt-4">
                  {exp.tech.map((t, index) => (
                    <span
                      key={index}
                      className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-zinc-100/60 dark:bg-zinc-900/30 text-zinc-500 dark:text-zinc-400 border border-zinc-200/10 dark:border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
