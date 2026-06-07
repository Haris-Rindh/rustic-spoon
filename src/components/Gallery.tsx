'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { galleryData } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export default function Gallery() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  return (
    <section id="gallery" className="bg-rustic-900">
      {/* Section header */}
      <div className="py-20 pb-12 text-center container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-embers-500 font-semibold tracking-[0.3em] uppercase text-xs mb-4">Visual Journey</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white">From Our Kitchen</h2>
          <div className="w-16 h-px bg-embers-500 mx-auto mt-6" />
        </motion.div>
      </div>

      {/* Uniform 3-column grid — all cells identical height */}
      <div className="grid grid-cols-2 md:grid-cols-3">
        {galleryData.map((src, index) => (
          <motion.button
            key={index}
            onClick={() => setLightboxSrc(src)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: index * 0.07 }}
            className="relative group overflow-hidden cursor-none focus:outline-none"
            style={{ aspectRatio: '4/3' }}     /* ← forces every cell exactly 4:3 */
          >
            <Image
              src={src}
              alt={`Gallery image ${index + 1}`}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            />

            {/* Dark scrim — visible only on hover */}
            <div className="absolute inset-0 bg-rustic-900/0 group-hover:bg-rustic-900/55 transition-all duration-500" />

            {/* Hover content: icon + label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 gap-3">
              <span className="w-14 h-14 rounded-full border-2 border-embers-400 flex items-center justify-center">
                <ZoomIn className="w-6 h-6 text-embers-400" />
              </span>
              <span className="text-white text-xs font-bold uppercase tracking-[0.25em]">View Photo</span>
            </div>

            {/* Always-visible thin bottom bar */}
            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-embers-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9990] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-12"
            onClick={() => setLightboxSrc(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1,   opacity: 1 }}
              exit={{    scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-5xl aspect-[4/3] rounded-sm overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightboxSrc} alt="Gallery photo" fill className="object-cover" priority />
            </motion.div>

            <button
              onClick={() => setLightboxSrc(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-embers-600 hover:border-embers-600 transition-all duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
