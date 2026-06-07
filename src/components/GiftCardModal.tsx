'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, CheckCircle } from 'lucide-react';

interface GiftCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftCardModal({ isOpen, onClose }: GiftCardModalProps) {
  const [amount, setAmount] = useState<number | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPurchased(true);
  };

  const resetAndClose = () => {
    setIsPurchased(false);
    setAmount(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-rustic-900/80 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-sm shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-rustic-900 text-white p-6 relative">
              <button
                onClick={resetAndClose}
                className="absolute top-4 right-4 text-rustic-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-3">
                <Gift className="w-8 h-8 text-embers-500" />
                <h2 className="font-serif text-2xl font-bold">Digital Gift Card</h2>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {!isPurchased ? (
                <form onSubmit={handlePurchase}>
                  <p className="text-rustic-600 mb-6">Give the gift of an unforgettable dining experience at The Rustic Spoon.</p>
                  
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[50, 100, 250].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setAmount(val)}
                        className={`py-3 border-2 rounded-sm font-bold transition-all ${
                          amount === val
                            ? 'border-embers-600 bg-embers-50 text-embers-600'
                            : 'border-rustic-200 text-rustic-600 hover:border-embers-300'
                        }`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <input
                      type="email"
                      required
                      placeholder="Recipient's Email"
                      className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600"
                    />
                    <textarea
                      placeholder="Personal Message (Optional)"
                      rows={3}
                      className="w-full px-4 py-3 bg-rustic-50 border border-rustic-200 rounded-sm focus:outline-none focus:border-embers-600 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={!amount}
                    className="w-full mt-6 py-4 bg-embers-600 text-white font-bold rounded-sm hover:bg-embers-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {amount ? `Purchase $${amount} Gift Card` : 'Select an Amount'}
                  </button>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-rustic-900 mb-2">Purchase Successful!</h3>
                  <p className="text-rustic-600 mb-8">The digital gift card has been sent to the recipient.</p>
                  <button
                    onClick={resetAndClose}
                    className="px-8 py-3 bg-rustic-900 text-white font-bold rounded-sm hover:bg-black transition-colors"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
