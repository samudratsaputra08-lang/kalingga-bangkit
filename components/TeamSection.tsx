import Image from 'next/image';
import { Company } from '@/lib/types';
import companyData from '@/data/company.json';
import { translations } from '@/lib/i18n';
import AnimatedSection from './AnimatedSection';

export default function TeamSection() {
  const company = companyData as Company;
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].about;

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-app">
        <AnimatedSection>
          <h2 className="text-4xl font-bold text-center mb-12">{t.team}</h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {company.team.map((member, index) => (
            <AnimatedSection key={member.name} delay={index * 0.1}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-64 w-full">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-blue-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 mt-2">{member.bio}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}