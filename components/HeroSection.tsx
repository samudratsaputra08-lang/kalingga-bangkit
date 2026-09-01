'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { translations } from '@/lib/i18n';

export default function HeroSection() {
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].hero;

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container-app">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{t.title}</h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8">{t.subtitle}</p>
          <Link href="/contact" className="inline-block btn-primary bg-white text-blue-600 hover:bg-gray-100">
            {t.cta}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}