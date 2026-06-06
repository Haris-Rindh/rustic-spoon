import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Events from '../components/Events';
import Testimonials from '../components/Testimonials';
import Gallery from '../components/Gallery';
import ReservationForm from '../components/ReservationForm';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <Events />
        <Testimonials />
        <Gallery />
        <ReservationForm />
      </main>
      <Footer />
    </>
  );
}
