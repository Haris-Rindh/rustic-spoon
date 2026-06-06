'use client';

import React, { useState } from 'react';
import { Phone, Mail, Calendar, Clock, Users } from 'lucide-react';

export default function ReservationForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    
    const form = e.currentTarget;
    const data = new FormData(form);
    
    try {
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="reserve" className="py-24 md:py-32 bg-rustic-900 text-rustic-50 relative">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[calc(100%+1.3px)] h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-5 gap-10 bg-rustic-800 shadow-2xl rounded-sm border border-rustic-700 overflow-hidden fade-in-section is-visible">
          
          <div className="lg:col-span-2 bg-rustic-800 p-8 md:p-10 border-r border-rustic-700 flex flex-col justify-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-white">Book a Table</h2>
            <p className="text-rustic-300 mb-8 leading-relaxed">Join us for an unforgettable evening. Reservations are highly recommended for weekend dining.</p>
            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-embers-500 mr-4 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm uppercase">Phone</h4>
                  <p className="text-rustic-400">(555) 987-6543</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-embers-500 mr-4 mt-1" />
                <div>
                  <h4 className="font-bold text-white text-sm uppercase">Email</h4>
                  <p className="text-rustic-400">reservations@rusticspoon.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 p-8 md:p-12 bg-rustic-800/50">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-embers-600 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white text-3xl">✓</span>
                </div>
                <h3 className="text-2xl font-serif text-white font-bold">Request Received</h3>
                <p className="text-rustic-300">Thank you for your reservation request. We will contact you shortly to confirm your booking.</p>
                <button onClick={() => setStatus('idle')} className="mt-8 px-6 py-2 border border-embers-600 text-embers-500 hover:bg-embers-600 hover:text-white transition-colors rounded-sm">
                  Book Another Table
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-widest text-rustic-400 mb-2 font-bold">Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-5 h-5 text-rustic-500 pointer-events-none" />
                      <input type="date" name="date" required className="w-full bg-rustic-900 border border-rustic-600 rounded-sm py-3 pl-10 pr-4 text-white focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-widest text-rustic-400 mb-2 font-bold">Time</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-rustic-500 pointer-events-none" />
                      <select name="time" required className="w-full bg-rustic-900 border border-rustic-600 rounded-sm py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors cursor-pointer">
                        <option value="">Select Time</option>
                        <option>5:00 PM</option>
                        <option>5:30 PM</option>
                        <option>6:00 PM</option>
                        <option>6:30 PM</option>
                        <option>7:00 PM</option>
                        <option>7:30 PM</option>
                        <option>8:00 PM</option>
                        <option>8:30 PM</option>
                        <option>9:00 PM</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-widest text-rustic-400 mb-2 font-bold">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 w-5 h-5 text-rustic-500 pointer-events-none" />
                      <select name="guests" required className="w-full bg-rustic-900 border border-rustic-600 rounded-sm py-3 pl-10 pr-4 text-white appearance-none focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors cursor-pointer">
                        <option value="">Select Guests</option>
                        <option>2 People</option>
                        <option>3 People</option>
                        <option>4 People</option>
                        <option>5 People</option>
                        <option>6+ People</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-xs uppercase tracking-widest text-rustic-400 mb-2 font-bold">Phone</label>
                    <input type="tel" name="phone" placeholder="(555) 000-0000" required className="w-full bg-rustic-900 border border-rustic-600 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-rustic-400 mb-2 font-bold">Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" required className="w-full bg-rustic-900 border border-rustic-600 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors" />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs uppercase tracking-widest text-rustic-400 mb-2 font-bold">Special Requests (Optional)</label>
                  <textarea name="requests" rows={2} placeholder="Allergies, anniversary, etc..." className="w-full bg-rustic-900 border border-rustic-600 rounded-sm py-3 px-4 text-white focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-colors"></textarea>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm">There was an error submitting your request. Please try again.</p>
                )}

                <button type="submit" disabled={status === 'submitting'} className="w-full bg-embers-600 hover:bg-embers-700 disabled:bg-embers-600/50 text-white font-serif font-bold py-4 rounded-sm shadow-lg transition-all transform active:scale-[0.98] text-lg mt-2">
                  {status === 'submitting' ? 'Submitting...' : 'Confirm Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
