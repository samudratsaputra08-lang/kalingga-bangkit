# Design Spec: Kalingga Bangkit Architecture Website

**Date:** 2026-08-28  
**Status:** Approved  
**Tech Stack:** Next.js 14 + Tailwind CSS + Framer Motion  
**Deployment:** Vercel (Free Tier)

---

## 1. Project Overview

Website pemasaran untuk bisnis arsitektur dan konstruksi "Kalingga Bangkit". Fokus utama adalah showcase portfolio project, layanan (desain arsitektur, konsultasi, renovasi, pembangunan), dan form konsultasi via WhatsApp.

**Target Audience:** Semua klien (residential, commercial, industrial, government)

**Languages:** Bilingual Indonesia-English (prioritas Indonesia)

---

## 2. Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Language | TypeScript |
| Deployment | Vercel (free tier, zero-config) |
| Data | JSON files (no database) |
| Hosting | Vercel CDN |

---

## 3. Project Structure

```
kalingga-bangkit/
├── app/
│   ├── layout.tsx                 # Root layout (navbar, footer)
│   ├── page.tsx                   # Homepage
│   ├── about/page.tsx             # Tentang Kami
│   ├── portfolio/
│   │   ├── page.tsx               # Portfolio listing
│   │   └── [slug]/page.tsx        # Detail project
│   ├── contact/page.tsx           # Konsultasi form
│   ├── [lang]/                    # i18n routing
│   └── globals.css
├── components/
│   ├── Navbar.tsx                 # Navigation + language switcher
│   ├── Footer.tsx                 # Footer links + contact info
│   ├── HeroSection.tsx            # Homepage hero
│   ├── ProjectCard.tsx            # Portfolio card component
│   ├── ConsultationForm.tsx       # WhatsApp consultation form
│   ├── AnimatedSection.tsx        # Framer Motion scroll animations
│   ├── TeamSection.tsx            # Team profiles with photos
│   └── LanguageSwitcher.tsx       # EN/ID toggle
├── data/
│   ├── projects.json              # Portfolio projects
│   └── company.json               # Company info, team, contact
├── lib/
│   ├── i18n.ts                    # Internationalization helpers
│   └── utils.ts                   # Shared utilities
├── public/
│   ├── images/
│   │   ├── portfolio/             # Project photos
│   │   ├── team/                  # Team member photos
│   │   └── branding/              # Logo, brand assets
│   └── favicon.ico
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 4. Pages

### 4.1 Homepage (`/`)
- Hero section: company tagline + CTA "Konsultasi Sekarang"
- Featured projects carousel (3-5 terbaik)
- Services overview (4 cards: desain, konsultasi, renovasi, pembangunan)
- Team section (ringkas, foto + nama + role)
- Final CTA ke halaman konsultasi

### 4.2 About (`/about`)
- Profil perusahaan
- Visi-misi
- Team gallery (foto besar + bio lengkap per anggota)
- Achievement/pencapaian

### 4.3 Portfolio (`/portfolio`)
- Masonry/grid layout semua projects
- Filter kategori: residential, commercial, renovation, new build
- Klik card → halaman detail project

### 4.4 Portfolio Detail (`/portfolio/[slug]`)
- Project title + kategori badge
- Before/after photo carousel (Framer Motion drag/swipe)
- Deskripsi project
- Process/tahapan (timeline visual)
- Testimonial client (placeholder)
- CTA: "Konsultasi Proyek Serupa"

### 4.5 Contact/Konsultasi (`/contact`)
- Form minimal: Nama + Jenis Layanan dropdown
- Submit → generate WhatsApp link
- Nomor WhatsApp target di `company.json`
- Info kontak: alamat, email, telepon

---

## 5. Data Schemas

### projects.json
```json
[
  {
    "id": "number",
    "slug": "string (URL-friendly)",
    "title": "string",
    "category": "residential | commercial | renovation | new-build",
    "year": "number",
    "location": "string",
    "description": "string",
    "process": ["string (tahapan)"],
    "images": {
      "before": "string (path)",
      "after": "string (path)",
      "gallery": ["string (paths)"]
    },
    "testimonial": {
      "client": "string",
      "role": "string",
      "text": "string"
    }
  }
]
```

### company.json
```json
{
  "name": "Kalingga Bangkit",
  "tagline": "string",
  "description": "string",
  "vision": "string",
  "mission": ["string"],
  "contact": {
    "address": "string",
    "phone": "string",
    "email": "string",
    "whatsapp": "string (nomor tanpa +)"
  },
  "team": [
    {
      "name": "string",
      "role": "string",
      "photo": "string (path)",
      "bio": "string"
    }
  ]
}
```

---

## 6. Internationalization (Bilingual)

- URL routing: `/id/...` (default) vs `/en/...`
- Language stored in cookie/localStorage
- `lib/i18n.ts` contains translation keys per language
- UI text uses translation keys from `lib/i18n.ts`
- Dynamic content (project titles, descriptions) stored in JSON with both `id` and `en` fields per entry

---

## 7. Animations (Framer Motion)

- **Scroll fade-in:** Sections animate on viewport entry
- **Before/after carousel:** Drag/swipe with spring physics
- **Project cards:** Scale + shadow on hover
- **Page transitions:** Smooth fade between routes
- **Hero text:** Staggered reveal on load

---

## 8. WhatsApp Integration

```
Form submit → 
  Generate URL: https://wa.me/{whatsapp_number}?text={encoded_message}
  Message format: "Halo Kalingga Bangkit, saya {nama} ingin konsultasi layanan {layanan}"
  Open in new tab
```

---

## 9. Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navbar: hamburger menu on mobile
- Portfolio grid: 1 col mobile, 2 col tablet, 3-4 col desktop
- Touch-friendly buttons and form inputs

---

## 10. SEO & Performance

- Next.js SSG (Static Site Generation) for all pages
- Next.js Image component with priority loading
- Meta tags: title, description, Open Graph
- Semantic HTML (article, section, nav, main)
- Lighthouse target: 90+ all categories

---

## 11. Content Management

User will edit JSON files directly:
- `data/projects.json` → add/edit portfolio projects
- `data/company.json` → update company info, team
- Image files in `public/images/` → add/replace photos

---

## 12. Deployment

- Repository on GitHub
- Connect to Vercel
- Auto-deploy on push to main
- Free tier sufficient (static site, no backend)
- Custom domain optional (add in Vercel dashboard)

---

## 13. Success Criteria

- [ ] All pages responsive (mobile, tablet, desktop)
- [ ] Portfolio showcase with before/after carousel
- [ ] WhatsApp consultation form working
- [ ] Bilingual toggle (ID/EN) functional
- [ ] Smooth animations on scroll
- [ ] Lighthouse score 90+ (performance, SEO, accessibility)
- [ ] Deployed on Vercel with custom domain
- [ ] User can edit JSON to update content
