import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Wind, Sunrise, TreePine } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Patio Seating | The Rustic Spoon — Al Fresco Dining Napa Valley',
  description: 'Dine al fresco on our vine-wrapped terrace at The Rustic Spoon, Napa Valley. Enjoy sweeping vineyard views under the stars.',
};

export default function PatioSeatingPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-rustic-50">
        {/* Cinematic hero */}
        <div className="relative h-[70vh] flex items-end pb-16 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1567521464027-f127ff144326?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Patio Seating at The Rustic Spoon"
            fill priority className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <p className="text-embers-400 font-semibold tracking-[0.35em] uppercase text-xs mb-4">Al Fresco Dining</p>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-none">Patio Seating</h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 max-w-6xl py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900 mb-6">Dining Beneath the Open Sky</h2>
              <div className="w-16 h-0.5 bg-embers-600 mb-8" />
              <p className="text-rustic-600 text-lg leading-relaxed mb-6">
                Our vine-wrapped terrace is the jewel of The Rustic Spoon. As evening descends over the Napa Valley, soft string lights illuminate the patio while you enjoy the full dinner menu under an open sky.
              </p>
              <p className="text-rustic-600 text-lg leading-relaxed mb-10">
                The patio seats up to 28 guests and is available seasonally from spring through autumn. We recommend arriving at sunset for the most breathtaking views over the surrounding vineyards.
              </p>

              <div className="grid grid-cols-3 gap-6 pb-10 border-b border-rustic-100 mb-10">
                {[
                  { icon: Wind,    label: 'Setting',   val: 'Open Air' },
                  { icon: TreePine, label: 'Views',    val: 'Vineyard' },
                  { icon: Sunrise,  label: 'Best Time', val: 'At Sunset' },
                ].map(({ icon: Icon, label, val }) => (
                  <div key={label} className="text-center">
                    <Icon className="w-6 h-6 text-embers-600 mx-auto mb-2" />
                    <p className="text-rustic-400 text-xs uppercase tracking-widest">{label}</p>
                    <p className="font-bold text-rustic-900 mt-1">{val}</p>
                  </div>
                ))}
              </div>

              <Link
                href="/reservations"
                className="group inline-flex items-center gap-3 px-10 py-4 bg-embers-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-embers-500 transition-all duration-300 shadow-lg shadow-embers-600/25"
              >
                Reserve Patio <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative h-[600px] rounded-sm overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Patio dining at dusk"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
