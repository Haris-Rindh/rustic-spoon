'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonialsData } from '../data';
import { motion, AnimatePresence } from 'framer-motion';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonialsData.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonialsData.length - 1 ? 0 : c + 1));

  const review = testimonialsData[current];

  return (
    <section
      id="testimonials"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #43362e 0%, #2a211b 50%, #43362e 100%)' }}
    >
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-texture opacity-20" />

      {/* Giant decorative quote mark */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-embers-600/10 select-none pointer-events-none">
        <span className="font-serif text-[220px] leading-none">"</span>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-embers-500 font-semibold tracking-[0.3em] uppercase text-xs mb-4">What Our Guests Say</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white">Voices of the Table</h2>
        </motion.div>

        {/* Testimonial card carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-4 md:px-16"
            >
              {/* Stars */}
              <div className="flex justify-center text-embers-400 mb-8 gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(review.rating) ? 'fill-embers-400' : 'fill-transparent stroke-embers-400'}`}
                  />
                ))}
              </div>

              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-white/90 leading-relaxed italic mb-10">
                "{review.text}"
              </blockquote>

              <div className="flex flex-col items-center gap-2">
                <div className="w-14 h-14 rounded-full bg-embers-600/30 border-2 border-embers-500/40 flex items-center justify-center font-serif text-xl font-bold text-embers-400">
                  {review.authorInitials}
                </div>
                <p className="font-bold text-white tracking-wide">{review.authorName}</p>
                <p className="text-white/40 text-sm uppercase tracking-widest">Verified Diner</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:border-embers-500 hover:text-embers-400 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex gap-2">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-8 h-2 bg-embers-500' : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white/60 hover:border-embers-500 hover:text-embers-400 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
