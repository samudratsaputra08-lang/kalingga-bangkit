'use client';

import Link from 'next/link';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { translations } from '@/lib/i18n';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].nav;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container-app">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Kalingga Bangkit
          </Link>

          <div className="hidden md:flex gap-8">
            <Link href="/" className="hover:text-blue-600">
              {t.home}
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              {t.about}
            </Link>
            <Link href="/portfolio" className="hover:text-blue-600">
              {t.portfolio}
            </Link>
            <Link href="/contact" className="btn-primary">
              {t.contact}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link href="/">{t.home}</Link>
            <Link href="/about">{t.about}</Link>
            <Link href="/portfolio">{t.portfolio}</Link>
            <Link href="/contact" className="btn-primary">
              {t.contact}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
