'use client';

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
      className="py-32 bg-rustic-200 bg-texture relative overflow-hidden scroll-mt-20"
    >
      {/* Decorative oversized quote — adapts to light bg */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 select-none pointer-events-none text-rustic-400/20">
        <span className="font-serif text-[280px] leading-none">"</span>
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
          {/* Eyebrow */}
          <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-4">
            What Our Guests Say
          </p>

          {/* Section divider ornament */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="flex-1 max-w-[80px] h-px bg-gradient-to-r from-transparent to-embers-600/50" />
            <span className="text-embers-600 text-xl">✦</span>
            <span className="flex-1 max-w-[80px] h-px bg-gradient-to-l from-transparent to-embers-600/50" />
          </div>

          <h2 className="font-serif text-5xl md:text-6xl font-bold text-rustic-900">
            Voices of the Table
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-4 md:px-20"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 text-embers-500 ${
                      i < Math.floor(review.rating) ? 'fill-embers-500' : 'fill-transparent'
                    }`}
                  />
                ))}
              </div>

              {/* Quote text — dark on the light background */}
              <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-rustic-800 leading-relaxed italic mb-10">
                "{review.text}"
              </blockquote>

              {/* Author */}
              <div className="flex flex-col items-center gap-3">
                {/* Avatar circle */}
                <div className="w-14 h-14 rounded-full bg-embers-600 flex items-center justify-center font-serif text-xl font-bold text-white shadow-md shadow-embers-600/30">
                  {review.authorInitials}
                </div>
                <p className="font-bold text-rustic-900 tracking-wide text-lg">
                  {review.authorName}
                </p>
                <p className="text-rustic-500 text-xs uppercase tracking-widest font-semibold">
                  Verified Diner
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls — styled for light background */}
          <div className="flex justify-center items-center gap-8 mt-14">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-12 h-12 border-2 border-rustic-400 rounded-full flex items-center justify-center text-rustic-600 hover:border-embers-600 hover:text-embers-600 hover:bg-embers-600/5 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2 items-center">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`transition-all duration-300 rounded-full ${
                    i === current
                      ? 'w-8 h-2.5 bg-embers-600'
                      : 'w-2.5 h-2.5 bg-rustic-400 hover:bg-rustic-600'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-12 h-12 border-2 border-rustic-400 rounded-full flex items-center justify-center text-rustic-600 hover:border-embers-600 hover:text-embers-600 hover:bg-embers-600/5 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
