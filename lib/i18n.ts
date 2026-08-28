// lib/i18n.ts
export const translations = {
  id: {
    nav: {
      home: 'Beranda',
      about: 'Tentang Kami',
      portfolio: 'Portofolio',
      contact: 'Konsultasi',
    },
    hero: {
      title: 'Desain Arsitektur Berkualitas',
      subtitle: 'Wujudkan impian bangunan Anda bersama Kalingga Bangkit',
      cta: 'Konsultasi Sekarang',
    },
    services: {
      title: 'Layanan Kami',
      design: 'Desain Arsitektur',
      consultation: 'Konsultasi',
      renovation: 'Renovasi',
      newBuild: 'Pembangunan',
    },
    portfolio: {
      title: 'Portofolio Proyek',
      filter: 'Kategori',
      residential: 'Residensial',
      commercial: 'Komersial',
      renovation: 'Renovasi',
      newBuild: 'Pembangunan Baru',
    },
    about: {
      title: 'Tentang Kami',
      vision: 'Visi',
      mission: 'Misi',
      team: 'Tim Kami',
    },
    contact: {
      title: 'Konsultasi Gratis',
      name: 'Nama Anda',
      service: 'Jenis Layanan',
      submit: 'Hubungi via WhatsApp',
      whatsappMessage: 'Halo Kalingga Bangkit, saya {name} ingin konsultasi layanan {service}',
    },
    footer: {
      address: 'Alamat',
      phone: 'Telepon',
      email: 'Email',
      copyright: '© 2026 Kalingga Bangkit. Semua hak dilindungi.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      portfolio: 'Portfolio',
      contact: 'Consultation',
    },
    hero: {
      title: 'Quality Architecture Design',
      subtitle: 'Realize your building dreams with Kalingga Bangkit',
      cta: 'Consult Now',
    },
    services: {
      title: 'Our Services',
      design: 'Architectural Design',
      consultation: 'Consultation',
      renovation: 'Renovation',
      newBuild: 'Building Construction',
    },
    portfolio: {
      title: 'Project Portfolio',
      filter: 'Category',
      residential: 'Residential',
      commercial: 'Commercial',
      renovation: 'Renovation',
      newBuild: 'New Building',
    },
    about: {
      title: 'About Us',
      vision: 'Vision',
      mission: 'Mission',
      team: 'Our Team',
    },
    contact: {
      title: 'Free Consultation',
      name: 'Your Name',
      service: 'Service Type',
      submit: 'Contact via WhatsApp',
      whatsappMessage: 'Hello Kalingga Bangkit, I am {name} and would like to consult about {service}',
    },
    footer: {
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      copyright: '© 2026 Kalingga Bangkit. All rights reserved.',
    },
  },
};

export function t(language: 'id' | 'en', key: string): string {
  const keys = key.split('.');
  let value: Record<string, any> | string = translations[language];
  for (const k of keys) {
    if (typeof value === 'object' && value !== null) {
      value = value[k];
    }
  }
  return typeof value === 'string' ? value : key;
}
