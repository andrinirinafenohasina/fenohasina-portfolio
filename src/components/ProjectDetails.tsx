/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowLeft, CheckCircle2, MessageSquare, Briefcase, Calendar, Shield, Cpu, Gauge, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types.ts';
import ProjectGraphic from './ProjectGraphic.tsx';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function ProjectDetails({ project, onClose, onNavigate }: ProjectDetailsProps) {
  // Simple helper to segment stack items for clean grouping
  const getStackCategory = (tech: string) => {
    const lowercase = tech.toLowerCase();
    if (lowercase.includes('symfony') || lowercase.includes('laravel') || lowercase.includes('sylius') || lowercase.includes('drupal')) {
      return 'Framework';
    } else if (lowercase.includes('postgres') || lowercase.includes('oracle') || lowercase.includes('mysql') || lowercase.includes('influx') || lowercase.includes('db')) {
      return 'Base de données';
    } else if (lowercase.includes('rabbitmq') || lowercase.includes('messenger') || lowercase.includes('kafka')) {
      return 'Messagerie / Asynchrone';
    } else if (lowercase.includes('redis') || lowercase.includes('varnish') || lowercase.includes('blackfire')) {
      return 'Cache / Performance';
    } else if (lowercase.includes('docker') || lowercase.includes('swarm') || lowercase.includes('sentry')) {
      return 'Infra & DevOps';
    }
    return 'Technique';
  };

  // Group technical stack items
  const groupedStack: Record<string, string[]> = {};
  project.stack.forEach(tech => {
    const category = getStackCategory(tech);
    if (!groupedStack[category]) {
      groupedStack[category] = [];
    }
    groupedStack[category].push(tech);
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden glass-card dark:border-neutral-800/80 bg-white dark:bg-neutral-950 shadow-2xl z-20 my-12 border border-neutral-200"
    >
      {/* 1. Large Hero Visual Code Screen */}
      <div className="relative">
        <ProjectGraphic slug={project.slug} isDetailed={true} />
        
        {/* Detail Exit/Back Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-neutral-950/80 text-white backdrop-blur hover:bg-neutral-900 transition-colors cursor-pointer border border-neutral-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Fermer le projet</span>
        </button>

        {/* Float Category Tag */}
        <span className="absolute bottom-4 right-4 text-xs font-mono font-bold uppercase tracking-wider bg-emerald-500 text-white px-3 py-1 rounded-full shadow">
          {project.category}
        </span>
      </div>

      {/* 2. Main content container */}
      <div className="p-6 sm:p-10 lg:p-12 space-y-10">
        
        {/* Core Header info */}
        <div className="border-b border-neutral-200/50 dark:border-neutral-800/50 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-semibold tracking-widest text-emerald-500 uppercase block mb-1">
                EXPERT MISSION CASE
              </span>
              <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-neutral-900 dark:text-white leading-tight">
                {project.title}
              </h1>
            </div>
            
            {/* Quick Share Anchor */}
            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert("Lien du projet copié dans le presse-papiers !");
              }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Partager</span>
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-dashed border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center space-x-2.5">
              <Briefcase className="w-4 h-4 text-neutral-400" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-mono uppercase">Client / Agence</span>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-none">{project.client}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2.5">
              <Calendar className="w-4 h-4 text-neutral-400" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-mono uppercase">Période d'activité</span>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-none">{project.period}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Cpu className="w-4 h-4 text-neutral-400" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-mono uppercase">Rôle technique</span>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 leading-none">{project.role}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <Shield className="w-4 h-4 text-neutral-400" />
              <div>
                <span className="block text-[10px] text-neutral-400 font-mono uppercase">Statut d'exécution</span>
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 leading-none">Complété & Déployé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual KPI Performance Indicators */}
        <div className="bg-neutral-50 dark:bg-neutral-950/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-2xl p-6">
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-5 flex items-center">
            <Gauge className="w-4 h-4 text-emerald-500 mr-2" />
            Métriques d'Impact & Performance Backend
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {project.metrics.map((metric, i) => (
              <div key={i} className="text-center md:text-left border-l-2 border-emerald-500/20 pl-4">
                <span className="block text-2xl font-display font-extrabold text-neutral-900 dark:text-white">
                  {metric.value}
                </span>
                <span className="block text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Full description text */}
        <div>
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-3">
            Le Projet en détails
          </h3>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
            {project.fullDescription}
          </p>
        </div>

        {/* 2-Column: Problematique and Engineering Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch pt-2">
          {/* Problematic Frame */}
          <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.01] p-6 flex flex-col">
            <h4 className="text-xs font-mono font-bold text-red-500 dark:text-red-400 uppercase tracking-widest mb-3 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2" />
              Problématique & Challenge Technique
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
              {project.problematic}
            </p>
          </div>

          {/* Core Solution Frame */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.01] p-6 flex flex-col">
            <h4 className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest mb-3 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2" />
              Ingénierie & Solution Implémentée
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed flex-grow">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Segment: Features highlight list */}
        <div>
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-5">
            Fonctionnalités Clés du Système
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start space-x-3 bg-neutral-50 dark:bg-neutral-900/10 p-3.5 rounded-xl border border-neutral-200/20 dark:border-neutral-800/20">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-normal">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical stack grouping */}
        <div>
          <h3 className="text-xs font-mono font-bold tracking-widest text-neutral-400 uppercase mb-5">
            Cartographie de la Stack Technique
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(groupedStack).map(([category, items]) => (
              <div key={category} className="p-4 rounded-xl pb-5 border border-neutral-200/50 dark:border-neutral-800/40 bg-neutral-50/50 dark:bg-neutral-900/20">
                <span className="block text-[10px] font-mono font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-3">
                  {category}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item, idy) => (
                    <span
                      key={idy}
                      className="text-xs font-mono font-medium px-2.5 py-1 rounded-md bg-neutral-900 text-white dark:bg-white dark:text-neutral-950"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Call for conversion */}
        <div className="border-t border-neutral-200/50 dark:border-neutral-800/40 pt-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-center sm:text-left">
            <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 block">
              Ce type de réalisation correspond à votre projet ?
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 block mt-1">
              Discutons-en au cours d'un appel technique de cadrage gratuit de 30 minutes.
            </span>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => {
                onClose();
                onNavigate('contact');
              }}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/10 cursor-pointer transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Démarrer un projet</span>
            </button>
            <button
              onClick={onClose}
              className="inline-flex items-center space-x-2 px-5 py-3 rounded-xl text-xs font-semibold border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer transition-all"
            >
              <span>Retour</span>
            </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
