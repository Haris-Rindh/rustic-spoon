import React from 'react';
import Navbar from '../../components/Navbar';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Menu | The Rustic Spoon — Farm-to-Table Cuisine Napa Valley',
  description: 'Explore our seasonally curated farm-to-table menu at The Rustic Spoon. Starters, mains, and desserts crafted daily by Executive Chef Marcus Vance.',
};

export default function MenuPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero banner */}
        <div className="relative h-[50vh] md:h-[60vh] flex items-center justify-center overflow-hidden pt-24">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Culinary Offerings"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
          <div className="relative z-10 text-center px-4">
            <p className="text-embers-400 font-semibold tracking-[0.35em] uppercase text-xs mb-4">Daily Curated</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white drop-shadow-xl">
              Culinary Offerings
            </h1>
            <div className="w-16 h-px bg-embers-500 mx-auto mt-6" />
          </div>
        </div>

        <Menu />
      </main>
      <Footer />
    </>
  );
}
