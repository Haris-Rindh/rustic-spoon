'use client';

import React, { useState, useTransition } from 'react';
import { Save, AlertCircle, CheckCircle, Settings, Globe, Phone, Mail, Clock, MapPin } from 'lucide-react';
import { updateSettings } from '../app/actions';
import { SiteSettings } from '../lib/db';

interface AdminSettingsManagerProps {
  initialSettings: SiteSettings;
}

export default function AdminSettingsManager({ initialSettings }: AdminSettingsManagerProps) {
  const [isPending, startTransition] = useTransition();

  // Form states
  const [restaurantName, setRestaurantName] = useState(initialSettings.restaurantName);
  const [phone, setPhone] = useState(initialSettings.phone);
  const [email, setEmail] = useState(initialSettings.email);
  const [address, setAddress] = useState(initialSettings.address);
  const [hours, setHours] = useState(initialSettings.hours);
  const [instagramUrl, setInstagramUrl] = useState(initialSettings.instagramUrl);
  const [facebookUrl, setFacebookUrl] = useState(initialSettings.facebookUrl);
  const [tripAdvisorUrl, setTripAdvisorUrl] = useState(initialSettings.tripAdvisorUrl);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!restaurantName || !phone || !email || !address || !hours) {
      setError('Please fill in all core operational fields.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await updateSettings({
          restaurantName,
          phone,
          email,
          address,
          hours,
          instagramUrl,
          facebookUrl,
          tripAdvisorUrl,
        });

        if (res.success) {
          setSuccess(true);
          // Hide success alert after 3 seconds
          setTimeout(() => setSuccess(false), 3000);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to update settings');
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rustic-900 pb-6">
        <div>
          <span className="text-embers-500 font-semibold tracking-widest text-[10px] uppercase block mb-1">
            Configurations
          </span>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
            Site Settings
          </h1>
          <p className="text-rustic-400 text-xs mt-1">
            Configure contact info, social accounts, and operational parameters.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
        {/* Status Alerts */}
        {error && (
          <div className="p-4 bg-red-950/40 border border-red-500/20 text-red-200 text-xs rounded-sm flex gap-2">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="p-4 bg-green-950/40 border border-green-500/20 text-green-200 text-xs rounded-sm flex gap-2 animate-fadeIn">
            <CheckCircle className="w-5 h-5 shrink-0 text-green-400" />
            <span>Site configurations updated successfully! All paths re-cached.</span>
          </div>
        )}

        {/* Section 1: Core Details */}
        <div className="bg-rustic-900/40 border border-rustic-850 p-8 shadow-lg rounded-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-rustic-850 pb-3">
            <Settings className="w-5 h-5 text-embers-500" /> Core Restaurant Operations
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Restaurant Name */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                Restaurant Name
              </label>
              <input
                type="text"
                required
                value={restaurantName}
                onChange={(e) => setRestaurantName(e.target.value)}
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>

            {/* Operating Hours */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-embers-500" /> Operating Hours
                </div>
              </label>
              <input
                type="text"
                required
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>

            {/* Contact Phone */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                <div className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-embers-500" /> Phone Number
                </div>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>

            {/* Contact Email */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                <div className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-embers-500" /> Email Address
                </div>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>

            {/* Physical Address */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-embers-500" /> Restaurant Address
                </div>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Links */}
        <div className="bg-rustic-900/40 border border-rustic-850 p-8 shadow-lg rounded-sm space-y-6">
          <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2 border-b border-rustic-850 pb-3">
            <Globe className="w-5 h-5 text-embers-500" /> Social Media Profiles
          </h2>

          <div className="space-y-4">
            {/* Instagram */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                Instagram URL
              </label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>

            {/* Facebook */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                Facebook URL
              </label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/..."
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>

            {/* TripAdvisor */}
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                TripAdvisor URL
              </label>
              <input
                type="url"
                value={tripAdvisorUrl}
                onChange={(e) => setTripAdvisorUrl(e.target.value)}
                placeholder="https://tripadvisor.com/..."
                className="w-full px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-right">
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-8 py-4 bg-embers-600 hover:bg-embers-500 disabled:opacity-55 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-lg shadow-embers-950/20 hover:scale-[1.02] active:scale-[0.98] cursor-none"
          >
            <Save className="w-4 h-4" /> {isPending ? 'Saving Settings...' : 'Save Configuration'}
          </button>
        </div>
      </form>
    </div>
  );
}
