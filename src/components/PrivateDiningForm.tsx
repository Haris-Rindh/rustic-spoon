'use client';

import React, { useState } from 'react';

export default function PrivateDiningForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate sending — replace body with Formspree fetch if needed
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-embers-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-embers-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl font-bold text-rustic-900 mb-3">Inquiry Received</h3>
        <p className="text-rustic-600 max-w-md mx-auto">Thank you! Our private dining coordinator will contact you within 24 hours to discuss your event.</p>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">First Name</label>
          <input type="text" name="firstName" required className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">Last Name</label>
          <input type="text" name="lastName" required className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">Email Address</label>
          <input type="email" name="email" required className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">Phone Number</label>
          <input type="tel" name="phone" required className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">Event Date</label>
          <input type="date" name="date" required className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
        </div>
        <div>
          <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">Guest Count</label>
          <select name="guests" required className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors appearance-none">
            <option value="">Select party size</option>
            <option>Up to 10 guests</option>
            <option>11–20 guests</option>
            <option>21–30 guests</option>
            <option>31–40 guests</option>
            <option>40+ (full room buyout)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">Event Type</label>
        <select name="eventType" required className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors appearance-none">
          <option value="">Select event type</option>
          <option>Rehearsal Dinner</option>
          <option>Corporate Dinner</option>
          <option>Birthday Celebration</option>
          <option>Anniversary Dinner</option>
          <option>Business Meeting</option>
          <option>Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-rustic-900 mb-2 uppercase tracking-wide">Tell Us About Your Event</label>
        <textarea name="details" rows={4} placeholder="Special requests, dietary requirements, or anything we should know..." className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors resize-none" />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full md:w-auto px-12 py-4 bg-embers-600 text-white font-bold tracking-widest uppercase hover:bg-embers-500 transition-all duration-300 shadow-lg shadow-embers-600/25 text-sm"
        >
          Submit Inquiry
        </button>
      </div>
    </form>
  );
}
