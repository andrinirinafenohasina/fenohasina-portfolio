/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ArrowRight, Filter, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS_DATA } from '../data.ts';
import { Project } from '../types.ts';
import ProjectGraphic from './ProjectGraphic.tsx';
import ProjectDetails from './ProjectDetails.tsx';

interface ProjectsProps {
  onNavigate: (sectionId: string) => void;
  selectedProjectSlug: string | null;
  setSelectedProjectSlug: (slug: string | null) => void;
}

export default function Projects({ onNavigate, selectedProjectSlug, setSelectedProjectSlug }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync hash routing change on mount and hashchange event
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/projects/')) {
        const slug = hash.replace('#/projects/', '');
        const exists = PROJECTS_DATA.some(p => p.slug === slug);
        if (exists) {
          setSelectedProjectSlug(slug);
          // Auto scroll to project container
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (hash === '#projects' || hash === '#/projects') {
        setSelectedProjectSlug(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    // Initial load check
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setSelectedProjectSlug]);

  const selectProject = (slug: string) => {
    window.location.hash = `/projects/${slug}`;
    setSelectedProjectSlug(slug);
  };

  const closeProject = () => {
    window.location.hash = '/projects';
    setSelectedProjectSlug(null);
  };

  // Extract unique tags/categories for filters
  const categories = ["all", "SaaS Financier", "Supervision IoT", "Eco-Tech européenne", "Portail Public", "Système d'Information Géographique", "B2B & E-Commerce"];
  const categoryLabels: Record<string, string> = {
    'all': 'Tout',
    'SaaS Financier': 'Financier & SaaS',
    'Supervision IoT': 'IoT & Temps réel',
    'Eco-Tech européenne': 'Calculateurs & RSE',
    'Portail Public': 'Portails Publics',
    'Système d\'Information Géographique': 'SIG / Carto',
    'B2B & E-Commerce': 'B2B & ERP'
  };

  const filteredProjects = filter === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === filter);

  if (!mounted) return null;

  const activeProject = PROJECTS_DATA.find(p => p.slug === selectedProjectSlug);

  return (
    <section id="projects" className="relative py-24 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header containing visual introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-xs font-mono font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-3">
              Réalisations techniques
            </h2>
            <p className="text-3xl sm:text-4xl font-display font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Architectures de production éprouvées
            </p>
            <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mt-4 rounded-full" />
          </div>

          {/* Premium Dynamic Category Filter Bar */}
          <div className="flex flex-wrap gap-2 items-center bg-zinc-100/50 dark:bg-zinc-900/40 p-1.5 rounded-xl border border-zinc-200/50 dark:border-white/5 backdrop-blur-sm self-start md:self-end">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider px-2 flex items-center gap-1">
              <Filter className="w-3 h-3" />
              Filtrer:
            </span>
            {categories.map((cat) => {
              const isSelected = filter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  }`}
                >
                  {categoryLabels[cat] || cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Masonry Grid View - Always active as background state */}
        <motion.div
          layout
          key="grid-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => {
            // Determine the hover border classes based on project color tag
            let shadowGlowClass = 'hover:shadow-neon-emerald';
            let accentColorBorder = 'group-hover:text-emerald-500';
            
            if (project.accentColor === 'blue') {
              shadowGlowClass = 'hover:shadow-neon-blue';
              accentColorBorder = 'group-hover:text-blue-500';
            } else if (project.accentColor === 'cyan') {
              shadowGlowClass = 'hover:shadow-neon-cyan';
              accentColorBorder = 'group-hover:text-cyan-500';
            } else if (project.accentColor === 'amber') {
              shadowGlowClass = 'hover:shadow-neon-amber';
              accentColorBorder = 'group-hover:text-amber-500';
            } else if (project.accentColor === 'indigo') {
              shadowGlowClass = 'hover:shadow-neon-indigo';
              accentColorBorder = 'group-hover:text-indigo-500';
            } else if (project.accentColor === 'red') {
              shadowGlowClass = 'hover:shadow-neon-red';
              accentColorBorder = 'group-hover:text-red-500';
            }

            return (
              <motion.div
                layout
                key={project.slug}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`group rounded-2xl overflow-hidden glass-card dark:border-white/5 bg-white/40 dark:bg-zinc-900/10 border border-zinc-200/60 shadow-sm transition-all duration-300 ${shadowGlowClass} select-text flex flex-col`}
              >
                {/* Render Interactive Vector Graphical Header */}
                <div className="relative overflow-hidden cursor-pointer" onClick={() => selectProject(project.slug)}>
                  <ProjectGraphic slug={project.slug} />
                  <div className="absolute inset-0 bg-zinc-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-xl bg-white/95 text-zinc-950 text-xs font-semibold shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                      Consulter l'architecture
                    </span>
                  </div>
                </div>

                {/* Content Detail Wrap */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    {/* Meta Category & Date */}
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-3">
                      <span className="uppercase text-indigo-600 dark:text-indigo-400 font-bold tracking-wider">
                        {project.category}
                      </span>
                      <span>{project.period}</span>
                    </div>

                    {/* Title click trigger */}
                    <h3 className="text-xl font-display font-extrabold text-zinc-900 dark:text-white mb-2 leading-tight cursor-pointer" onClick={() => selectProject(project.slug)}>
                      {project.title}
                    </h3>

                    {/* Description excerpt */}
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                      {project.shortDescription}
                    </p>
                  </div>

                  {/* Technical Badges and CTA footer */}
                  <div className="pt-5 border-t border-zinc-200/40 dark:border-white/5">
                    {/* Mini Tech stack tags */}
                    <div className="flex flex-wrap gap-1 mb-5">
                      {project.stack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-zinc-400">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action link */}
                    <button
                      onClick={() => selectProject(project.slug)}
                      className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-800 dark:text-zinc-350 border border-zinc-200 dark:border-white/5 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:text-white cursor-pointer transition-colors duration-250 flex items-center justify-center"
                    >
                      Explorer les structures
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Dynamic Project Details Modal Overlay */}
        <AnimatePresence>
          {activeProject && (
            <ProjectDetails
              project={activeProject}
              onClose={closeProject}
              onNavigate={onNavigate}
            />
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
