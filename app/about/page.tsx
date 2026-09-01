import { Company } from "@/lib/types";
import companyData from "@/data/company.json";
import TeamSection from "@/components/TeamSection";
import AnimatedSection from "@/components/AnimatedSection";
import { translations } from "@/lib/i18n";

export default function AboutPage() {
  const company = companyData as Company;
  const lang: "id" | "en" = "id";
  const t = translations[lang].about;

  return (
    <div className="py-16">
      <div className="container-app">
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-center mb-12">{t.title}</h1>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          <AnimatedSection>
            <div className="mb-12">
              <p className="text-lg text-gray-700 leading-relaxed">
                {company.description}
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.vision}</h2>
              <p className="text-lg text-gray-700">{company.vision}</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.4}>
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-4">{t.mission}</h2>
              <ul className="space-y-3">
                {company.mission.map((item, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-blue-600 font-bold">?</span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </div>

      <TeamSection />
    </div>
  );
}
