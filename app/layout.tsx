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
