// app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Project } from '@/lib/types';
import projectsData from '@/data/projects.json';
import BeforeAfterCarousel from '@/components/BeforeAfterCarousel';
import ConsultationForm from '@/components/ConsultationForm';
import AnimatedSection from '@/components/AnimatedSection';

interface PortfolioDetailProps {
  params: {
    slug: string;
  };
}

export default function PortfolioDetailPage({
  params,
}: PortfolioDetailProps) {
  const projects = projectsData as Project[];
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="container-app">
        <AnimatedSection>
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2">{project.title}</h1>
            <p className="text-xl text-gray-600">{project.location}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <BeforeAfterCarousel
            beforeImage={project.images.before}
            afterImage={project.images.after}
            title={project.title}
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Deskripsi Proyek</h2>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tahapan Proyek</h2>
                <div className="space-y-4">
                  {project.process.map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="text-lg font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {project.testimonial && (
              <AnimatedSection delay={0.3}>
                <div className="bg-blue-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
                  <p className="text-gray-700 italic mb-4">
                    "{project.testimonial.text}"
                  </p>
                  <p className="font-bold">{project.testimonial.client}</p>
                  <p className="text-gray-600">{project.testimonial.role}</p>
                </div>
              </AnimatedSection>
            )}
          </div>

          <div>
            <AnimatedSection delay={0.4}>
              <ConsultationForm service={project.category} />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
