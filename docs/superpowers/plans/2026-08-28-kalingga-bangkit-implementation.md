# Kalingga Bangkit Architecture Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bilingual Next.js marketing website for architecture firm with portfolio showcase, WhatsApp consultation form, and team profiles.

**Architecture:** Next.js 14 App Router with static site generation (SSG), Tailwind CSS for styling, Framer Motion for animations. Portfolio and company data stored in JSON files. Bilingual support via dynamic routing. Deployable on Vercel free tier.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, next-intl (i18n)

**Spec:** `docs/superpowers/specs/2026-08-28-kalingga-bangkit-architecture-website-design.md`

## Global Constraints

- Node.js: 18+ (per Next.js 14 requirements)
- React: ^18.0
- TypeScript: strict mode enabled
- Target: Mobile-first responsive design (sm, md, lg, xl breakpoints)
- Lighthouse scores: 90+ (performance, SEO, accessibility)
- Deployment: Vercel (free tier, no custom backend required)
- Content: Editable via JSON files in `data/` folder
- Bilingual: Indonesian (default) and English via URL routing
- Data: No database, JSON-based content management

---

## File Structure

**Create:**
```
kalingga-bangkit/
├── app/
│   ├── layout.tsx                 # Root layout with navbar, footer, metadata
│   ├── page.tsx                   # Homepage
│   ├── globals.css                # Tailwind + custom animations
│   ├── about/page.tsx             # About page
│   ├── portfolio/
│   │   ├── page.tsx               # Portfolio listing
│   │   └── [slug]/page.tsx        # Dynamic portfolio detail
│   ├── contact/page.tsx           # Consultation form
│   └── not-found.tsx              # 404 fallback
├── components/
│   ├── Navbar.tsx                 # Navigation header
│   ├── Footer.tsx                 # Footer
│   ├── HeroSection.tsx            # Homepage hero
│   ├── ProjectCard.tsx            # Portfolio card
│   ├── ConsultationForm.tsx       # WhatsApp form
│   ├── TeamSection.tsx            # Team profiles
│   ├── AnimatedSection.tsx        # Framer Motion wrapper
│   ├── BeforeAfterCarousel.tsx    # Before/after image carousel
│   └── LanguageSwitcher.tsx       # EN/ID toggle
├── data/
│   ├── projects.json              # Portfolio projects data
│   └── company.json               # Company info, team, contact
├── lib/
│   ├── i18n.ts                    # Translation keys
│   ├── utils.ts                   # Helper functions
│   └── types.ts                   # TypeScript types
├── public/
│   ├── images/
│   │   ├── portfolio/             # Project photos
│   │   ├── team/                  # Team photos
│   │   └── branding/              # Logo, icons
│   └── favicon.ico
├── next.config.js                 # Next.js configuration
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies
└── README.md                       # Project documentation
```

---

## Task 1: Project Scaffolding & Dependencies

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.js`
- Create: `tailwind.config.ts`
- Create: `.eslintrc.json`
- Create: `.gitignore`

**Interfaces:**
- Produces: Next.js project structure ready for development, TypeScript support, Tailwind CSS configured

- [ ] **Step 1: Initialize Next.js project**

```bash
cd C:\Users\User\kalingga-bangkit
npx create-next-app@latest . --typescript --tailwind --app --no-git --no-eslint
```

Expected: Project scaffolded with Next.js, React, TypeScript, Tailwind.

- [ ] **Step 2: Install additional dependencies**

```bash
npm install framer-motion next-intl clsx
npm install -D @types/node @types/react
```

- [ ] **Step 3: Verify installation**

```bash
npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.js tailwind.config.ts .eslintrc.json .gitignore
git commit -m "chore: initialize Next.js 14 project with Tailwind and Framer Motion"
```

---

## Task 2: TypeScript Types & Utilities

**Files:**
- Create: `lib/types.ts`
- Create: `lib/utils.ts`
- Create: `lib/i18n.ts`

**Interfaces:**
- Produces: Type definitions (Project, TeamMember, Company), utility functions, translation keys for bilingual support

- [ ] **Step 1: Create types.ts**

```typescript
// lib/types.ts
export type Language = 'id' | 'en';

