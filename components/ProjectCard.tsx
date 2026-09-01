// components/ProjectCard.tsx
import Link from 'next/link';
import { Project } from '@/lib/types';
import { translations } from '@/lib/i18n';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].portfolio;

  const categoryLabel = t[project.category as keyof typeof t] || project.category;

  return (
    <Link href={`/portfolio/${project.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative h-56 w-full bg-gray-200">
          {/* Image placeholder */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {project.title}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold flex-1">{project.title}</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {categoryLabel}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{project.location}</p>
          <p className="text-gray-500 text-sm mt-2">{project.year}</p>
        </div>
      </div>
    </Link>
  );
}
