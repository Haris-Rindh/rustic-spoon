import React from 'react';
import Link from 'next/link';
import { getDbData, isUsingKV } from '../../../lib/db';
import {
  UtensilsCrossed,
  CalendarDays,
  MessageSquare,
  Image as ImageIcon,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle,
  Database
} from 'lucide-react';

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const db = await getDbData();
  const kvConnected = isUsingKV();

  const totalStarters = db.menu.starters.length;
  const totalMains = db.menu.mains.length;
  const totalDesserts = db.menu.desserts.length;
  const totalMenu = totalStarters + totalMains + totalDesserts;

  const totalReservations = db.reservations.length;
  const pendingReservations = db.reservations.filter(r => r.status === 'Pending').length;
  const confirmedReservations = db.reservations.filter(r => r.status === 'Confirmed').length;

  const totalTestimonials = db.testimonials.length;
  const totalGallery = db.gallery.length;

  // Get 5 most recent reservations
  const recentReservations = [...db.reservations]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  const formattedDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-rustic-900 pb-6">
        <div>
          <span className="text-embers-500 font-semibold tracking-widest text-[10px] uppercase block mb-1">
            Overview Panel
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-wide text-white">
            Welcome, Restaurant Manager
          </h1>
          <p className="text-rustic-400 text-xs mt-1">
            System Status: Healthy | {formattedDate}
          </p>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Menu */}
        <div className="bg-rustic-900/40 border border-rustic-850 p-6 rounded-sm shadow-md relative overflow-hidden group hover:border-embers-600/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-rustic-400 text-[10px] uppercase tracking-widest font-semibold">
                Menu Items
              </p>
              <h3 className="font-serif text-4xl font-bold text-white mt-1 group-hover:text-embers-400 transition-colors">{totalMenu}</h3>
            </div>
            <div className="w-10 h-10 rounded-sm bg-embers-950 border border-embers-600/20 flex items-center justify-center text-embers-500">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 border-t border-rustic-850/60 pt-4 text-center text-[10px] text-rustic-400 font-semibold uppercase tracking-wider">
            <div>
              <span className="block text-white text-xs font-bold">{totalStarters}</span>
              Starters
            </div>
            <div>
              <span className="block text-white text-xs font-bold">{totalMains}</span>
              Mains
            </div>
            <div>
              <span className="block text-white text-xs font-bold">{totalDesserts}</span>
              Desserts
            </div>
          </div>
        </div>

        {/* Card 2: Reservations */}
        <div className="bg-rustic-900/40 border border-rustic-850 p-6 rounded-sm shadow-md relative overflow-hidden group hover:border-embers-600/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-rustic-400 text-[10px] uppercase tracking-widest font-semibold">
                Reservations
              </p>
              <h3 className="font-serif text-4xl font-bold text-white mt-1 group-hover:text-embers-400 transition-colors">{totalReservations}</h3>
            </div>
            <div className="w-10 h-10 rounded-sm bg-embers-950 border border-embers-600/20 flex items-center justify-center text-embers-500">
              <CalendarDays className="w-5 h-5" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 border-t border-rustic-850/60 pt-4 text-center text-[10px] text-rustic-400 font-semibold uppercase tracking-wider">
            <div className="border-r border-rustic-850/60">
              <span className={`block text-xs font-bold ${pendingReservations > 0 ? 'text-embers-400 animate-pulse' : 'text-white'}`}>
                {pendingReservations}
              </span>
              Pending
            </div>
            <div>
              <span className="block text-green-400 text-xs font-bold">{confirmedReservations}</span>
              Confirmed
            </div>
          </div>
        </div>

        {/* Card 3: Testimonials */}
        <div className="bg-rustic-900/40 border border-rustic-850 p-6 rounded-sm shadow-md relative overflow-hidden group hover:border-embers-600/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-rustic-400 text-[10px] uppercase tracking-widest font-semibold">
                Guest Reviews
              </p>
              <h3 className="font-serif text-4xl font-bold text-white mt-1 group-hover:text-embers-400 transition-colors">{totalTestimonials}</h3>
            </div>
            <div className="w-10 h-10 rounded-sm bg-embers-950 border border-embers-600/20 flex items-center justify-center text-embers-500">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 border-t border-rustic-850/60 pt-4 text-[10px] text-rustic-400 font-semibold uppercase tracking-wider">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span>Rating: 5.0 Average</span>
          </div>
        </div>

        {/* Card 4: Gallery */}
        <div className="bg-rustic-900/40 border border-rustic-850 p-6 rounded-sm shadow-md relative overflow-hidden group hover:border-embers-600/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-rustic-400 text-[10px] uppercase tracking-widest font-semibold">
                Gallery Images
              </p>
              <h3 className="font-serif text-4xl font-bold text-white mt-1 group-hover:text-embers-400 transition-colors">{totalGallery}</h3>
            </div>
            <div className="w-10 h-10 rounded-sm bg-embers-950 border border-embers-600/20 flex items-center justify-center text-embers-500">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 border-t border-rustic-850/60 pt-4 text-[10px] text-rustic-400 font-semibold uppercase tracking-wider">
            <CheckCircle className="w-4 h-4 text-embers-500" />
            <span>High-Res Active Images</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reservations & System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Upcoming Reservations */}
        <div className="lg:col-span-2 bg-rustic-900/40 border border-rustic-850 rounded-sm p-8 shadow-lg space-y-6">
          <div className="flex items-center justify-between border-b border-rustic-850 pb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-embers-500" />
              <h2 className="font-serif text-xl font-bold text-white">Recent Reservation Requests</h2>
            </div>
            <Link
              href="/admin/reservations"
              className="text-embers-400 hover:text-embers-300 text-xs font-semibold uppercase tracking-wider flex items-center gap-1 transition-all cursor-none"
            >
              Manage All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {recentReservations.length === 0 ? (
            <div className="py-12 text-center text-rustic-500">
              <p className="text-sm">No reservations logged in the database yet.</p>
              <p className="text-xs mt-1">Bookings submitted on the website will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-rustic-850 text-rustic-400 text-xs font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Guest</th>
                    <th className="py-3 px-4">Date/Time</th>
                    <th className="py-3 px-4">Guests</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rustic-850/45">
                  {recentReservations.map((res) => (
                    <tr key={res.id} className="hover:bg-rustic-900/30 transition-colors text-rustic-300">
                      <td className="py-4 px-4 font-bold text-white">{res.name}</td>
                      <td className="py-4 px-4">
                        {res.date} at {res.time}
                      </td>
                      <td className="py-4 px-4">{res.guests}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border
                            ${
                              res.status === 'Pending'
                                ? 'bg-amber-950/40 border-amber-500/30 text-amber-400'
                                : res.status === 'Confirmed'
                                ? 'bg-green-950/40 border-green-500/30 text-green-400'
                                : res.status === 'Completed'
                                ? 'bg-blue-950/40 border-blue-500/30 text-blue-400'
                                : 'bg-red-950/40 border-red-500/30 text-red-400'
                            }`}
                        >
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Col: Database & Server Settings */}
        <div className="bg-rustic-900/40 border border-rustic-850 rounded-sm p-8 shadow-lg space-y-6">
          <div className="flex items-center gap-2 border-b border-rustic-850 pb-4">
            <Database className="w-5 h-5 text-embers-500" />
            <h2 className="font-serif text-xl font-bold text-white">System Diagnostics</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold text-rustic-500 tracking-wider block">
                Deployment Mode
              </span>
              <span className="text-white text-sm font-semibold">
                {process.env.NODE_ENV === 'production' ? 'Production (Vercel)' : 'Local Development'}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold text-rustic-500 tracking-wider block">
                Primary Database
              </span>
              <span className="text-white text-sm font-semibold">
                {kvConnected ? 'Vercel KV (Persistent)' : 'Local JSON File DB (Ephemerally persistent on cloud)'}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-semibold text-rustic-500 tracking-wider block">
                Active Configurations
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-2 py-0.5 bg-rustic-950/80 border border-rustic-850 text-rustic-300 text-[10px] rounded-sm font-mono">
                  HTTPS Security: Enabled
                </span>
                <span className="px-2 py-0.5 bg-rustic-950/80 border border-rustic-850 text-rustic-300 text-[10px] rounded-sm font-mono">
                  App Router: Next.js 16
                </span>
                <span className="px-2 py-0.5 bg-rustic-950/80 border border-rustic-850 text-rustic-300 text-[10px] rounded-sm font-mono">
                  Tailwind: v4.0
                </span>
              </div>
            </div>

            {/* Warning if running in read-only environment */}
            {!kvConnected && (
              <div className="p-4.5 bg-amber-950/35 border border-amber-500/20 rounded-sm text-xs text-amber-300/95 leading-relaxed">
                <strong>Notice:</strong> Your changes will persist locally, but on serverless cloud deploys (Vercel), modifications are ephemeral. To ensure permanent data persistence on Vercel, link a free <strong>Vercel KV</strong> database in your Vercel Dashboard.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
