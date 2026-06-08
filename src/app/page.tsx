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

import { getDbData } from '../lib/db';

export const metadata: Metadata = {
  title: 'The Rustic Spoon | Premium Farm-to-Table Dining — Napa Valley',
  description: 'Experience Napa Valley\'s most celebrated farm-to-table restaurant. Wood-fired cuisine, curated menus, private dining, and warm hospitality.',
  alternates: { canonical: 'https://therusticspoon.com' },
};

// Ensure this page is rendered dynamically at request time to show admin updates
export const revalidate = 0;

export default async function Home() {
  const db = await getDbData();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <MenuClassic menu={db.menu} />
        <Events />
        <Testimonials reviews={db.testimonials} />
        <Gallery gallery={db.gallery} />
      </main>
      <Footer settings={db.settings} />
    </>
  );
}
