'use client';

import React from 'react';
import { Mail } from 'lucide-react';

export default function Events() {
  return (
    <section id="events" className="py-24 bg-rustic-800 text-rustic-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519225421980-715cb0202128?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center fade-in-section is-visible">
          <p className="text-embers-500 font-bold tracking-widest uppercase mb-4">Celebrations & Gatherings</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6">Private Dining & Events</h2>
          <p className="text-lg md:text-xl text-rustic-200 mb-10 leading-relaxed">
            Host your next special occasion in our exclusive Harvest Room. Perfect for wedding rehearsals, corporate dinners, and family celebrations. Available for parties of 12 to 50 guests.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a href="mailto:events@rusticspoon.com" className="px-8 py-3 bg-white text-rustic-900 font-bold hover:bg-rustic-100 transition-colors rounded-sm shadow-lg flex items-center justify-center">
              <Mail className="w-5 h-5 mr-2" /> Inquire via Email
            </a>
            <button onClick={() => alert('Event Packet PDF download coming soon!')} className="px-8 py-3 border border-white text-white font-bold hover:bg-white/10 transition-colors rounded-sm flex items-center justify-center">
              Download Event Packet
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
