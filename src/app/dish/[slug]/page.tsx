import React from 'react';
import { getDbData } from '../../../lib/db';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { ArrowLeft, ChefHat, Clock, Leaf } from 'lucide-react';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 0;

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const { slug } = await params;
  const db = await getDbData();
  const menu = db.menu;
  const allItems = [...menu.starters, ...menu.mains, ...menu.desserts];
  const dish = allItems.find(i => i.slug === slug);
  if (!dish) return { title: 'Dish Not Found' };
  return {
    title: `${dish.name} | The Rustic Spoon`,
    description: `${dish.description} — Experience ${dish.name} at The Rustic Spoon, Napa Valley.`,
    openGraph: { title: `${dish.name} — The Rustic Spoon`, images: [dish.image] },
  };
}

export default async function DishPage({ params }: Props) {
  const { slug } = await params;
  const db = await getDbData();
  const menu = db.menu;
  const allItems = [...menu.starters, ...menu.mains, ...menu.desserts];
  const dish = allItems.find(i => i.slug === slug);
  if (!dish) notFound();

  const getCategory = (id: number) =>
    menu.starters.find(i => i.id === id) ? 'Starter' :
    menu.mains.find(i => i.id === id)    ? 'Main Course' : 'Dessert';

  const related = allItems
    .filter(i => i.id !== dish.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-rustic-50">
        {/* Hero image — full-bleed */}
        <div className="relative h-[55vh] md:h-[70vh] overflow-hidden">
          <Image src={dish.image} alt={dish.name} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/30" />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 pb-12 max-w-6xl">
            <Link href="/menu" className="inline-flex items-center text-white/60 hover:text-embers-400 font-semibold mb-6 transition-colors text-sm group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Menu
            </Link>
            <p className="text-embers-400 text-xs font-semibold uppercase tracking-[0.3em] mb-3">{getCategory(dish.id)}</p>
            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white leading-none">{dish.name}</h1>
          </div>
        </div>

        {/* Detail content */}
        <div className="container mx-auto px-6 max-w-6xl py-20">
          <div className="grid lg:grid-cols-5 gap-16">
            {/* Main description */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 text-embers-600 mb-6 text-sm font-semibold uppercase tracking-wider">
                <ChefHat className="w-5 h-5" /> Chef's Selection
              </div>
              <h2 className="font-serif text-3xl font-bold text-rustic-900 mb-4">{dish.name}</h2>
              <div className="w-12 h-0.5 bg-embers-600 mb-6" />
              <p className="text-rustic-600 text-xl leading-relaxed mb-8">{dish.description}</p>
              <p className="text-rustic-500 leading-relaxed mb-10">
                Every element of this dish is sourced within 50 miles of our kitchen. Chef Marcus Vance designed this recipe to celebrate the natural complexity of our local terroir — minimal intervention, maximum flavour.
              </p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-rustic-500 bg-rustic-100 px-4 py-2 rounded-sm">
                  <Leaf className="w-4 h-4 text-embers-600" /> Locally Sourced
                </div>
                <div className="flex items-center gap-2 text-sm text-rustic-500 bg-rustic-100 px-4 py-2 rounded-sm">
                  <Clock className="w-4 h-4 text-embers-600" /> Made to Order
                </div>
              </div>
            </div>

            {/* Price + CTA sidebar */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-rustic-100 shadow-xl p-10 rounded-sm sticky top-28">
                <p className="text-rustic-400 text-sm uppercase tracking-widest mb-2">Price</p>
                <div className="font-serif text-5xl font-bold text-embers-600 mb-6">{dish.price}</div>
                <p className="text-rustic-500 text-sm leading-relaxed mb-8 border-t border-rustic-100 pt-6">
                  Available during dinner service. This dish changes seasonally — please confirm availability when booking.
                </p>
                <Link
                  href="/reservations"
                  className="block w-full text-center py-4 bg-embers-600 text-white font-bold uppercase tracking-widest text-sm hover:bg-embers-500 transition-all duration-300 shadow-lg shadow-embers-600/20 mb-3"
                >
                  Reserve a Table
                </Link>
                <Link
                  href="/menu"
                  className="block w-full text-center py-4 border border-rustic-200 text-rustic-600 font-semibold text-sm hover:border-rustic-400 hover:text-rustic-900 transition-all duration-300"
                >
                  Browse Full Menu
                </Link>
              </div>
            </div>
          </div>

          {/* Related dishes */}
          <div className="mt-24">
            <h3 className="font-serif text-3xl font-bold text-rustic-900 mb-2">You Might Also Enjoy</h3>
            <div className="w-12 h-0.5 bg-embers-600 mb-10" />
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link key={item.id} href={`/dish/${item.slug}`} className="group dish-card block h-64 rounded-sm overflow-hidden shadow-md">
                  <div className="relative w-full h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
                    <div className="dish-info z-20">
                      <h4 className="font-serif text-lg font-bold text-white">{item.name}</h4>
                      <p className="text-embers-400 font-semibold">{item.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer settings={db.settings} />
    </>
  );
}
