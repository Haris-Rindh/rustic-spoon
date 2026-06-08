'use client';

import React, { useState, useTransition } from 'react';
import { Plus, Edit2, Trash2, X, AlertCircle, Sparkles, Eye } from 'lucide-react';
import Image from 'next/image';
import { addMenuItem, editMenuItem, deleteMenuItem } from '../app/actions';
import { MenuData, MenuItem } from '../lib/db';

interface AdminMenuManagerProps {
  initialMenu: MenuData;
}

type TabType = 'starters' | 'mains' | 'desserts';

export default function AdminMenuManager({ initialMenu }: AdminMenuManagerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('starters');
  const [isPending, startTransition] = useTransition();

  // Search Filter
  const [search, setSearch] = useState('');

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setName('');
    setPrice('');
    setDescription('');
    setImage('');
    setFormError('');
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setPrice(item.price);
    setDescription(item.description);
    setImage(item.image);
    setFormError('');
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description) {
      setFormError('Please fill in all required fields.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await addMenuItem(activeTab, name, price, description, image);
        if (res.success) {
          setIsAddModalOpen(false);
          resetForm();
        }
      } catch (err: any) {
        setFormError(err.message || 'Failed to add item');
      }
    });
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;
    if (!name || !price || !description) {
      setFormError('Please fill in all required fields.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await editMenuItem(activeTab, editingItem.id, name, price, description, image);
        if (res.success) {
          setEditingItem(null);
          resetForm();
        }
      } catch (err: any) {
        setFormError(err.message || 'Failed to update item');
      }
    });
  };

  const handleDelete = async () => {
    if (!deletingId) return;

    startTransition(async () => {
      try {
        const res = await deleteMenuItem(activeTab, deletingId);
        if (res.success) {
          setDeletingId(null);
        }
      } catch (err) {
        console.error(err);
        alert('Failed to delete item');
      }
    });
  };

  const items = initialMenu[activeTab] || [];
  const filteredItems = items.filter(
    (i) =>
      i.name.toLowerCase().includes(search.toLowerCase()) ||
      i.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rustic-900 pb-6">
        <div>
          <span className="text-embers-500 font-semibold tracking-widest text-[10px] uppercase block mb-1">
            Menu Operations
          </span>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
            Manage Culinary Menu
          </h1>
          <p className="text-rustic-400 text-xs mt-1">
            Create, update, and sort daily starters, mains, and desserts.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-embers-600 hover:bg-embers-500 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors shadow-lg shadow-embers-950/20 shrink-0"
        >
          <Plus className="w-4 h-4" /> Add New Dish
        </button>
      </div>

      {/* Controls: Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-rustic-900/30 border border-rustic-850 p-4 rounded-sm shadow-md">
        {/* Category Tabs */}
        <div className="flex gap-2 border-b border-rustic-900 lg:border-none pb-2 lg:pb-0">
          {(['starters', 'mains', 'desserts'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setSearch('');
              }}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-sm cursor-none
                ${
                  activeTab === tab
                    ? 'bg-embers-600 text-white shadow-md shadow-embers-950/40 border border-transparent'
                    : 'text-rustic-400 hover:text-white hover:bg-rustic-900/40 border border-rustic-850'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="w-full md:w-72">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search items..."
            className="w-full px-4 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/25 text-white placeholder-rustic-700 text-xs transition-all"
          />
        </div>
      </div>

      {/* Dishes Grid */}
      {filteredItems.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-rustic-800 text-rustic-500 rounded-sm">
          <p className="text-sm font-semibold">No menu items found in this category.</p>
          <p className="text-xs mt-1">Click "Add New Dish" to insert one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-rustic-900/40 border border-rustic-850 rounded-sm overflow-hidden flex flex-col justify-between hover:border-embers-600/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 group"
            >
              {/* Item Image */}
              <div className="relative h-48 w-full bg-rustic-950 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                <span className="absolute bottom-4 right-4 font-serif text-lg font-bold text-embers-400">
                  {item.price}
                </span>
              </div>

              {/* Item Info */}
              <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-white group-hover:text-embers-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-rustic-400 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="flex gap-2 pt-4 border-t border-rustic-900/30">
                  <button
                    onClick={() => openEditModal(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-rustic-950/80 hover:bg-rustic-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm border border-rustic-850 hover:border-rustic-750 transition-colors cursor-none"
                  >
                    <Edit2 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <a
                    href={`/dish/${item.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center px-3 py-2.5 bg-rustic-950/80 hover:bg-rustic-900 text-rustic-400 hover:text-white rounded-sm border border-rustic-850 hover:border-rustic-750 transition-colors cursor-none"
                    title="Preview dish page"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => setDeletingId(item.id)}
                    className="flex items-center justify-center px-3 py-2.5 bg-red-950/20 hover:bg-red-950/30 text-red-400 hover:text-red-300 rounded-sm border border-red-900/30 hover:border-red-900/50 transition-colors cursor-none"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── MODAL: ADD MENU ITEM ── */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-rustic-900 border border-embers-600/35 rounded-sm overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] animate-zoomIn">
            <div className="flex justify-between items-center px-6 py-4 border-b border-rustic-950 bg-rustic-950/20">
              <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-embers-500" /> Add New {activeTab.slice(0, -1)}
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                    Dish Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Garlic Scallops"
                    className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. $22 or 22"
                    className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                  Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="Paste Unsplash / Pexels image link"
                  className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the dish ingredients, preparation, and textures..."
                  className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-rustic-900/40 justify-end">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 border border-rustic-850 text-rustic-400 hover:text-white hover:bg-rustic-850 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-6 py-2.5 bg-embers-600 hover:bg-embers-500 disabled:opacity-55 text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-colors cursor-none"
                >
                  {isPending ? 'Saving...' : 'Add Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── MODAL: EDIT MENU ITEM ── */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-rustic-900 border border-embers-600/35 rounded-sm overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.85)] animate-zoomIn">
            <div className="flex justify-between items-center px-6 py-4 border-b border-rustic-950 bg-rustic-950/20">
              <h2 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-embers-500" /> Edit {activeTab.slice(0, -1)}
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                    Dish Name *
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
                    Price *
                  </label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                  Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase font-semibold tracking-wider text-rustic-400">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-rustic-900/40 justify-end">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-2.5 border border-rustic-855 text-rustic-400 hover:text-white hover:bg-rustic-850 text-xs font-semibold uppercase tracking-wider rounded-sm transition-all cursor-none"
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
              <h3 className="font-serif text-lg font-bold text-white">Delete Menu Item?</h3>
              <p className="text-xs text-rustic-400 leading-relaxed">
                This action is permanent and cannot be undone. Guests will no longer see this dish in the menus.
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
