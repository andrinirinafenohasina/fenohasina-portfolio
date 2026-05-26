/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

interface AmbientBackgroundProps {
  darkMode: boolean;
}

export default function AmbientBackground({ darkMode }: AmbientBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Dynamic Main Page Under-Grid */}
      <div 
        className={`absolute inset-0 transition-colors duration-700 ${
          darkMode 
            ? 'bg-[#030303] bg-grid-pattern' 
            : 'bg-zinc-50 bg-grid-pattern-light'
        }`}
      />

      {/* Radiant Glowing Blobs (Dark/Light Responsive) */}
      <div className="absolute inset-0 overflow-hidden opacity-50 dark:opacity-45">
        {darkMode ? (
          <>
            {/* Indigo glow top left */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-500/10 blur-[120px] animate-blob-1" />
            
            {/* Purple glow bottom right */}
            <div className="absolute bottom-[-10%] right-[-10%] w-[55vw] h-[55vw] rounded-full bg-purple-550/10 blur-[120px] animate-blob-2" />
            
            {/* Soft secondary ambient lavender blob in center-ish */}
            <div className="absolute top-[35%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-indigo-950/10 blur-[100px] animate-blob-1" />
          </>
        ) : (
          <>
            {/* Fresh light lavender glow top left */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-100/30 blur-[110px] animate-blob-1" />
            
            {/* Smooth sky blue bottom right */}
            <div className="absolute bottom-[10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-purple-50/40 blur-[100px] animate-blob-2" />
            
            {/* Accent rose/cyan page center */}
            <div className="absolute top-[35%] right-[15%] w-[35vw] h-[35vw] rounded-full bg-indigo-50/40 blur-[90px] animate-blob-1" />
          </>
        )}
      </div>

      {/* Subtle radial masking to focus the clarity on center sections */}
      <div 
        className={`absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_65%,transparent_100%)] ${
          darkMode
            ? 'bg-[radial-gradient(circle_at_center,transparent_20%,rgba(3,3,3,0.75)_85%)]'
            : 'bg-[radial-gradient(circle_at_center,transparent_30%,rgba(250,250,250,0.5)_85%)]'
        }`}
      />
    </div>
  );
}
