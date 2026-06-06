'use client';

import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-rustic-900 pt-20 pb-10 text-rustic-400 border-t border-rustic-800">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="font-serif text-2xl font-bold tracking-wider text-white mb-6 inline-block">The Rustic Spoon</Link>
            <p className="mb-6 leading-relaxed">Authentic farm-to-table dining experience. Bringing the best of Napa Valley directly to your plate.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full border border-rustic-700 flex items-center justify-center hover:bg-embers-600 hover:text-white hover:border-embers-600 transition-colors font-bold text-xs">
                IG
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-rustic-700 flex items-center justify-center hover:bg-embers-600 hover:text-white hover:border-embers-600 transition-colors font-bold text-xs">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-rustic-700 flex items-center justify-center hover:bg-embers-600 hover:text-white hover:border-embers-600 transition-colors font-bold text-xs">
                X
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-embers-500 mr-3 mt-0.5 shrink-0" />
                <span>123 Vineyard Drive<br />Napa Valley, CA 94558</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-embers-500 mr-3 shrink-0" />
                <span>(555) 987-6543</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-embers-500 mr-3 shrink-0" />
                <span>hello@rusticspoon.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Hours</h4>
            <ul className="space-y-4">
              <li className="flex justify-between border-b border-rustic-800 pb-2">
                <span>Mon - Thu</span>
                <span className="text-white">5:00 PM - 10:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-rustic-800 pb-2">
                <span>Fri - Sat</span>
                <span className="text-white">5:00 PM - 11:00 PM</span>
              </li>
              <li className="flex justify-between border-b border-rustic-800 pb-2">
                <span>Sunday</span>
                <span className="text-white">4:00 PM - 9:00 PM</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-sm mb-6">Newsletter</h4>
            <p className="mb-4">Subscribe for seasonal menu updates and exclusive event invitations.</p>
            <form className="flex flex-col space-y-3" onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
              <input type="email" placeholder="Email Address" required className="bg-rustic-800 border border-rustic-700 px-4 py-3 rounded-sm focus:outline-none focus:border-embers-600 text-white" />
              <button type="submit" className="bg-embers-600 hover:bg-embers-700 text-white font-bold py-3 px-4 rounded-sm transition-colors">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="border-t border-rustic-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} The Rustic Spoon. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button onClick={() => alert('Privacy Policy modal')} className="hover:text-white transition-colors">Privacy Policy</button>
            <button onClick={() => alert('Terms of Service modal')} className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={() => alert('Careers modal')} className="hover:text-white transition-colors">Careers</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
