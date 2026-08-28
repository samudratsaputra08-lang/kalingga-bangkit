'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [language, setLanguage] = useState<'id' | 'en'>('id');

  const toggleLanguage = () => {
    const newLang = language === 'id' ? 'en' : 'id';
    setLanguage(newLang);
    const newPath = pathname.replace(/^\/(id|en)/, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600"
    >
      {language.toUpperCase()}
    </button>
  );
}
