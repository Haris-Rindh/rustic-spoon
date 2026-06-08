'use client';

import React from 'react';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const links = [
  { label: 'Our Story',      href: '/our-story' },
  { label: 'Menu',           href: '/menu' },
  { label: 'Private Dining', href: '/private-dining' },
  { label: 'Gallery',        href: '/#gallery' },
  { label: 'Reservations',   href: '/reservations' },
];

const hours = [
  { days: 'Mon – Thu', time: '5:00 PM – 10:00 PM' },
  { days: 'Fri – Sat', time: '5:00 PM – 11:00 PM' },
  { days: 'Sunday',    time: '4:00 PM – 9:00 PM' },
];

interface SiteSettings {
  restaurantName: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  instagramUrl: string;
  facebookUrl: string;
  tripAdvisorUrl: string;
}

interface FooterProps {
  settings?: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {
  return (
    <footer className="bg-rustic-900 text-rustic-400 relative z-10">
      {/* Top CTA band */}
      <div className="border-y border-rustic-800">
        <div className="container mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-serif text-3xl md:text-4xl text-white font-bold mb-2">Ready for an evening to remember?</h3>
            <p className="text-rustic-400">Reserve your table at The Rustic Spoon today.</p>
          </div>
          <Link
            href="/reservations"
            className="group shrink-0 inline-flex items-center gap-3 px-10 py-4 bg-embers-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-embers-500 transition-all duration-300 shadow-lg shadow-embers-600/20"
          >
            Book a Table <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main footer body */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold text-white tracking-widest block mb-4">
              {settings?.restaurantName || 'The Rustic Spoon'}
            </Link>
            <p className="text-embers-500 text-[10px] uppercase tracking-[0.3em] mb-6">Napa Valley · Est. 2014</p>
            <p className="text-rustic-400 leading-relaxed text-sm mb-8">
              Authentic farm-to-table cuisine, locally sourced and lovingly prepared — every evening, just for you.
            </p>
            <div className="flex items-center gap-4">
              <a
                href={settings?.instagramUrl || "https://instagram.com/therusticspoon"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-embers-600 flex items-center justify-center text-white hover:bg-embers-500 transition-colors shadow-md shadow-embers-600/30 group"
              >
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href={settings?.facebookUrl || "https://facebook.com/therusticspoon"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-rustic-700 flex items-center justify-center text-rustic-400 hover:text-white hover:border-rustic-500 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              {settings?.tripAdvisorUrl && (
                <a
                  href={settings.tripAdvisorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-rustic-700 flex items-center justify-center text-rustic-400 hover:text-white hover:border-rustic-500 transition-colors"
                  title="TripAdvisor"
                >
                  <span className="text-[10px] font-bold tracking-tighter">TA</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Navigate</h4>
            <ul className="space-y-3">
              {links.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-rustic-400 hover:text-embers-400 transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-4 overflow-hidden transition-all duration-300 inline-block">
                      <ArrowRight className="w-3.5 h-3.5 text-embers-500 shrink-0" />
                    </span>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Hours</h4>
            <ul className="space-y-4">
              {settings?.hours ? (
                <li className="border-b border-rustic-800 pb-3 text-sm">
                  <span className="text-white font-semibold leading-relaxed block">{settings.hours}</span>
                </li>
              ) : (
                hours.map(({ days, time }) => (
                  <li key={days} className="flex justify-between items-baseline border-b border-rustic-800 pb-3 text-sm gap-4">
                    <span className="shrink-0">{days}</span>
                    <span className="text-white font-semibold text-right">{time}</span>
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Contact + newsletter */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">Contact</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-sm text-rustic-300">
                <MapPin className="w-4 h-4 text-embers-500 mt-0.5 shrink-0" />
                <span>{settings?.address || '1230 Napa Valley Hwy, St. Helena, CA 94574'}</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-rustic-300">
                <Phone className="w-4 h-4 text-embers-500 shrink-0" />
                <a href={`tel:${(settings?.phone || "(707) 555-0199").replace(/[^0-9]/g, '')}`} className="hover:text-white transition-colors">
                  {settings?.phone || "(707) 555-0199"}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-rustic-300">
                <Mail className="w-4 h-4 text-embers-500 shrink-0" />
                <a href={`mailto:${settings?.email || "reservations@therusticspoon.com"}`} className="hover:text-white transition-colors">
                  {settings?.email || "reservations@therusticspoon.com"}
                </a>
              </li>
            </ul>

            <h4 className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-4">Newsletter</h4>
            <form
              className="flex gap-2"
              onSubmit={(e) => { e.preventDefault(); }}
            >
              <input
                type="email"
                placeholder="Your email"
                required
                className="flex-1 bg-rustic-800 border border-rustic-700 px-4 py-2.5 text-sm text-white placeholder-rustic-600 focus:outline-none focus:border-embers-600 transition-colors min-w-0"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-embers-600 text-white hover:bg-embers-500 transition-colors shrink-0"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-rustic-800">
        <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-rustic-600">
          <p>&copy; {new Date().getFullYear()} The Rustic Spoon. All rights reserved.</p>
          <div className="flex gap-6">
            <button className="hover:text-rustic-400 transition-colors">Privacy Policy</button>
            <button className="hover:text-rustic-400 transition-colors">Terms of Service</button>
            <button className="hover:text-rustic-400 transition-colors">Sitemap</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
