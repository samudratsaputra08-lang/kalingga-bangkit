// app/contact/page.tsx
import { Company, Language } from '@/lib/types';
import companyData from '@/data/company.json';
import ConsultationForm from '@/components/ConsultationForm';
import AnimatedSection from '@/components/AnimatedSection';
import { translations } from '@/lib/i18n';

export default function ContactPage() {
  const company = companyData as Company;
  const lang: Language = 'id';
  const t = translations[lang];

  return (
    <div className="py-16">
      <div className="container-app mx-auto px-4">
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-center mb-12">
            {t.contact.title}
          </h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <AnimatedSection>
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">{t.footer.address}</h2>
                <p className="text-gray-600">{company.contact.address}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{t.footer.phone}</h2>
                <a
                  href={`tel:${company.contact.phone}`}
                  className="text-blue-600 hover:underline"
                >
                  {company.contact.phone}
                </a>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">{t.footer.email}</h2>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {company.contact.email}
                </a>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-2">WhatsApp</h2>
                <a
                  href={`https://wa.me/${company.contact.whatsapp}`}
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat via WhatsApp
                </a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <ConsultationForm />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
