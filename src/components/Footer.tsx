/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Mail, Linkedin, GitBranch, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-200/50 dark:border-white/5 bg-zinc-50/50 dark:bg-[#030303]/20 py-12 z-10 transition-colors duration-500">
      
      {/* Subtle under-glow gradient in footer bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-[80px] bg-indigo-500/5 filter blur-[40px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Brand/Signature */}
          <div className="text-center sm:text-left">
            <span className="block text-sm font-display font-medium text-zinc-900 dark:text-white leading-none">
              Fenohasina Andrinirina
            </span>
            <span className="inline-flex items-center text-[10px] text-zinc-400 mt-2 font-mono">
              <Shield className="w-3 h-3 text-indigo-500 mr-1 shrink-0" />
              SOCIÉTÉ CONFORMÉMENT ENREGISTRÉE EN FRANCE
            </span>
          </div>

          {/* Social Channels Row */}
          <div className="flex items-center space-x-4">
            
            <a
              href="mailto:andrinirinafenohasina@gmail.com"
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-white/5 text-zinc-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              aria-label="Contacter par e-mail"
              title="andrinirinafenohasina@gmail.com"
            >
              <Mail className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/andrinirina-fenohasina-bb5a34105/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-white/5 text-zinc-400 dark:text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              aria-label="Profil LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="p-2.5 rounded-lg border border-zinc-200 dark:border-white/5 text-zinc-400 dark:text-zinc-500 hover:text-zinc-855 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-pointer"
              aria-label="Dépôts de code privés"
              title="Activité de code privée sur serveurs Gitlab internes de production."
            >
              <GitBranch className="w-4 h-4" />
            </a>

          </div>

        </div>

        {/* Dynamic bottom row with disclaimer and scroll to top option */}
        <div className="mt-10 pt-6 border-t border-zinc-200/30 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-zinc-400 gap-4">
          <div>
            © {currentYear} Fenohasina Andrinirina. Réalisé avec excellence &amp; precision.
          </div>
          
          <div className="flex items-center space-x-1">
            <span>Conçu avec</span>
            <Heart className="w-2.5 h-2.5 text-red-500 animate-pulse fill-red-500" />
            <span>dans un style SaaS haut de gamme</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
