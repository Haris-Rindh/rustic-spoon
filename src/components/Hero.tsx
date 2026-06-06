import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <header className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-32 pb-16">
      <div className="absolute inset-0 bg-hero-pattern bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"></div>
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto fade-in-section is-visible">
        <p className="text-embers-500 font-bold tracking-[0.2em] uppercase mb-4 text-xs md:text-sm animate-pulse">
          Est. 2014 &bull; Napa Valley
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-10 leading-tight drop-shadow-lg">
          Savor the <br /><span className="italic text-embers-500">Rustic</span> Flavor
        </h1>
        <p className="text-base sm:text-lg md:text-2xl text-gray-100 mb-8 md:mb-12 max-w-xl md:max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
          Experience authentic farm-to-table dining where every dish tells a story of tradition, passion, and local heritage.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link href="#menu" className="group px-6 sm:px-8 py-3 sm:py-4 bg-embers-600 text-white font-semibold tracking-wide hover:bg-embers-700 transition-all shadow-lg hover:shadow-embers-600/50 rounded-sm flex items-center justify-center text-sm sm:text-base">
            View Full Menu
            <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link href="#reserve" className="px-6 sm:px-8 py-3 sm:py-4 bg-transparent border-2 border-white text-white font-semibold tracking-wide hover:bg-white hover:text-rustic-900 transition-all rounded-sm shadow-lg text-sm sm:text-base">
            Book a Table
          </Link>
        </div>
      </div>
    </header>
  );
}
