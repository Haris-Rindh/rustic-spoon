import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: "Chef's Counter | The Rustic Spoon — Napa Valley",
  description: "Experience an exclusive front-row seat to Chef Marcus Vance's kitchen at The Rustic Spoon. A premium tasting menu experience unlike any other.",
};

export default function ChefsCounterPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-rustic-50">
        {/* Cinematic hero */}
        <div className="relative h-[70vh] flex items-end pb-16 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Chef's Counter at The Rustic Spoon"
            fill priority className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <p className="text-embers-400 font-semibold tracking-[0.35em] uppercase text-xs mb-4">Exclusive Experience</p>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-none">Chef's Counter</h1>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 max-w-6xl py-24">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900 mb-6">The Front Row of Fine Dining</h2>
              <div className="w-16 h-0.5 bg-embers-600 mb-8" />
              <p className="text-rustic-600 text-lg leading-relaxed mb-6">
                The Chef's Counter is our most intimate and theatrical dining experience. Seated directly at the pass, you'll watch Executive Chef Marcus Vance and his team orchestrate every course in real time — explaining each dish, sourcing story, and technique as it unfolds before you.
              </p>
              <p className="text-rustic-600 text-lg leading-relaxed mb-10">
                This is a tasting menu exclusively experience. Reservations are extremely limited to just 8 seats per service, ensuring total immersion and personal attention from the kitchen team.
              </p>

              <div className="grid grid-cols-3 gap-6 pb-10 border-b border-rustic-100 mb-10">
                {[
                  { icon: Users, label: 'Max Guests', val: '8 Seats' },
                  { icon: Clock, label: 'Duration', val: '3–4 Hours' },
                  { icon: Star, label: 'Experience', val: 'Tasting Menu' },
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
                Request a Seat <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="relative h-[600px] rounded-sm overflow-hidden shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Chef at work"
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
