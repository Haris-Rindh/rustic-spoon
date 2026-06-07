import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PrivateDiningForm from '../../components/PrivateDiningForm';
import { Users, ChefHat, Calendar, Star, Clock, Music } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Private Dining & Events | The Rustic Spoon — Napa Valley',
  description: "Host your next unforgettable event in The Harvest Room at The Rustic Spoon. An exclusive private dining experience for up to 40 guests in the heart of Napa Valley.",
};

const amenities = [
  { icon: Users,    title: 'Capacity',         desc: 'Up to 40 seated, 60 cocktail reception' },
  { icon: ChefHat,  title: 'Custom Menus',     desc: 'Curated personally by Executive Chef Marcus Vance' },
  { icon: Star,     title: 'Dedicated Service', desc: 'Private waitstaff throughout your event' },
  { icon: Calendar, title: '7-Day Availability',desc: 'Available for lunch or dinner, every day' },
  { icon: Clock,    title: 'Flexible Duration', desc: 'Full evening or 2-hour minimums available' },
  { icon: Music,    title: 'AV Equipment',      desc: 'Presentation display, wireless microphone' },
];

export default function PrivateDiningPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-rustic-50">

        {/* ── Hero ── */}
        <div className="relative h-[65vh] md:h-[75vh] flex items-end pb-16 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="The Harvest Room — Private Dining at The Rustic Spoon"
            fill priority className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          <div className="container mx-auto px-6 max-w-5xl relative z-10">
            <p className="text-embers-400 font-semibold tracking-[0.35em] uppercase text-xs mb-4">Exclusive Venue</p>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-none mb-4">The Harvest Room</h1>
            <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl">
              An intimate sanctuary for your most important gatherings.
            </p>
          </div>
        </div>

        {/* ── Intro + Side Image ── */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-6">Private Dining</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900 mb-6 leading-tight">
                  Elevate Every Occasion
                </h2>
                <div className="w-16 h-0.5 bg-embers-600 mb-8" />
                <p className="text-rustic-600 text-lg leading-relaxed mb-6">
                  Tucked away from the main dining room, The Harvest Room is a secluded sanctuary adorned with exposed brick walls, hand-hewn oak tables, and curated ambient lighting. Every detail is designed to set the stage for memories that last a lifetime.
                </p>
                <p className="text-rustic-600 text-lg leading-relaxed mb-10">
                  From rehearsal dinners and corporate events to milestone birthdays — our private dining coordinator works with you to craft a bespoke experience, from the menu to the floral arrangements.
                </p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-embers-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-embers-500 transition-all duration-300 shadow-lg shadow-embers-600/20"
                >
                  Inquire Now
                </a>
              </div>

              <div className="relative h-[560px] rounded-sm overflow-hidden shadow-2xl group">
                <div className="absolute -top-5 -right-5 w-full h-full border-2 border-embers-600/50 z-0 hidden lg:block" />
                <div className="relative z-10 h-full w-full overflow-hidden rounded-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Private event table setting"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Amenities Grid ── */}
        <section className="py-24 bg-rustic-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-4">Everything Included</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900">The Experience</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="bg-white p-8 rounded-sm border border-rustic-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-embers-50 flex items-center justify-center mb-6 rounded-sm">
                    <Icon className="w-6 h-6 text-embers-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-rustic-900 mb-2">{title}</h3>
                  <p className="text-rustic-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Second image ── */}
        <div className="relative h-[50vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Premium dining setup"
            fill className="object-cover"
          />
          <div className="absolute inset-0 bg-rustic-900/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-embers-400 font-semibold tracking-[0.3em] uppercase text-xs mb-4">The Details</p>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
              Starting from <span className="text-embers-400">$85</span> per person
            </h2>
            <p className="text-white/60 text-lg max-w-lg">Inclusive of a 4-course tasting menu, service, and water. Custom packages available upon request.</p>
          </div>
        </div>

        {/* ── Inquiry Form ── */}
        <section id="inquiry" className="py-24 bg-white scroll-mt-24">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-12">
              <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-4">Get In Touch</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900 mb-4">Inquire About an Event</h2>
              <p className="text-rustic-500 max-w-xl mx-auto">
                Fill in the details below and our private dining coordinator will reach out within 24 hours to discuss your vision.
              </p>
            </div>

            <div className="bg-rustic-50 border border-rustic-100 shadow-xl p-10 md:p-14 rounded-sm">
              <PrivateDiningForm />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
