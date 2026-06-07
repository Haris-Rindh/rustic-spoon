'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2"
          >
            <div className="relative group w-full">
              {/* Restored Background Border */}
              <div className="absolute -top-6 -left-6 w-full h-[600px] border-2 border-embers-600 z-0 hidden md:block transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
              
              <div className="relative z-10 h-[600px] w-full rounded-sm overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                  alt="Chef preparing meal" 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900 mb-6">A Symphony of Soil & Season</h2>
            <div className="w-20 h-1 bg-embers-500 mb-8"></div>
            <p className="text-rustic-600 text-lg leading-relaxed mb-6">
              Located in the heart of Napa Valley, The Rustic Spoon was born from a simple philosophy: food should speak for itself. We partner with over 20 local farms, foragers, and artisans to bring you ingredients at their absolute peak.
            </p>
            <p className="text-rustic-600 text-lg leading-relaxed mb-8">
              Executive Chef Marcus Vance crafts a daily-changing menu that honors the rugged elegance of wine country. From our wood-fired hearth to your table, every plate is an expression of our terroir.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-rustic-200">
              <div>
                <h4 className="font-serif text-2xl font-bold text-rustic-900 mb-2">20+</h4>
                <p className="text-rustic-500 uppercase tracking-wider text-sm font-semibold">Local Partners</p>
              </div>
              <div>
                <h4 className="font-serif text-2xl font-bold text-rustic-900 mb-2">Daily</h4>
                <p className="text-rustic-500 uppercase tracking-wider text-sm font-semibold">Menu Updates</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
