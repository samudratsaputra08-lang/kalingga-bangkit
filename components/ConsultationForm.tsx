// components/ConsultationForm.tsx
'use client';

import { useState } from 'react';
import { generateWhatsAppLink } from '@/lib/utils';
import companyData from '@/data/company.json';
import { translations } from '@/lib/i18n';
import { Company } from '@/lib/types';

interface ConsultationFormProps {
  service?: string;
}

export default function ConsultationForm({
  service: defaultService,
}: ConsultationFormProps) {
  const [name, setName] = useState('');
  const [service, setService] = useState(defaultService || 'architectural-design');
  const company = companyData as Company;
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Mohon isi nama Anda');
      return;
    }

    const serviceLabel = t.services[service as keyof typeof t.services] || service;
    const whatsappLink = generateWhatsAppLink(
      company.contact.whatsapp,
      name,
      serviceLabel
    );
    window.open(whatsappLink, '_blank');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">{t.contact.title}</h2>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {t.contact.name}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="Nama Lengkap"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          {t.contact.service}
        </label>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          <option value="architectural-design">
            {t.services.design}
          </option>
          <option value="consultation">
            {t.services.consultation}
          </option>
          <option value="renovation">
            {t.services.renovation}
          </option>
          <option value="new-build">
            {t.services.newBuild}
          </option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full btn-primary bg-blue-600 text-white hover:bg-blue-700"
      >
        {t.contact.submit}
      </button>
    </form>
  );
}
