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
