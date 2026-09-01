# Kalingga Bangkit - Architecture Marketing Website

Website pemasaran untuk firma arsitektur Kalingga Bangkit. Dibangun dengan Next.js 14, Tailwind CSS, dan Framer Motion.

## 🚀 Fitur

- ✅ **Bilingual** - Support Bahasa Indonesia dan English
- ✅ **Portfolio Showcase** - Before/after carousel untuk project
- ✅ **WhatsApp Integration** - Form konsultasi langsung ke WhatsApp
- ✅ **Responsive Design** - Mobile-first, optimized untuk semua perangkat
- ✅ **Scroll Animations** - Smooth Framer Motion animations
- ✅ **SEO Optimized** - Metadata lengkap dan semantic HTML
- ✅ **Performance** - Static site generation untuk loading cepat

## 📦 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Language:** TypeScript
- **Deployment:** Vercel

## 🛠️ Development

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## 📁 Project Structure

```
kalingga-bangkit/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── portfolio/         # Portfolio listing & detail
│   ├── contact/           # Contact page
│   └── not-found.tsx      # 404 page
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProjectCard.tsx
│   └── ...
├── data/                  # JSON data files
│   ├── company.json       # Company info & team
│   └── projects.json      # Portfolio projects
├── lib/                   # Utilities & helpers
│   ├── types.ts           # TypeScript types
│   ├── utils.ts           # Helper functions
│   └── i18n.ts            # Translations
└── public/
    └── images/            # Static images
        ├── portfolio/
        └── team/
```

## 📝 Content Management

Edit konten website melalui file JSON:

### Company Info (`data/company.json`)
```json
{
  "name": "Kalingga Bangkit",
  "tagline": "...",
  "contact": {
    "whatsapp": "62812345678"
  },
  "team": [...]
}
```

### Portfolio Projects (`data/projects.json`)
```json
[
  {
    "id": 1,
    "slug": "project-slug",
    "title": "Project Title",
    "category": "residential | commercial | renovation | new-build",
    "images": {
      "before": "/images/portfolio/before.jpg",
      "after": "/images/portfolio/after.jpg"
    },
    "testimonial": {...}
  }
]
```

## 🚀 Deployment

### Deploy ke Vercel

1. Push code ke GitHub:
```bash
git remote add origin https://github.com/username/kalingga-bangkit.git
git branch -M main
git push -u origin main
```

2. Buka [vercel.com](https://vercel.com)
3. Click **New Project**
4. Import repository `kalingga-bangkit`
5. Framework: Next.js (auto-detected)
6. Click **Deploy**

### Custom Domain (Optional)

1. Di Vercel dashboard: Settings → Domains
2. Add custom domain
3. Update DNS records sesuai instruksi Vercel

## 📸 Adding Images

### Portfolio Images
Tambahkan gambar ke `public/images/portfolio/` dan update path di `data/projects.json`

### Team Photos
Tambahkan foto ke `public/images/team/` dan update path di `data/company.json`

## 🌐 Pages

- `/` - Homepage (hero, services, featured projects, team)
- `/about` - About page (company info, vision, mission, team)
- `/portfolio` - Portfolio listing (filterable by category)
- `/portfolio/[slug]` - Portfolio detail (before/after, process, testimonial)
- `/contact` - Contact page (consultation form, contact info)

## 📞 WhatsApp Integration

Form konsultasi otomatis generate WhatsApp link dengan format:
```
https://wa.me/[whatsapp_number]?text=[encoded_message]
```

Edit nomor WhatsApp di `data/company.json`:
```json
{
  "contact": {
    "whatsapp": "628123456789"  // Tanpa tanda +
  }
}
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` untuk mengubah color scheme

### Fonts
Update `app/layout.tsx` untuk mengganti font

### Animations
Sesuaikan timing di `components/AnimatedSection.tsx`

## 📄 License

© 2026 Kalingga Bangkit. All rights reserved.
