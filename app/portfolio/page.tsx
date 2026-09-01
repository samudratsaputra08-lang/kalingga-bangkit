// app/portfolio/page.tsx
'use client';

import { useState } from 'react';
import { Project } from '@/lib/types';
import projectsData from '@/data/projects.json';
import { translations } from '@/lib/i18n';
import ProjectCard from '@/components/ProjectCard';
import AnimatedSection from '@/components/AnimatedSection';

export default function PortfolioPage() {
  const projects = projectsData as Project[];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].portfolio;

  const categories = ['residential', 'commercial', 'renovation', 'new-build'];
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <div className="py-16">
      <div className="container-app">
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-center mb-12">{t.title}</h1>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {t[cat as keyof typeof t]}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
