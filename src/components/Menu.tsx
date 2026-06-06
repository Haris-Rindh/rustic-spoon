'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { menuData } from '../data';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Menu() {
  const [activeTab, setActiveTab] = useState<'all' | 'starters' | 'mains' | 'desserts'>('all');

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(22);
    doc.text("The Rustic Spoon - Menu", 14, 20);
    
    doc.setFontSize(10);
    doc.text("Curated daily based on market availability.", 14, 28);
    
    let yPos = 35;
    
    const addSection = (title: string, items: any[]) => {
      doc.setFontSize(16);
      doc.text(title, 14, yPos);
      yPos += 5;
      
      const tableData = items.map(item => [item.name, item.description, item.price]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Item', 'Description', 'Price']],
        body: tableData,
        theme: 'striped',
        headStyles: { fillColor: [194, 65, 12] }, // embers-600
        margin: { top: 10 },
      });
      
      yPos = (doc as any).lastAutoTable.finalY + 15;
    };

    addSection("Starters", menuData.starters);
    addSection("Mains", menuData.mains);
    addSection("Desserts", menuData.desserts);

    doc.save("The_Rustic_Spoon_Menu.pdf");
  };

  const getVisibleItems = () => {
    if (activeTab === 'all') {
      return [...menuData.starters, ...menuData.mains, ...menuData.desserts];
    }
    return menuData[activeTab];
  };

  return (
    <section id="menu" className="py-24 bg-rustic-100 bg-texture text-rustic-900 scroll-mt-20">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-12 fade-in-section is-visible">
          <span className="block w-16 h-1 bg-embers-600 mx-auto mb-6 rounded-full"></span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">The Menu</h2>
          <p className="text-rustic-600 italic text-lg">Curated daily based on market availability.</p>
        </div>

        {/* Menu Filtering Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16 fade-in-section is-visible">
          {['all', 'starters', 'mains', 'desserts'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-2 border border-rustic-400 rounded-full font-semibold transition-all uppercase text-sm tracking-wider ${
                activeTab === tab ? 'bg-embers-600 text-white border-embers-600' : 'text-rustic-700 hover:bg-rustic-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10 min-h-[500px]">
          {getVisibleItems().map((item) => (
            <div key={item.id} className="menu-item-card fade-in-section is-visible">
              <div className="menu-item group cursor-default">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-bold text-xl group-hover:text-embers-600 transition-colors">{item.name}</h4>
                  <span className="dots flex-grow mx-4 border-b-2 border-dotted border-rustic-300 relative -top-1 opacity-40 transition-all"></span>
                  <span className="font-serif text-xl font-semibold text-embers-700">{item.price}</span>
                </div>
                <p className="text-base text-rustic-600 leading-snug">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={generatePDF}
            className="inline-flex items-center text-embers-600 font-bold hover:text-embers-700 transition-colors border-b-2 border-transparent hover:border-embers-700 pb-1 cursor-pointer"
          >
            Download Full Menu PDF <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
