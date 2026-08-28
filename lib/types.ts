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
