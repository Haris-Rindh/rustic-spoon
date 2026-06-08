'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  UtensilsCrossed,
  CalendarDays,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChefHat,
  Database,
  CloudLightning,
  AlertTriangle
} from 'lucide-react';

interface AdminSidebarProps {
  isUsingKV: boolean;
}

export default function AdminSidebar({ isUsingKV }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Menu Items', href: '/admin/menu', icon: UtensilsCrossed },
    { name: 'Reservations', href: '/admin/reservations', icon: CalendarDays },
    { name: 'Gallery Photos', href: '/admin/gallery', icon: ImageIcon },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      setLoggingOut(true);
      try {
        const res = await fetch('/api/admin/logout', { method: 'POST' });
        if (res.ok) {
          router.push('/admin/login');
          router.refresh();
        }
      } catch (err) {
        console.error('Logout failed:', err);
      } finally {
        setLoggingOut(false);
      }
    }
  };

  const statusBadge = () => {
    if (isUsingKV) {
      return (
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-950/50 border border-green-500/30 text-green-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
          <CloudLightning className="w-3.5 h-3.5" />
          <span>Vercel KV Cloud</span>
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-1 items-start">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-950/50 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-widest rounded-full">
          <Database className="w-3.5 h-3.5" />
          <span>Local JSON DB</span>
        </div>
        {process.env.NODE_ENV === 'production' && (
          <div className="flex items-center gap-1 text-[8px] text-red-400 font-semibold uppercase tracking-wider">
            <AlertTriangle className="w-2.5 h-2.5 shrink-0" />
            <span>Ephemeral Mode</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header className="lg:hidden flex items-center justify-between px-6 py-4 bg-rustic-950 border-b border-rustic-900 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <ChefHat className="w-6 h-6 text-embers-500" />
          <span className="font-serif text-lg font-bold text-white tracking-wide">The Rustic Spoon</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-rustic-400 hover:text-white transition-colors"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Overlay for Mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-45 w-64 bg-rustic-950 border-r border-rustic-900 flex flex-col justify-between p-6 transform lg:translate-x-0 transition-transform duration-300 ease-in-out lg:static lg:h-screen lg:shrink-0
          ${mobileOpen ? 'translate-x-0 pt-20 lg:pt-6' : '-translate-x-full'}`}
      >
        <div className="space-y-8">
          {/* Logo Heading (Desktop only) */}
          <div className="hidden lg:flex items-center gap-3 border-b border-rustic-900 pb-6">
            <div className="w-10 h-10 bg-embers-950 border border-embers-600/30 rounded-full flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-embers-500" />
            </div>
            <div>
              <span className="block font-serif text-base font-bold text-white tracking-wide">
                The Rustic Spoon
              </span>
              <span className="block text-[10px] text-rustic-500 font-semibold uppercase tracking-widest">
                Owner Dashboard
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider transition-all duration-200
                    ${active
                      ? 'bg-embers-600/90 text-white shadow-md shadow-embers-950/40'
                      : 'text-rustic-400 hover:bg-rustic-900 hover:text-white'}`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-rustic-500 group-hover:text-white'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-6 pt-6 border-t border-rustic-900">
          {/* Database connection badge */}
          <div>
            <div className="text-[9px] text-rustic-600 uppercase font-semibold tracking-widest mb-1.5">
              DB Connection
            </div>
            {statusBadge()}
          </div>

          <div className="space-y-1">
            {/* View website link */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3.5 px-4 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider text-rustic-400 hover:bg-rustic-900 hover:text-white transition-all"
            >
              <ExternalLink className="w-4 h-4 text-rustic-500" />
              Visit Website
            </a>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="w-full flex items-center gap-3.5 px-4 py-3 rounded-sm text-xs font-semibold uppercase tracking-wider text-red-400 hover:bg-red-950/30 hover:text-red-300 transition-all text-left"
            >
              <LogOut className="w-4 h-4 text-red-500" />
              {loggingOut ? 'Signing Out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
