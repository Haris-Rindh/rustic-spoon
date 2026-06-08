'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, User, ChefHat, AlertCircle } from 'lucide-react';
import Image from 'next/image';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/admin';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        router.push(from);
        router.refresh();
      } else {
        setError(data.error || 'Invalid username or password.');
      }
    } catch (err) {
      console.error(err);
      setError('A network error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-950/40 border border-red-500/30 rounded-sm flex items-start gap-3 text-red-200 text-sm animate-shake">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* Username Field */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-rustic-300">
          Username
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rustic-400" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
            placeholder="Enter admin username"
            className="w-full pl-12 pr-4 py-3.5 bg-rustic-950/80 border border-rustic-800 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 text-white placeholder-rustic-600 transition-all text-sm"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold uppercase tracking-widest text-rustic-300">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-rustic-400" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="Enter password"
            className="w-full pl-12 pr-4 py-3.5 bg-rustic-950/80 border border-rustic-800 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 text-white placeholder-rustic-600 transition-all text-sm"
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-embers-600 text-white font-bold uppercase tracking-widest text-xs hover:bg-embers-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-embers-900/40 relative overflow-hidden group rounded-sm"
      >
        <span className="relative z-10">{loading ? 'Verifying Credentials...' : 'Sign In'}</span>
        <div className="absolute inset-0 bg-embers-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left -z-0" />
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-rustic-950 relative flex items-center justify-center p-6 select-none overflow-hidden">
      {/* Background Texture & Overlays */}
      <div className="absolute inset-0 bg-texture opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-embers-900/10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-rustic-900/20 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3" />

      {/* Decorative center shield overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,54,46,0.15),transparent_70%)] pointer-events-none" />

      {/* Login Card */}
      <div className="w-full max-w-md bg-rustic-900/40 backdrop-blur-md border border-rustic-800/80 p-8 md:p-10 shadow-2xl relative z-10 rounded-sm">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-16 h-16 rounded-full bg-embers-950 border border-embers-600/40 items-center justify-center mb-4 shadow-inner">
            <ChefHat className="w-8 h-8 text-embers-500" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
            The Rustic Spoon
          </h1>
          <p className="text-rustic-400 text-xs font-semibold uppercase tracking-widest mt-2">
            Owner Dashboard Login
          </p>
          <div className="w-12 h-px bg-embers-600 mx-auto mt-4" />
        </div>

        {/* Suspense wrapper for useSearchParams hook */}
        <Suspense fallback={<div className="text-center text-rustic-400 py-10">Loading form...</div>}>
          <LoginForm />
        </Suspense>

        {/* Bottom decorative text */}
        <div className="mt-8 text-center text-[10px] text-rustic-600 uppercase tracking-widest">
          Secured Session Control Portal
        </div>
      </div>
    </div>
  );
}
