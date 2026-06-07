import React from 'react';
import Navbar from '../../components/Navbar';
import ReservationWidget from '../../components/ReservationWidget';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Phone, Mail, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Reservations | The Rustic Spoon — Book Your Table in Napa Valley',
  description: 'Reserve your table at The Rustic Spoon. Choose your date, time, and seating preference for an unforgettable farm-to-table dining experience.',
};

export default function ReservationsPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero banner */}
        <div className="relative h-[40vh] flex items-end pb-16 overflow-hidden pt-24">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="The Rustic Spoon dining room"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="container mx-auto px-6 relative z-10">
            <p className="text-embers-400 font-semibold tracking-[0.35em] uppercase text-xs mb-3">Your Evening Awaits</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white">Reserve a Table</h1>
          </div>
        </div>

        {/* Contact at a glance */}
        <div className="bg-rustic-900">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-20 text-center text-sm">
              {[
                { icon: Phone, label: 'Call Us', value: '(555) 987-6543', href: 'tel:5559876543' },
                { icon: Mail,  label: 'Email Us', value: 'hello@rusticspoon.com', href: 'mailto:hello@rusticspoon.com' },
                { icon: Clock, label: 'Dinner Service', value: '5:00 PM – 11:00 PM', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <Icon className="w-5 h-5 text-embers-500" />
                  <p className="text-rustic-400 text-xs uppercase tracking-widest">{label}</p>
                  {href ? (
                    <a href={href} className="text-white font-semibold hover:text-embers-400 transition-colors">{value}</a>
                  ) : (
                    <p className="text-white font-semibold">{value}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reservation widget */}
        <div className="bg-rustic-50 py-16 px-6">
          <ReservationWidget />
        </div>
      </main>
      <Footer />
    </>
  );
}
