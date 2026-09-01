import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import TeamSection from '@/components/TeamSection';
import AnimatedSection from '@/components/AnimatedSection';
import { Project } from '@/lib/types';
import projectsData from '@/data/projects.json';
import { translations } from '@/lib/i18n';

export default function Home() {
  const projects = projectsData as Project[];
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang];

  const servicesList = [
    { key: 'design', icon: '🏗️' },
    { key: 'consultation', icon: '💡' },
    { key: 'renovation', icon: '🔧' },
    { key: 'newBuild', icon: '🏢' },
  ];

  return (
    <>
      <HeroSection />

      <section className="py-16">
        <div className="container-app">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12">
              {t.services.title}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, index) => (
              <AnimatedSection key={service.key} delay={index * 0.1}>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg text-center hover:shadow-lg transition-shadow">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-bold">
                    {t.services[service.key as keyof typeof t.services]}
                  </h3>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-app">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-center mb-12">
              {t.portfolio.title}
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, index) => (
              <AnimatedSection key={project.id} delay={index * 0.1}>
                <Link href={`/portfolio/${project.slug}`}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <div className="relative h-48 w-full bg-gray-200">
                      {/* Image placeholder */}
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        {project.title}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold">{project.title}</h3>
                      <p className="text-gray-600">{project.location}</p>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/portfolio" className="btn-primary">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      <TeamSection />
    </>
  );
}