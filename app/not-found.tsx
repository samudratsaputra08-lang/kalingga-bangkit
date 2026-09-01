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
