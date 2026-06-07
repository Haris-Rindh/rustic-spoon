'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const experiences = [
  {
    title: 'The Harvest Room',
    subtitle: 'Private Dining',
    description: 'An intimate sanctuary for rehearsal dinners, corporate events, and milestone celebrations. Up to 40 guests.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/private-dining'
  },
  {
    title: "Chef's Counter",
    subtitle: 'Exclusive Experience',
    description: 'Front-row seats to our open kitchen. Watch Chef Marcus craft each course — a tasting menu experience like no other.',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/chefs-counter'
  },
  {
    title: 'Patio Seating',
    subtitle: 'Al Fresco Dining',
    description: 'Dine under the stars on our vine-wrapped terrace with sweeping views of the Napa Valley landscape.',
    image: 'https://images.unsplash.com/photo-1567521464027-f127ff144326?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    href: '/patio-seating'
  },
];

export default function Events() {
  return (
    <section id="events" className="py-28 bg-rustic-900 overflow-hidden relative">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#c2410c 1px, transparent 1px), linear-gradient(90deg, #c2410c 1px, transparent 1px)',
        backgroundSize: '60px 60px'
      }} />

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-embers-500 font-semibold tracking-[0.3em] uppercase text-xs mb-4">Experiences & Events</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-white">Curated Experiences</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link href={exp.href} className="group block relative h-[480px] overflow-hidden rounded-sm">
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-embers-400 text-xs font-semibold uppercase tracking-widest mb-2">{exp.subtitle}</p>
                  <h3 className="font-serif text-2xl font-bold text-white mb-3">{exp.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 max-h-0 group-hover:max-h-20 overflow-hidden transition-all duration-500">
                    {exp.description}
                  </p>
                  <div className="flex items-center text-embers-400 text-sm font-semibold uppercase tracking-wider gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
