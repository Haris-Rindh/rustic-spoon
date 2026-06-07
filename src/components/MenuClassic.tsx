'use client';

import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { menuData } from '../data';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type Tab = 'all' | 'starters' | 'mains' | 'desserts';
const tabs: Tab[] = ['all', 'starters', 'mains', 'desserts'];

export default function MenuClassic() {
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.setTextColor(67, 54, 46);
    doc.text('The Rustic Spoon — Menu', 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(150, 125, 96);
    doc.text('Curated daily based on market availability.', 14, 28);
    let yPos = 38;
    const addSection = (title: string, items: typeof menuData.starters) => {
      doc.setFontSize(15);
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
    addSection('Mains',    menuData.mains);
    addSection('Desserts', menuData.desserts);
    doc.save('The_Rustic_Spoon_Menu.pdf');
  };

  const getItems = () => {
    if (activeTab === 'all') return [...menuData.starters, ...menuData.mains, ...menuData.desserts];
    return menuData[activeTab];
  };

  const getCategory = (id: number) =>
    menuData.starters.find(i => i.id === id) ? 'Starter' :
    menuData.mains.find(i => i.id === id)    ? 'Main'    : 'Dessert';

  return (
    <section id="menu" className="py-28 bg-rustic-100 relative overflow-hidden">

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-texture opacity-60 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="block w-16 h-1 bg-embers-600 mx-auto mb-6 rounded-full" />
          <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-3">Seasonal Selection</p>
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-rustic-900 mb-4">The Menu</h2>
          <p className="text-rustic-500 italic text-lg">Curated daily based on market availability.</p>
        </motion.div>

        {/* ── Tabs ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-7 py-2 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-embers-600 text-white shadow-md shadow-embers-600/30'
                  : 'border border-rustic-400 text-rustic-600 hover:border-rustic-700 hover:text-rustic-900 hover:bg-rustic-200/60'
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* ── Menu List ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="grid md:grid-cols-2 gap-x-16 gap-y-0"
          >
            {getItems().map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/dish/${item.slug}`}
                  className="group flex flex-col py-6 border-b border-rustic-300/70 hover:border-embers-400 transition-all duration-300 relative"
                >
                  {/* Top row: name + dots + price */}
                  <div className="flex items-baseline gap-0 w-full">
                    {/* Dish name */}
                    <h4 className="font-bold text-xl text-rustic-900 group-hover:text-embers-600 transition-colors duration-300 shrink-0 pr-3">
                      {item.name}
                    </h4>

                    {/* Dot leader — grows and changes colour on hover */}
                    <span className="flex-grow border-b-2 border-dotted border-rustic-300 group-hover:border-embers-400 relative -top-1.5 mx-2 transition-colors duration-300" />

                    {/* Price */}
                    <span className="font-serif text-xl font-semibold text-embers-700 shrink-0 pl-3">
                      {item.price}
                    </span>
                  </div>

                  {/* Description + hover CTA row */}
                  <div className="flex items-end justify-between mt-2 gap-4">
                    <p className="text-sm text-rustic-500 leading-snug group-hover:text-rustic-700 transition-colors duration-300">
                      {item.description}
                    </p>

                    {/* Animated "View Dish" CTA — slides in from left on hover */}
                    <div className="flex items-center gap-1 text-embers-600 text-xs font-bold uppercase tracking-widest shrink-0
                                    translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                                    transition-all duration-300">
                      View Dish
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                    </div>
                  </div>

                  {/* Category badge — visible on hover */}
                  <span className="absolute top-5 right-0 text-[10px] font-bold uppercase tracking-widest text-embers-400/0 group-hover:text-embers-400 transition-all duration-300">
                    {getCategory(item.id)}
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ── Footer actions ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 pt-8 border-t border-rustic-300"
        >
          <Link
            href="/menu"
            className="group inline-flex items-center gap-2 text-rustic-700 font-bold hover:text-embers-600 transition-colors duration-300 text-sm uppercase tracking-widest"
          >
            View Full Menu Page
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </Link>

          <button
            onClick={generatePDF}
            className="group inline-flex items-center gap-2 text-embers-600 font-bold hover:text-embers-700 transition-colors duration-300 border-b-2 border-transparent hover:border-embers-600 pb-0.5 text-sm"
          >
            Download Full Menu PDF
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
