/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BarChart3, Binary, HardDrive, Map, Network, Settings, Waypoints } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectGraphicProps {
  slug: string;
  isDetailed?: boolean;
}

export default function ProjectGraphic({ slug, isDetailed = false }: ProjectGraphicProps) {
  // Let's render custom visual content based on the slug
  switch (slug) {
    case 'contab':
      return (
        <div className={`relative w-full overflow-hidden flex flex-col justify-between p-4 h-48 sm:h-56 bg-gradient-to-br from-emerald-950 via-neutral-950 to-neutral-900 border-b border-neutral-800 ${isDetailed ? 'h-64 sm:h-80' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-emerald-400">api.contab.io/transactions/v1</span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[8px] font-mono font-bold">LIVE</span>
          </div>
          
          <div className="my-auto flex items-end justify-between h-20 px-2">
            {[34, 45, 67, 43, 89, 72, 95, 60, 52, 85, 110, 92].map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ height: 0 }}
                animate={{ height: `${val / 1.3}%` }}
                transition={{ duration: 1, delay: idx * 0.05 }}
                className="w-1.5 sm:w-2 rounded-t bg-gradient-to-t from-emerald-600 to-emerald-400"
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span className="flex items-center">
              <BarChart3 className="w-3 h-3 text-emerald-500 mr-1" />
              Volume: +14,242M€
            </span>
            <span>Rapprochement: 99.2%</span>
          </div>
        </div>
      );

    case 'pazzi-control-center':
      return (
        <div className={`relative w-full overflow-hidden flex flex-col justify-between p-4 h-48 sm:h-56 bg-gradient-to-br from-blue-950 via-neutral-950 to-neutral-900 border-b border-neutral-800 ${isDetailed ? 'h-64 sm:h-80' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-blue-400">ekim_automations_swarm</span>
            <span className="px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 text-[8px] font-mono font-bold">RABBITMQ ACTIVE</span>
          </div>

          {/* Interactive Microservices Topology */}
          <div className="relative flex items-center justify-center my-auto h-24">
            <div className="absolute w-12 h-12 rounded-full border border-blue-500 bg-neutral-900 flex items-center justify-center">
              <Settings className="w-5 h-5 text-blue-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            
            {/* Satellites */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <div
                key={i}
                className="absolute w-6 h-6 rounded-md bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[8px] text-blue-300 font-mono"
                style={{
                  transform: `rotate(${deg}deg) translate(50px) rotate(-${deg}deg)`
                }}
              >
                M{i + 1}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span className="flex items-center">
              <Network className="w-3 h-3 text-blue-500 mr-1" />
              Télémétries: 2400 M
            </span>
            <span>Latence: &lt;45ms</span>
          </div>
        </div>
      );

    case 'tkblue':
      return (
        <div className={`relative w-full overflow-hidden flex flex-col justify-between p-4 h-48 sm:h-56 bg-gradient-to-br from-cyan-950 via-neutral-950 to-neutral-900 border-b border-neutral-800 ${isDetailed ? 'h-64 sm:h-80' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-400">tkblue_carbon_engine_iso</span>
            <span className="px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-400 text-[8px] font-mono font-bold">99.9% ACCURACY</span>
          </div>

          <div className="my-auto flex flex-col justify-center space-y-2">
            <div className="flex justify-between items-center bg-neutral-950/80 p-2 rounded border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400">Expéditeur: Marseille, FR</span>
              <span className="text-[10px] font-mono text-emerald-400">✓ Validation géocodage</span>
            </div>
            <div className="flex justify-between items-center bg-neutral-950/80 p-2 rounded border border-neutral-800">
              <span className="text-[10px] font-mono text-neutral-400">Calculateur GES</span>
              <span className="text-[10px] font-mono text-cyan-400 font-bold">50ms (Optimisé)</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span className="flex items-center">
              <Waypoints className="w-3 h-3 text-cyan-500 mr-1" />
              Routing: Active Multisites
            </span>
            <span>CO2 corrigé: 1.2M Tonnes</span>
          </div>
        </div>
      );

    case 'breizhgo':
      return (
        <div className={`relative w-full overflow-hidden flex flex-col justify-between p-4 h-48 sm:h-56 bg-gradient-to-br from-amber-950 via-neutral-950 to-neutral-900 border-b border-neutral-800 ${isDetailed ? 'h-64 sm:h-80' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-amber-400">breizhgo_gtfs_unify</span>
            <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 text-[8px] font-mono font-bold">VARNISH HIT: 98%</span>
          </div>

          <div className="my-auto font-mono text-[9px] bg-neutral-950/80 p-3 rounded border border-neutral-800/80 space-y-1.5 leading-tight">
            <span className="text-amber-500">GET /api/v2/schedule/brest_rennes</span>
            <div className="text-neutral-500">Response cache: HIT (expires 12h)</div>
            <div className="text-emerald-400 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-ping"></span>
              96.5% d'accessibilité RGAA validée
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span className="flex items-center">
              <Map className="w-3 h-3 text-amber-500 mr-1" />
              Utilisateurs: 1.8M/mois
            </span>
            <span>Varnish response: 12ms</span>
          </div>
        </div>
      );

    case 'camele-eau':
      return (
        <div className={`relative w-full overflow-hidden flex flex-col justify-between p-4 h-48 sm:h-56 bg-gradient-to-br from-indigo-950 via-neutral-950 to-neutral-900 border-b border-neutral-800 ${isDetailed ? 'h-64 sm:h-80' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-indigo-400">camele_gis_postgis_mapper</span>
            <span className="px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-400 text-[8px] font-mono font-bold">POSTGIS</span>
          </div>

          {/* Interactive Geographic Pipe Visual */}
          <div className="relative my-auto h-24 flex items-center justify-center overflow-hidden">
            <svg className="w-full h-full opacity-60" viewBox="0 0 100 50">
              <path d="M 10 25 Q 30 10 50 25 T 90 25" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="5, 3" />
              <path d="M 10 40 Q 40 20 70 40 T 90 35" fill="none" stroke="#22c55e" strokeWidth="1" />
              <circle cx="50" cy="25" r="3" fill="#6366f1" className="animate-ping" style={{ animationDuration: '3s' }} />
              <circle cx="21" cy="19" r="2" fill="#22c55e" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span className="flex items-center">
              <Map className="w-3 h-3 text-indigo-500 mr-1" />
              Vannes indexées: +150k
            </span>
            <span>Calcul carto: &lt;350ms</span>
          </div>
        </div>
      );

    case 'fassi':
      return (
        <div className={`relative w-full overflow-hidden flex flex-col justify-between p-4 h-48 sm:h-56 bg-gradient-to-br from-red-950 via-neutral-950 to-neutral-900 border-b border-neutral-800 ${isDetailed ? 'h-64 sm:h-80' : ''}`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-red-400">fassi_cad_interop_as400</span>
            <span className="px-2 py-0.5 rounded bg-red-500/15 text-red-400 text-[8px] font-mono font-bold">ERP REALTIME</span>
          </div>

          {/* Isometric explosion representation representation */}
          <div className="my-auto flex justify-center items-center h-20 text-[10px] font-mono space-x-3 text-neutral-400">
            <div className="border border-neutral-800 bg-neutral-900 p-2.5 rounded relative hover_hover-glow transition-all">
              <span className="text-red-400 font-bold block">AS400 ID: F-402</span>
              <span className="block mt-1">Garnitures hydrauliques</span>
            </div>
            <div className="text-red-500 font-bold">→</div>
            <div className="border border-neutral-800 bg-neutral-900 p-2.5 rounded hover_hover-glow transition-all">
              <span className="text-emerald-400 font-bold block">Catalog UI</span>
              <span className="block mt-1">Plan SVG 3D cliquable</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 border-t border-neutral-800/80 pt-2">
            <span className="flex items-center">
              <Binary className="w-3 h-3 text-red-500 mr-1" />
              Références: 350k+
            </span>
            <span>Sync ERP: 15s</span>
          </div>
        </div>
      );

    default:
      return (
        <div className="relative w-full overflow-hidden flex flex-col justify-between p-4 h-48 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-b border-neutral-800">
          <div className="text-xs text-neutral-500 font-mono">system_module_active</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <HardDrive className="w-12 h-12 text-neutral-700 animate-pulse" />
          </div>
        </div>
      );
  }
}
