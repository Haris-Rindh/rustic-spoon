'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Gift, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 py-6 text-white ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-gradient-to-b from-black/60 to-transparent'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="font-serif text-2xl md:text-3xl font-bold tracking-wider relative group z-50">
            The Rustic Spoon
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-embers-600 transition-all duration-300 group-hover:w-full"></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-xs lg:text-sm uppercase tracking-widest font-semibold">
            <Link href="#about" className="hover:text-embers-500 transition-colors">About</Link>
            <Link href="#menu" className="hover:text-embers-500 transition-colors">Menu</Link>
            <Link href="#events" className="hover:text-embers-500 transition-colors">Private Dining</Link>
            <Link href="#testimonials" className="hover:text-embers-500 transition-colors">Reviews</Link>
            <Link href="#gallery" className="hover:text-embers-500 transition-colors">Gallery</Link>
            <button
              onClick={() => alert('Gift card modal coming soon!')}
              className="text-embers-500 hover:text-embers-400 transition-colors flex items-center uppercase font-semibold"
            >
              <Gift className="w-4 h-4 mr-1" /> Gifts
            </button>
            <Link
              href="#reserve"
              className="px-5 py-2 border-2 border-white hover:bg-embers-600 hover:border-embers-600 transition-all duration-300 rounded-sm ml-2"
            >
              Reserve
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white focus:outline-none z-50 p-2"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-rustic-900/95 backdrop-blur-md z-40 transform transition-transform duration-300 flex flex-col items-center justify-center space-y-6 text-xl font-serif ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <Link href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-embers-500 transition-colors">About</Link>
          <Link href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-embers-500 transition-colors">Menu</Link>
          <Link href="#events" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-embers-500 transition-colors">Private Dining</Link>
          <Link href="#testimonials" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-embers-500 transition-colors">Reviews</Link>
          <Link href="#gallery" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-embers-500 transition-colors">Gallery</Link>
          <button
            onClick={() => {
              alert('Gift card modal coming soon!');
              setIsMobileMenuOpen(false);
            }}
            className="text-embers-400 hover:text-white transition-colors flex items-center"
          >
            <Gift className="w-5 h-5 mr-2" /> Gift Cards
          </button>
          <Link href="#reserve" onClick={() => setIsMobileMenuOpen(false)} className="text-embers-500 font-bold mt-4 text-2xl">
            Book a Table
          </Link>
        </div>
      </nav>
    </>
  );
}
