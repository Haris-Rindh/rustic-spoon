'use client';

import React, { useState, useTransition } from 'react';
import { Plus, Edit2, Trash2, X, Star, AlertCircle, MessageSquare } from 'lucide-react';
import { addTestimonial, editTestimonial, deleteTestimonial } from '../app/actions';
import { TestimonialItem } from '../lib/db';

interface AdminTestimonialsManagerProps {
  initialTestimonials: TestimonialItem[];
}

export default function AdminTestimonialsManager({
  initialTestimonials,
}: AdminTestimonialsManagerProps) {
  const [isPending, startTransition] = useTransition();

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TestimonialItem | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setName('');
    setRating(5);
    setText('');
    setFormError('');
  };

  const openEditModal = (item: TestimonialItem) => {
    setEditingItem(item);
    setName(item.authorName);
    setRating(item.rating);
    setText(item.text);
    setFormError('');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) {
      setFormError('Please fill in all fields.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await addTestimonial(rating, text, name);
        if (res.success) {
          setIsAddModalOpen(false);
          resetForm();
        }
      } catch (err: any) {
        setFormError(err.message || 'Failed to add review');
      }
    });
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!name || !text) {
      setFormError('Please fill in all fields.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await editTestimonial(editingItem.id, rating, text, name);
        if (res.success) {
          setEditingItem(null);
          resetForm();
        }
      } catch (err: any) {
        setFormError(err.message || 'Failed to update review');
      }
    });
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    startTransition(async () => {
      try {
        const res = await deleteTestimonial(deletingId);
        if (res.success) {
          setDeletingId(null);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete review');
      }
    });
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rustic-900 pb-6">
        <div>
          <span className="text-embers-500 font-semibold tracking-widest text-[10px] uppercase block mb-1">
            Guest Feedback
          </span>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
            Manage Testimonials
          </h1>
          <p className="text-rustic-400 text-xs mt-1">
            Edit or delete verified guest feedback displayed on the homepage slider.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-embers-600 hover:bg-embers-500 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors shadow-lg shadow-embers-950/20 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      {/* Testimonials Grid */}
      {initialTestimonials.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-rustic-900 text-rustic-500 rounded-sm">
          <p className="text-sm font-semibold">No reviews registered.</p>
          <p className="text-xs mt-1">Click "Add Testimonial" to enter guest feedback.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initialTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-rustic-900/40 border border-rustic-850 p-6 rounded-sm flex flex-col justify-between gap-6 hover:border-embers-600/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 relative group"
            >
              {/* Star Rating & Content */}
              <div className="space-y-4">
                <div className="flex gap-1 text-embers-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating) ? 'fill-embers-500' : 'fill-transparent'
                      }`}
                    />
                  ))}
                  {item.rating % 1 !== 0 && (
                    <span className="text-[10px] text-rustic-500 font-bold ml-1">
                      {item.rating}
                    </span>
                  )}
                </div>
                <blockquote className="text-xs text-rustic-300 italic leading-relaxed">
                  "{item.text}"
                </blockquote>
              </div>

              {/* Author badge + actions */}
              <div className="flex items-center justify-between border-t border-rustic-900/30 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-embers-600 to-embers-700 border border-transparent rounded-full flex items-center justify-center font-serif text-sm font-bold text-white shadow-md shadow-embers-950/45">
                    {item.authorInitials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white leading-none">{item.authorName}</h4>
                    <span className="text-[9px] text-rustic-500 uppercase tracking-widest font-semibold mt-1.5 block">
                      Verified Diner
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(item)}
                    className="p-2 bg-rustic-950/80 hover:bg-rustic-900 text-rustic-400 hover:text-white rounded-sm border border-rustic-850 hover:border-rustic-750 transition-colors cursor-none"
                    title="Edit Review"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(item.id)}
                    className="p-2 bg-red-950/20 hover:bg-red-950/30 text-red-400 hover:text-red-300 rounded-sm border border-red-900/30 hover:border-red-900/50 transition-colors cursor-none"
                    title="Delete Review"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL: ADD TESTIMONIAL ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-rustic-900 border border-embers-600/35 rounded-sm overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] animate-zoomIn">
            <div className="flex justify-between items-center px-6 py-4 border-b border-rustic-955 bg-rustic-950/20">
              <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-embers-500" /> Add Testimonial
              </h2>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-rustic-400 hover:text-white transition-colors cursor-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAdd} className="p-6 space-y-4">
              {formError && (
                <div className="p-3.5 bg-red-950/40 border border-red-500/20 rounded-sm text-red-200 text-xs flex gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                    Rating *
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all cursor-none"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4.5}>4.5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                  Review Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Paste the guest's feedback comments here..."
                  className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-rustic-900/40 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-rustic-855 text-rustic-400 hover:text-white hover:bg-rustic-850 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 bg-embers-600 hover:bg-embers-500 disabled:opacity-55 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors cursor-none"
                >
                  {isPending ? 'Saving...' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT TESTIMONIAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-rustic-900 border border-embers-600/35 rounded-sm overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] animate-zoomIn">
            <div className="flex justify-between items-center px-6 py-4 border-b border-rustic-955 bg-rustic-950/20">
              <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-embers-500" /> Edit Testimonial
              </h2>
              <button
                onClick={() => setEditingItem(null)}
                className="text-rustic-400 hover:text-white transition-colors cursor-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEdit} className="p-6 space-y-4">
              {formError && (
                <div className="p-3.5 bg-red-950/40 border border-red-500/20 rounded-sm text-red-200 text-xs flex gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 items-end">
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                    Rating *
                  </label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all cursor-none"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4.5}>4.5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                  Review Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-rustic-900/40 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 border border-rustic-850 text-rustic-400 hover:text-white hover:bg-rustic-850 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 bg-embers-600 hover:bg-embers-500 disabled:opacity-55 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors cursor-none"
                >
                  {isPending ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: DELETE CONFIRMATION ── */}
      {deletingId !== null && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-rustic-900 border border-rustic-800 p-6 rounded-sm space-y-6 shadow-2xl animate-zoomIn">
            <div className="text-center space-y-3">
              <div className="inline-flex w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 items-center justify-center text-red-500">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-white">Delete Testimonial?</h3>
              <p className="text-xs text-rustic-400 leading-relaxed">
                This action is permanent and cannot be undone. Guests will no longer see this testimonial on the homepage slider.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="flex-1 py-2.5 border border-rustic-800 text-rustic-400 hover:text-white hover:bg-rustic-850 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all"
              >
                No, Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 py-2.5 bg-red-650 hover:bg-red-500 text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-all"
              >
                {isPending ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
