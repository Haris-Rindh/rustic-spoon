'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { menuData } from '../data';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Tab = 'all' | 'starters' | 'mains' | 'desserts';

const tabs: Tab[] = ['all', 'starters', 'mains', 'desserts'];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(24);
    doc.setTextColor(67, 54, 46);
    doc.text('The Rustic Spoon', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(150, 125, 96);
    doc.text('Farm-to-Table · Napa Valley', 14, 30);
    let yPos = 42;
    const addSection = (title: string, items: typeof menuData.starters) => {
      doc.setFontSize(16);
      doc.setTextColor(194, 65, 12);
      doc.text(title, 14, yPos);
      yPos += 4;
      autoTable(doc, {
        startY: yPos,
        head: [['Dish', 'Description', 'Price']],
        body: items.map(i => [i.name, i.description, i.price]),
        theme: 'striped',
        headStyles: { fillColor: [194, 65, 12] },
        margin: { top: 10 },
      });
      yPos = (doc as any).lastAutoTable.finalY + 16;
    };
    addSection('Starters', menuData.starters);
    addSection('Mains', menuData.mains);
    addSection('Desserts', menuData.desserts);
    doc.save('The_Rustic_Spoon_Menu.pdf');
  };

  const getVisibleItems = () => {
    if (activeTab === 'all') return [...menuData.starters, ...menuData.mains, ...menuData.desserts];
    return menuData[activeTab];
  };

  return (
    <section id="menu" className="py-24 bg-rustic-300 bg-texture text-rustic-900 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-4">Culinary Offerings</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold mb-4">The Menu</h2>
          <div className="section-ornament mx-auto max-w-xs">
            <span className="text-embers-500 text-xl">✦</span>
          </div>
          <p className="text-rustic-500 italic text-lg mt-4 max-w-xl mx-auto">Curated daily, inspired by what the farm brings us each morning.</p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-7 py-2.5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-rustic-900 text-white shadow-lg'
                  : 'border border-rustic-300 text-rustic-600 hover:border-rustic-600 hover:text-rustic-900'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.span layoutId="activeTab" className="absolute inset-0 bg-rustic-900 -z-10" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Dish grid — card style with images */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {getVisibleItems().map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link href={`/dish/${item.slug}`} className="dish-card block h-[340px] md:h-[380px] rounded-sm shadow-lg group">
                  <div className="relative w-full h-full overflow-hidden rounded-sm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />
                    <div className="dish-info z-20">
                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-white/60 text-xs uppercase tracking-widest mb-1">
                            {menuData.starters.find(s => s.id === item.id) ? 'Starter' :
                             menuData.mains.find(s => s.id === item.id) ? 'Main' : 'Dessert'}
                          </p>
                          <h3 className="font-serif text-xl md:text-2xl font-bold text-white mb-1">{item.name}</h3>
                          <p className="text-white/70 text-sm leading-snug max-w-xs line-clamp-2">{item.description}</p>
                        </div>
                        <span className="ml-4 shrink-0 font-serif text-2xl font-bold text-embers-400">{item.price}</span>
                      </div>
                      <div className="flex items-center mt-3 text-embers-400 text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        View Dish <ArrowRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* PDF download */}
        <div className="text-center mt-16">
          <button
            onClick={generatePDF}
            className="group inline-flex items-center gap-2 px-8 py-4 border border-rustic-300 text-rustic-600 font-semibold text-sm uppercase tracking-widest hover:border-embers-600 hover:text-embers-600 transition-all duration-300"
          >
            Download Full Menu PDF
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
