'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

export default function ReservationWidget() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: '',
    seating: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const handleNext = () => setStep(step + 1);
  const handlePrev = () => setStep(step - 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStep1Valid = formData.date && formData.time && formData.guests;
  const isStep2Valid = formData.seating;
  const isStep3Valid = formData.name && formData.email && formData.phone;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 1. Submit to our local DB API
      const dbResponse = await fetch("/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!dbResponse.ok) {
        throw new Error("Failed to save reservation to database");
      }

      // 2. Submit to Formspree (only if a valid ID is provided)
      const formspreeId = "YOUR_FORMSPREE_ID";
      if (formspreeId && formspreeId !== "YOUR_FORMSPREE_ID") {
        await fetch(`https://formspree.io/f/${formspreeId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            _subject: `New Reservation Request: ${formData.name} - ${formData.date}`
          })
        });
      }
      
      setStep(4);
    } catch (error) {
      console.error("Reservation error:", error);
      alert("There was an issue submitting your reservation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-sm shadow-2xl overflow-hidden border border-rustic-200 my-16">
      <div className="flex flex-col md:flex-row">
        {/* Left Side: Summary / Status */}
        <div className="w-full md:w-1/3 bg-rustic-900 text-white p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-embers-600/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="relative z-10">
            <h2 className="font-serif text-3xl font-bold mb-8">Book a Table</h2>
            <div className="space-y-6">
              <div className={`flex items-center transition-opacity ${step >= 1 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-sm ${step === 1 ? 'bg-embers-600 text-white' : 'bg-rustic-800 text-rustic-400'}`}>1</div>
                <span className="font-semibold tracking-wide uppercase text-xs">Date & Time</span>
              </div>
              <div className={`flex items-center transition-opacity ${step >= 2 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-sm ${step === 2 ? 'bg-embers-600 text-white' : 'bg-rustic-800 text-rustic-400'}`}>2</div>
                <span className="font-semibold tracking-wide uppercase text-xs">Seating Type</span>
              </div>
              <div className={`flex items-center transition-opacity ${step >= 3 ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 font-bold text-sm ${step === 3 ? 'bg-embers-600 text-white' : 'bg-rustic-800 text-rustic-400'}`}>3</div>
                <span className="font-semibold tracking-wide uppercase text-xs">Guest Details</span>
              </div>
            </div>
          </div>
          
          <div className="mt-12 relative z-10">
            {formData.date && <p className="text-sm text-rustic-300 mb-2">Selected: {formData.date}</p>}
            {formData.time && <p className="text-sm text-rustic-300 mb-2">At: {formData.time}</p>}
            {formData.guests && <p className="text-sm text-rustic-300">For: {formData.guests}</p>}
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="w-full md:w-2/3 p-8 md:p-12 relative min-h-[500px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="h-full flex flex-col justify-center">
                <h3 className="font-serif text-2xl font-bold text-rustic-900 mb-6">When will you be joining us?</h3>
                <div className="space-y-6">
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 w-5 h-5 text-rustic-400" />
                    <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-all text-rustic-900" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <Clock className="absolute left-4 top-4 w-5 h-5 text-rustic-400" />
                      <select name="time" value={formData.time} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-all text-rustic-900 appearance-none">
                        <option value="">Select Time</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                        <option>7:00 PM</option>
                        <option>8:00 PM</option>
                      </select>
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-4 w-5 h-5 text-rustic-400" />
                      <select name="guests" value={formData.guests} onChange={handleChange} className="w-full pl-12 pr-4 py-4 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-all text-rustic-900 appearance-none">
                        <option value="">Party Size</option>
                        <option>2 Guests</option>
                        <option>3 Guests</option>
                        <option>4 Guests</option>
                        <option>5+ Guests</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-12 text-right">
                  <button disabled={!isStep1Valid} onClick={handleNext} className="inline-flex items-center px-8 py-3 bg-embers-600 text-white font-bold rounded-sm hover:bg-embers-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="h-full flex flex-col justify-center">
                <h3 className="font-serif text-2xl font-bold text-rustic-900 mb-6">Choose your experience</h3>
                <div className="grid gap-4">
                  {[
                    { id: 'standard', title: 'Standard Dining', desc: 'Our main dining room with elegant ambiance.' },
                    { id: 'outdoor', title: 'Patio Seating', desc: 'Al fresco dining under the stars.' },
                    { id: 'chef', title: "Chef's Counter", desc: 'Front row seats to the culinary action. Tasting menu only.' }
                  ].map((option) => (
                    <label key={option.id} className={`flex items-start p-4 border-2 rounded-sm cursor-pointer transition-all ${formData.seating === option.title ? 'border-embers-600 bg-embers-50' : 'border-rustic-200 hover:border-embers-300'}`}>
                      <input type="radio" name="seating" value={option.title} checked={formData.seating === option.title} onChange={handleChange} className="mt-1 mr-4 text-embers-600 focus:ring-embers-600" />
                      <div>
                        <h4 className="font-bold text-rustic-900">{option.title}</h4>
                        <p className="text-sm text-rustic-600">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="mt-12 flex justify-between">
                  <button onClick={handlePrev} className="inline-flex items-center px-6 py-3 text-rustic-600 hover:text-rustic-900 font-bold transition-colors">
                    <ArrowLeft className="mr-2 w-5 h-5" /> Back
                  </button>
                  <button disabled={!isStep2Valid} onClick={handleNext} className="inline-flex items-center px-8 py-3 bg-embers-600 text-white font-bold rounded-sm hover:bg-embers-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                    Continue <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="h-full flex flex-col justify-center">
                <h3 className="font-serif text-2xl font-bold text-rustic-900 mb-6">Final Details</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-4 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-all text-rustic-900" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className="w-full px-4 py-4 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-all text-rustic-900" />
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="w-full px-4 py-4 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-all text-rustic-900" />
                  </div>
                  <textarea name="notes" placeholder="Special requests, dietary restrictions, etc." rows={3} value={formData.notes} onChange={handleChange} className="w-full px-4 py-4 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 focus:ring-1 focus:ring-embers-600 transition-all text-rustic-900"></textarea>
                  
                  <div className="mt-8 flex justify-between items-center">
                    <button type="button" onClick={handlePrev} disabled={isSubmitting} className="inline-flex items-center px-6 py-3 text-rustic-600 hover:text-rustic-900 font-bold transition-colors disabled:opacity-50">
                      <ArrowLeft className="mr-2 w-5 h-5" /> Back
                    </button>
                    <button type="submit" disabled={!isStep3Valid || isSubmitting} className="inline-flex items-center px-8 py-4 bg-rustic-900 text-white font-bold rounded-sm hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                      {isSubmitting ? 'Processing...' : 'Confirm Reservation'} <CheckCircle className={`ml-2 w-5 h-5 text-embers-500 ${isSubmitting ? 'hidden' : 'block'}`} />
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className="h-full flex flex-col justify-center items-center text-center">
                <div className="w-20 h-20 bg-embers-100 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-embers-600" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-rustic-900 mb-4">Reservation Confirmed</h3>
                <p className="text-rustic-600 text-lg mb-8">
                  We look forward to hosting you, {formData.name.split(' ')[0]}.<br/>
                  A confirmation has been sent to {formData.email}.
                </p>
                <button onClick={() => { setStep(1); setFormData({date: '', time: '', guests: '', seating: '', name: '', email: '', phone: '', notes: ''}); }} className="px-6 py-3 border-2 border-rustic-900 text-rustic-900 font-bold hover:bg-rustic-900 hover:text-white transition-colors rounded-sm">
                  Book Another Table
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