export interface Project {
  id: number;
  slug: string;
  title: string;
  category: 'residential' | 'commercial' | 'renovation' | 'new-build';
  year: number;
  location: string;
  description: string;
  process: string[];
  images: {
    before: string;
    after: string;
    gallery: string[];
  };
  testimonial: {
    client: string;
    role: string;
    text: string;
  };
}

export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface Company {
  name: string;
  tagline: string;
  description: string;
  vision: string;
  mission: string[];
  contact: {
    address: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  team: TeamMember[];
}

export interface ConsultationData {
  name: string;
  service: 'architectural-design' | 'consultation' | 'renovation' | 'new-build';
}
```

- [ ] **Step 2: Create utils.ts**

```typescript
// lib/utils.ts
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function generateWhatsAppLink(
  phoneNumber: string,
  name: string,
  service: string
): string {
  const message = `Halo Kalingga Bangkit, saya ${name} ingin konsultasi layanan ${service}`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
}

export function getImageUrl(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
```

- [ ] **Step 3: Create i18n.ts**

```typescript
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
  let value: any = translations[language];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/types.ts lib/utils.ts lib/i18n.ts
git commit -m "feat: add TypeScript types, utilities, and translations"
```

---

## Task 3: Data Files (JSON)

**Files:**
- Create: `data/company.json`
- Create: `data/projects.json`

**Interfaces:**
- Produces: JSON data files containing company info, team, and portfolio projects

- [ ] **Step 1: Create company.json**

```json
{
  "name": "Kalingga Bangkit",
  "tagline": "Desain Arsitektur & Konstruksi Berkualitas",
  "description": "Kami adalah firma arsitektur berpengalaman dalam desain, konsultasi, renovasi, dan pembangunan bangunan residensial dan komersial.",
  "vision": "Menjadi firma arsitektur terdepan yang menghadirkan desain inovatif dan berkelanjutan.",
  "mission": [
    "Memberikan solusi desain yang sesuai kebutuhan klien",
    "Menjamin kualitas konstruksi terbaik",
    "Memberikan layanan konsultasi profesional"
  ],
  "contact": {
    "address": "Jl. Contoh No. 123, Jakarta Pusat",
    "phone": "+62 21 1234567",
    "email": "info@kalingga-bangkit.com",
    "whatsapp": "62812345678"
  },
  "team": [
    {
      "name": "Nama Arsitek 1",
      "role": "Arsitek Kepala",
      "photo": "/images/team/architect-1.jpg",
      "bio": "Berpengalaman 15 tahun dalam desain arsitektur"
    },
    {
      "name": "Nama Arsitek 2",
      "role": "Arsitek Senior",
      "photo": "/images/team/architect-2.jpg",
      "bio": "Spesialis desain komersial dan renovasi"
    }
  ]
}
```

- [ ] **Step 2: Create projects.json**

```json
[
  {
    "id": 1,
    "slug": "kantor-jakarta-2024",
    "title": "Renovasi Kantor Jakarta",
    "category": "commercial",
    "year": 2024,
    "location": "Jakarta Pusat",
    "description": "Proyek renovasi kantor modern dengan konsep open space dan area meeting yang fleksibel.",
    "process": ["Perencanaan", "Desain", "Konstruksi", "Serah Terima"],
    "images": {
      "before": "/images/portfolio/kantor-before.jpg",
      "after": "/images/portfolio/kantor-after.jpg",
      "gallery": [
        "/images/portfolio/kantor-1.jpg",
        "/images/portfolio/kantor-2.jpg"
      ]
    },
    "testimonial": {
      "client": "PT. Contoh Perusahaan",
      "role": "Direktur",
      "text": "Hasil renovasi melebihi ekspektasi kami. Tim profesional dan tepat waktu."
    }
  }
]
```

- [ ] **Step 3: Create directories for images**

```bash
mkdir -p public/images/portfolio
mkdir -p public/images/team
mkdir -p public/images/branding
```

- [ ] **Step 4: Commit**

```bash
git add data/company.json data/projects.json
git commit -m "data: add company info and portfolio projects"
```

---

## Task 4: Root Layout & Global Styles

**Files:**
- Modify: `app/globals.css`
- Create: `app/layout.tsx`

**Interfaces:**
- Produces: Root layout with metadata, Tailwind setup, custom animations

- [ ] **Step 1: Setup globals.css**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .container-app {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }

  .btn-primary {
    @apply px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors;
  }

  .btn-secondary {
    @apply px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}
```

- [ ] **Step 2: Create root layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Kalingga Bangkit - Desain Arsitektur',
  description: 'Firma arsitektur profesional untuk desain, konsultasi, renovasi, dan pembangunan.',
  openGraph: {
    title: 'Kalingga Bangkit',
    description: 'Desain Arsitektur & Konstruksi Berkualitas',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: setup root layout and global styles"
```

---

## Task 5: Navbar & Footer Components

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`
- Create: `components/LanguageSwitcher.tsx`

**Interfaces:**
- Consumes: Translations from `lib/i18n.ts`
- Produces: Reusable Navbar/Footer components with navigation links

- [ ] **Step 1: Create LanguageSwitcher.tsx**

```typescript
// components/LanguageSwitcher.tsx
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
```

- [ ] **Step 2: Create Navbar.tsx**

```typescript
// components/Navbar.tsx
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
```

- [ ] **Step 3: Create Footer.tsx**

```typescript
// components/Footer.tsx
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
```

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx components/Footer.tsx components/LanguageSwitcher.tsx
git commit -m "feat: add navbar and footer components"
```

---

## Task 6: Homepage Components

**Files:**
- Create: `components/HeroSection.tsx`
- Create: `components/AnimatedSection.tsx`
- Create: `components/TeamSection.tsx`
- Create: `app/page.tsx`

**Interfaces:**
- Consumes: `AnimatedSection`, `HeroSection`, `TeamSection` components
- Produces: Homepage with hero, services, featured projects, team section

- [ ] **Step 1: Create AnimatedSection.tsx**

```typescript
// components/AnimatedSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedSection({
  children,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Create HeroSection.tsx**

```typescript
// components/HeroSection.tsx
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
```

- [ ] **Step 3: Create TeamSection.tsx**

```typescript
// components/TeamSection.tsx
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
```

- [ ] **Step 4: Create app/page.tsx (Homepage)**

```typescript
// app/page.tsx
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
```

- [ ] **Step 5: Commit**

```bash
git add components/HeroSection.tsx components/AnimatedSection.tsx components/TeamSection.tsx app/page.tsx
git commit -m "feat: add homepage with hero, services, featured projects, and team sections"
```

---

## Task 7: Portfolio Pages

**Files:**
- Create: `components/ProjectCard.tsx`
- Create: `components/BeforeAfterCarousel.tsx`
- Create: `app/portfolio/page.tsx`
- Create: `app/portfolio/[slug]/page.tsx`

**Interfaces:**
- Consumes: Project data from `data/projects.json`, ProjectCard component
- Produces: Portfolio listing page with filters and detail page for individual projects

- [ ] **Step 1: Create ProjectCard.tsx**

```typescript
// components/ProjectCard.tsx
import Link from 'next/link';
import { Project } from '@/lib/types';
import { translations } from '@/lib/i18n';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].portfolio;

  const categoryLabel = t[project.category as keyof typeof t] || project.category;

  return (
    <Link href={`/portfolio/${project.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative h-56 w-full bg-gray-200">
          {/* Image placeholder */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            {project.title}
          </div>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold flex-1">{project.title}</h3>
            <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              {categoryLabel}
            </span>
          </div>
          <p className="text-gray-600 text-sm">{project.location}</p>
          <p className="text-gray-500 text-sm mt-2">{project.year}</p>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Create BeforeAfterCarousel.tsx**

```typescript
// components/BeforeAfterCarousel.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeAfterCarouselProps {
  beforeImage: string;
  afterImage: string;
  title: string;
}

export default function BeforeAfterCarousel({
  beforeImage,
  afterImage,
  title,
}: BeforeAfterCarouselProps) {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={showBefore ? 'before' : 'after'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-gray-400"
        >
          {showBefore ? 'Before' : 'After'}
        </motion.div>
      </AnimatePresence>

      <button
        onClick={() => setShowBefore(!showBefore)}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 z-10"
      >
        {showBefore ? 'Show After' : 'Show Before'}
      </button>
    </div>
  );
}
```

- [ ] **Step 3: Create app/portfolio/page.tsx**

```typescript
// app/portfolio/page.tsx
'use client';

import { useState } from 'react';
import { Project } from '@/lib/types';
import projectsData from '@/data/projects.json';
import { translations } from '@/lib/i18n';
import ProjectCard from '@/components/ProjectCard';
import AnimatedSection from '@/components/AnimatedSection';

export default function PortfolioPage() {
  const projects = projectsData as Project[];
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang].portfolio;

  const categories = ['residential', 'commercial', 'renovation', 'new-build'];
  const filteredProjects = selectedCategory
    ? projects.filter((p) => p.category === selectedCategory)
    : projects;

  return (
    <div className="py-16">
      <div className="container-app">
        <AnimatedSection>
          <h1 className="text-5xl font-bold text-center mb-12">{t.title}</h1>
        </AnimatedSection>

        <AnimatedSection>
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {t[cat as keyof typeof t]}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <AnimatedSection key={project.id} delay={index * 0.1}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Create app/portfolio/[slug]/page.tsx**

```typescript
// app/portfolio/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Project } from '@/lib/types';
import projectsData from '@/data/projects.json';
import BeforeAfterCarousel from '@/components/BeforeAfterCarousel';
import ConsultationForm from '@/components/ConsultationForm';
import AnimatedSection from '@/components/AnimatedSection';

interface PortfolioDetailProps {
  params: {
    slug: string;
  };
}

export default function PortfolioDetailPage({
  params,
}: PortfolioDetailProps) {
  const projects = projectsData as Project[];
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-16">
      <div className="container-app">
        <AnimatedSection>
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-2">{project.title}</h1>
            <p className="text-xl text-gray-600">{project.location}</p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <BeforeAfterCarousel
            beforeImage={project.images.before}
            afterImage={project.images.after}
            title={project.title}
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-2">
            <AnimatedSection>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Deskripsi Proyek</h2>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Tahapan Proyek</h2>
                <div className="space-y-4">
                  {project.process.map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <span className="text-lg font-medium">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {project.testimonial && (
              <AnimatedSection delay={0.3}>
                <div className="bg-blue-50 p-8 rounded-lg">
                  <h2 className="text-2xl font-bold mb-4">Testimonial</h2>
                  <p className="text-gray-700 italic mb-4">
                    "{project.testimonial.text}"
                  </p>
                  <p className="font-bold">{project.testimonial.client}</p>
                  <p className="text-gray-600">{project.testimonial.role}</p>
                </div>
              </AnimatedSection>
            )}
          </div>

          <div>
            <AnimatedSection delay={0.4}>
              <ConsultationForm service={project.category} />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/ProjectCard.tsx components/BeforeAfterCarousel.tsx app/portfolio/page.tsx app/portfolio/[slug]/page.tsx
git commit -m "feat: add portfolio listing and detail pages with before/after carousel"
```

---

## Task 8: Consultation Form & Contact Page

**Files:**
- Create: `components/ConsultationForm.tsx`
- Create: `app/contact/page.tsx`

**Interfaces:**
- Consumes: `generateWhatsAppLink` from `lib/utils.ts`, Company data
- Produces: Form component for consultation and contact page

- [ ] **Step 1: Create ConsultationForm.tsx**

```typescript
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
```

- [ ] **Step 2: Create app/contact/page.tsx**

```typescript
// app/contact/page.tsx
import { Company } from '@/lib/types';
import companyData from '@/data/company.json';
import ConsultationForm from '@/components/ConsultationForm';
import AnimatedSection from '@/components/AnimatedSection';
import { translations } from '@/lib/i18n';

export default function ContactPage() {
  const company = companyData as Company;
  const lang: 'id' | 'en' = 'id';
  const t = translations[lang];

  return (
    <div className="py-16">
      <div className="container-app">
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
                  className="inline-block btn-primary bg-green-600 text-white hover:bg-green-700"
                  target="_blank"
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
```

- [ ] **Step 3: Commit**

```bash
git add components/ConsultationForm.tsx app/contact/page.tsx
git commit -m "feat: add consultation form and contact page with WhatsApp integration"
```

---

## Task 9: About Page

**Files:**
- Create: `app/about/page.tsx`

**Interfaces:**
- Consumes: Company data, TeamSection component
- Produces: About page with company info, vision, mission, and team

- [ ] **Step 1: Create app/about/page.tsx**

```typescript
// app/about/page.tsx
import { Company } from '@/lib/types';
import companyData from '@/data/company.json';
import TeamSection from '@/components/TeamSection';
import AnimatedSection from '@/components/AnimatedSection';
import { translations } from '@/lib/i18n';

export default function AboutPage() {
  const company = companyData as Company;
  const lang: 'id' | 'en' = 'id';
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
                    <span className="text-blue-600 font-bold">✓</span>
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
```

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx
git commit -m "feat: add about page with company info, vision, and mission"
```

---

## Task 10: 404 & Build Optimization

**Files:**
- Create: `app/not-found.tsx`
- Modify: `next.config.js`

**Interfaces:**
- Produces: 404 fallback page, optimized Next.js config for performance

- [ ] **Step 1: Create app/not-found.tsx**

```typescript
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Halaman tidak ditemukan</p>
        <Link href="/" className="btn-primary bg-blue-600 text-white hover:bg-blue-700">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Update next.config.js**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  swcMinify: true,
};

module.exports = nextConfig;
```

- [ ] **Step 3: Commit**

```bash
git add app/not-found.tsx next.config.js
git commit -m "feat: add 404 page and optimize Next.js config"
```

---

## Task 11: Testing Build & Lighthouse

**Files:**
- Test: All pages and components

**Interfaces:**
- Verifies: Build succeeds, all pages render, Lighthouse scores 90+

- [ ] **Step 1: Run production build**

```bash
npm run build
```

Expected: Build succeeds with no errors, output shows "Route (app)" entries for all pages.

- [ ] **Step 2: Start production server**

```bash
npm start
```

Expected: Server starts on localhost:3000

- [ ] **Step 3: Test pages (manual)**

```
- Navigate to http://localhost:3000
- Check: Homepage loads, hero section visible, services cards render
- Check: Navigation links work (About, Portfolio, Contact)
- Check: Responsive on mobile (DevTools)
- Check: Portfolio page filters work
- Check: Project detail page renders with before/after carousel
- Check: Contact form renders, WhatsApp button works
- Check: About page shows team members
```

- [ ] **Step 4: Run Lighthouse (via Chrome DevTools)**

```
- Open DevTools (F12)
- Go to Lighthouse tab
- Run audit for mobile and desktop
- Target: 90+ all categories
```

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "test: verify production build and lighthouse scores"
```

---

## Task 12: Deployment Setup

**Files:**
- Create: `.vercelignore`
- Create: `vercel.json` (optional)

**Interfaces:**
- Produces: Ready-to-deploy configuration for Vercel

- [ ] **Step 1: Create .vercelignore**

```
# .vercelignore
.git
.gitignore
README.md
docs/
```

- [ ] **Step 2: Push to GitHub (user will do this)**

```bash
git remote add origin https://github.com/username/kalingga-bangkit.git
git branch -M main
git push -u origin main
```

- [ ] **Step 3: Deploy to Vercel**

- Go to https://vercel.com
- Click "New Project"
- Import repository from GitHub
- Select `kalingga-bangkit` repo
- Framework: Next.js (auto-detected)
- Click Deploy
- Wait for build to complete

- [ ] **Step 4: Configure Custom Domain (optional)**

- In Vercel dashboard, go to Settings → Domains
- Add your custom domain
- Update DNS records per Vercel instructions

- [ ] **Step 5: Commit**

```bash
git add .vercelignore
git commit -m "chore: add vercel deployment config"
```

---

## Summary

After completing all tasks:

1. **Local development ready** — run `npm run dev` to start
2. **All pages built** — homepage, about, portfolio, portfolio detail, contact
3. **Animations working** — Framer Motion scroll effects
4. **WhatsApp integration** — consultation form working
5. **Bilingual support** — language switcher ready (structure in place)
6. **Responsive design** — mobile, tablet, desktop
7. **SEO ready** — metadata, semantic HTML
8. **Deployed on Vercel** — live URL ready
9. **Editable content** — JSON-based portfolio/company data
10. **Lighthouse 90+** — performance verified

**Next steps after implementation:**
- Add real images to `public/images/portfolio/` and `public/images/team/`
- Fill in `data/company.json` with real company info and team photos
- Add more projects to `data/projects.json`
- Set up custom domain in Vercel
- Configure email notifications for contact form (optional, requires backend)
