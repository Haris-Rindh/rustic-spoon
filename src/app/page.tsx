import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import MenuClassic from '../components/MenuClassic';
import Events from '../components/Events';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Rustic Spoon | Premium Farm-to-Table Dining — Napa Valley',
  description: 'Experience Napa Valley\'s most celebrated farm-to-table restaurant. Wood-fired cuisine, curated menus, private dining, and warm hospitality.',
  alternates: { canonical: 'https://therusticspoon.com' },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuClassic />
        <Events />
        <Testimonials />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
