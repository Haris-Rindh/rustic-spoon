'use client';

import React, { useState, useTransition } from 'react';
import { Plus, Trash2, X, AlertCircle, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { addGalleryImage, deleteGalleryImage } from '../app/actions';

interface AdminGalleryManagerProps {
  initialGallery: string[];
}

export default function AdminGalleryManager({ initialGallery }: AdminGalleryManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [newUrl, setNewUrl] = useState('');
  const [error, setError] = useState('');

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl) return;

    setError('');
    // Basic URL validation
    try {
      new URL(newUrl);
    } catch (_) {
      setError('Please enter a valid absolute URL.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await addGalleryImage(newUrl);
        if (res.success) {
          setNewUrl('');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to add image');
      }
    });
  };

  const handleDelete = async (url: string) => {
    if (confirm('Are you sure you want to remove this photo from the gallery?')) {
      startTransition(async () => {
        try {
          await deleteGalleryImage(url);
        } catch (err) {
          console.error(err);
          alert('Failed to delete image');
        }
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rustic-900 pb-6">
        <div>
          <span className="text-embers-500 font-semibold tracking-widest text-[10px] uppercase block mb-1">
            Media Library
          </span>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
            Manage Gallery Photos
          </h1>
          <p className="text-rustic-400 text-xs mt-1">
            Upload and delete high-quality images visible in the website gallery.
          </p>
        </div>
      </div>

      {/* Add Image Form */}
      <div className="bg-rustic-900/40 border border-rustic-850 p-6 rounded-sm shadow-md space-y-4 max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
          Add Photo to Collection
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Paste public image URL (e.g. from Unsplash or Pexels)"
            className="flex-1 px-4 py-3 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
            disabled={isPending}
          />
          <button
            type="submit"
            disabled={isPending || !newUrl}
            className="px-6 py-3 bg-embers-600 hover:bg-embers-500 disabled:opacity-50 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors flex items-center justify-center gap-2 cursor-none"
          >
            <Plus className="w-4 h-4" /> Add Photo
          </button>
        </form>
        {error && (
          <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-200 text-xs rounded-sm flex gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}
        <p className="text-[10px] text-rustic-500 leading-relaxed">
          Tip: paste a link from Unsplash or Pexels (like https://images.unsplash.com/photo-...).
          Make sure the domains are configured in your next.config.ts if you get billing or rendering warnings.
        </p>
      </div>

      {/* Gallery Photo Grid */}
      {initialGallery.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-rustic-800 text-rustic-500 rounded-sm">
          <p className="text-sm font-semibold">No photos in the gallery.</p>
          <p className="text-xs mt-1">Paste a URL above to populate the gallery.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {initialGallery.map((src, index) => (
            <div
              key={index}
              className="group relative bg-rustic-950 rounded-sm overflow-hidden border border-rustic-850 aspect-[4/3] shadow-md hover:border-embers-600/45 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300"
            >
              {/* Photo Preview */}
              <Image
                src={src}
                alt={`Gallery photo ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Scrim */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/55 transition-all duration-300" />

              {/* Action buttons (always overlay top-right on hover) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() => handleDelete(src)}
                  className="w-10 h-10 bg-red-650 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-transform duration-350 scale-90 group-hover:scale-100 shadow-lg cursor-none"
                  title="Remove Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Index indicator */}
              <span className="absolute top-3 left-3 px-2 py-0.5 bg-black/60 border border-rustic-850/40 text-[9px] text-rustic-300 font-mono rounded-sm">
                #{index + 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
