'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } }
};

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: 'easeOut' } }
};

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* Background image with zoom-out reveal */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat"
      />
      {/* Gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center text-white px-6 max-w-5xl mx-auto w-full pt-20"
      >
        <motion.p variants={fadeUp} className="text-embers-400 font-semibold tracking-[0.35em] uppercase mb-6 text-xs md:text-sm">
          Est. 2014 &bull; Napa Valley, California
        </motion.p>

        <motion.h1 variants={fadeUp} className="font-serif font-bold leading-[1.05] mb-8 text-5xl sm:text-6xl md:text-8xl lg:text-[96px]">
          Savor the
          <br />
          <em className="text-embers-400 not-italic">Rustic</em> Flavor
        </motion.h1>

        <motion.div variants={fadeIn} className="w-16 h-px bg-embers-500 mx-auto mb-8" />

        <motion.p variants={fadeUp} className="text-base sm:text-lg md:text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Authentic farm-to-table dining where every dish tells a story of tradition, passion, and local heritage.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 w-full">
          <Link
            href="/menu"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-embers-600 text-white font-semibold tracking-wider hover:bg-embers-500 transition-all duration-300 shadow-lg shadow-embers-600/30 hover:shadow-embers-500/40 hover:shadow-xl text-sm uppercase"
          >
            Explore Our Menu
            <ArrowRight className="ml-3 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/reservations"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-white/70 text-white font-semibold tracking-wider hover:bg-white hover:text-rustic-900 transition-all duration-300 text-sm uppercase"
          >
            Reserve a Table
          </Link>
        </motion.div>

        {/* Award badges */}
        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-8 mt-16 pt-12 border-t border-white/10">
          {[
            { label: 'Michelin Recommended', value: '2024' },
            { label: 'James Beard Nominated', value: '2023' },
            { label: 'Farm Partners', value: '20+' },
          ].map((badge) => (
            <div key={badge.label} className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold text-embers-400">{badge.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-widest mt-1">{badge.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </header>
  );
}
