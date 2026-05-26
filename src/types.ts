/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Metric {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  role: string;
  period: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  stack: string[];
  problematic: string;
  solution: string;
  features: string[];
  metrics: Metric[];
  accentColor: string; // Tailwind tint for glow/accent
  link?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tech: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  achievements: string[];
  tech: string[];
}
