'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Gift, X, Instagram, Facebook, Twitter } from 'lucide-react';
import GiftCardModal from './GiftCardModal';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/our-story',     label: 'Our Story' },
  { href: '/menu',          label: 'Menu' },
  { href: '/private-dining', label: 'Private Dining' },
  { href: '/#gallery',      label: 'Gallery' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isGiftOpen, setIsGiftOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsMobileOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-rustic-900/95 backdrop-blur-md shadow-xl shadow-black/20 py-3'
            : 'bg-gradient-to-b from-black/60 to-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="group flex flex-col items-start">
            <span className="font-serif text-xl md:text-2xl font-bold tracking-widest text-white leading-none">
              The Rustic Spoon
            </span>
            <span className="text-embers-500 text-[9px] tracking-[0.35em] uppercase mt-0.5 font-semibold opacity-80">
              Napa Valley · Est. 2014
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-semibold">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`nav-link-underline transition-colors duration-200 ${
                  isActive(href) ? 'text-embers-400 active' : 'text-white/80 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <button
              onClick={() => setIsGiftOpen(true)}
              className="nav-link-underline text-embers-400 hover:text-embers-300 transition-colors flex items-center gap-1.5"
            >
              <Gift className="w-3.5 h-3.5" /> Gift Cards
            </button>
            <Link
              href="/reservations"
              className={`px-5 py-2.5 border text-xs transition-all duration-300 ${
                isActive('/reservations')
                  ? 'bg-embers-600 border-embers-600 text-white'
                  : 'border-white/50 text-white hover:bg-embers-600 hover:border-embers-600'
              }`}
            >
              Reserve
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden text-white p-2 z-50 relative"
            aria-label="Toggle navigation"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <Menu className="w-7 h-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-rustic-900 flex flex-col"
          >
            {/* Top spacer */}
            <div className="h-20" />
            <div className="flex-1 flex flex-col justify-center items-center gap-0 px-8">
              {navLinks.map(({ href, label }, index) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <Link
                    href={href}
                    className={`block py-5 border-b border-rustic-800 font-serif text-3xl font-bold transition-colors ${
                      isActive(href) ? 'text-embers-400' : 'text-white hover:text-embers-300'
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <button
                  onClick={() => { setIsMobileOpen(false); setIsGiftOpen(true); }}
                  className="block w-full py-5 border-b border-rustic-800 font-serif text-3xl font-bold text-left text-embers-400 hover:text-embers-300 transition-colors"
                >
                  Gift Cards
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="w-full pt-8"
              >
                <Link
                  href="/reservations"
                  className="block w-full text-center py-4 bg-embers-600 text-white font-bold text-lg uppercase tracking-widest hover:bg-embers-500 transition-colors"
                >
                  Book a Table
                </Link>
              </motion.div>
            </div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="pb-12 flex justify-center gap-8"
            >
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-embers-400 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-embers-400 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-embers-400 transition-colors">
                <Twitter className="w-6 h-6" />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <GiftCardModal isOpen={isGiftOpen} onClose={() => setIsGiftOpen(false)} />
    </>
  );
}
