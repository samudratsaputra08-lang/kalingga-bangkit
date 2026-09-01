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
