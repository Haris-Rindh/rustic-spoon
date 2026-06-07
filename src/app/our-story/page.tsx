import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import type { Metadata } from 'next';
import Image from 'next/image';
import { Leaf, Award, Users, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Our Story | The Rustic Spoon — Napa Valley',
  description: 'Discover the philosophy and passion behind The Rustic Spoon — a farm-to-table journey rooted in Napa Valley\'s rich terroir.',
};

const milestones = [
  { year: '2014', event: 'Founded by Chef Marcus Vance with a vision of hyper-local cuisine.' },
  { year: '2016', event: 'Opened the Harvest Room, expanding into private dining experiences.' },
  { year: '2019', event: 'Named Best Farm-to-Table Restaurant in the Bay Area by Eater.' },
  { year: '2023', event: 'James Beard Award nomination for Outstanding Culinary Experience.' },
];

const values = [
  { icon: Leaf, title: 'Seasonal & Local', desc: 'We partner with 20+ local farms and foragers to source the finest seasonal ingredients.' },
  { icon: Award, title: 'Chef-Driven', desc: 'Every menu is crafted personally by Executive Chef Marcus Vance, changing daily.' },
  { icon: Users, title: 'Community First', desc: 'We invest back into Napa Valley through supplier partnerships and culinary education.' },
  { icon: Heart, title: 'Passion on Every Plate', desc: 'From our wood-fired hearth to your table — every dish is an act of love.' },
];

export default function OurStoryPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* Cinematic Hero */}
        <div className="relative h-[65vh] flex items-end pb-16 overflow-hidden pt-24">
          <Image
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Chef Marcus Vance"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="container mx-auto px-6 max-w-4xl relative z-10">
            <p className="text-embers-400 font-semibold tracking-[0.35em] uppercase text-xs mb-4">Since 2014</p>
            <h1 className="font-serif text-6xl md:text-8xl font-bold text-white leading-none">Our Story</h1>
          </div>
        </div>

        {/* Philosophy section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-6">A Symphony of Soil & Season</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900 mb-6 leading-tight">
                  Food Should Speak for Itself
                </h2>
                <div className="w-16 h-0.5 bg-embers-600 mb-8" />
                <p className="text-rustic-600 text-lg leading-relaxed mb-6">
                  Located in the heart of Napa Valley, The Rustic Spoon was born from a simple, uncompromising philosophy: food should tell the truth about where it came from, who grew it, and the season in which it was harvested.
                </p>
                <p className="text-rustic-600 text-lg leading-relaxed mb-8">
                  We partner with over 20 local farms, foragers, and artisans to bring you ingredients at their absolute peak. Executive Chef Marcus Vance crafts a daily-changing menu that honors the rugged elegance of wine country.
                </p>
                <div className="grid grid-cols-3 gap-8 pt-8 border-t border-rustic-100">
                  {[
                    { val: '20+', label: 'Farm Partners' },
                    { val: 'Daily', label: 'Menu Updates' },
                    { val: '10yr', label: 'Of Excellence' },
                  ].map(({ val, label }) => (
                    <div key={label} className="text-center">
                      <div className="font-serif text-3xl font-bold text-rustic-900 mb-1">{val}</div>
                      <div className="text-rustic-400 text-xs uppercase tracking-widest font-semibold">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="absolute -top-6 -right-6 w-full h-full border-2 border-embers-600 hidden md:block" />
                <div className="relative z-10 h-[560px] rounded-sm overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Kitchen at work"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-rustic-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <p className="text-embers-600 font-semibold tracking-[0.3em] uppercase text-xs mb-4">What We Stand For</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-rustic-900">Our Core Values</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="bg-white p-8 rounded-sm shadow-sm border border-rustic-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 bg-embers-50 rounded-sm flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-embers-600" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-rustic-900 mb-3">{title}</h3>
                  <p className="text-rustic-500 text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline milestones */}
        <section className="py-24 bg-rustic-900">
          <div className="container mx-auto px-6 max-w-4xl">
            <div className="text-center mb-16">
              <p className="text-embers-500 font-semibold tracking-[0.3em] uppercase text-xs mb-4">A Decade of Excellence</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white">Our Journey</h2>
            </div>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-px bg-embers-600/30" />
              <div className="space-y-12">
                {milestones.map(({ year, event }) => (
                  <div key={year} className="relative flex gap-8 items-start pl-8">
                    <div className="absolute left-0 top-1 w-16 h-16 -translate-x-8 bg-rustic-800 border border-embers-600/30 rounded-sm flex items-center justify-center shrink-0">
                      <span className="font-serif text-embers-400 font-bold text-sm">{year}</span>
                    </div>
                    <div className="pt-4">
                      <p className="text-rustic-200 text-lg leading-relaxed">{event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
