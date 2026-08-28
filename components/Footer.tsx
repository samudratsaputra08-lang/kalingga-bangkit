import { Company } from '@/lib/types';
import companyData from '@/data/company.json';
import { translations } from '@/lib/i18n';

export default function Footer() {
  const company = companyData as Company;
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].footer;

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container-app py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-2">{company.name}</h3>
            <p className="text-gray-400">{company.tagline}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t.address}</h4>
            <p className="text-gray-400">{company.contact.address}</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">{t.phone}</h4>
            <p className="text-gray-400">{company.contact.phone}</p>
            <p className="text-gray-400">{company.contact.email}</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400">{t.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
