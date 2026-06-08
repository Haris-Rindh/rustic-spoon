'use client';

import React, { useState, useTransition } from 'react';
import {
  CalendarDays,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  AlertCircle,
  ChevronDown,
  User,
  Mail,
  Phone,
  MessageSquare
} from 'lucide-react';
import { updateReservationStatus, deleteReservation } from '../app/actions';
import { ReservationItem } from '../lib/db';

interface AdminReservationsManagerProps {
  initialReservations: ReservationItem[];
}

type FilterType = 'All' | 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';

export default function AdminReservationsManager({
  initialReservations,
}: AdminReservationsManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [statusFilter, setStatusFilter] = useState<FilterType>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleStatusChange = async (
    id: string,
    status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
  ) => {
    startTransition(async () => {
      try {
        await updateReservationStatus(id, status);
      } catch (err) {
        console.error(err);
        alert('Failed to update reservation status');
      }
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to permanently delete this reservation record?')) {
      startTransition(async () => {
        try {
          await deleteReservation(id);
        } catch (err) {
          console.error(err);
          alert('Failed to delete reservation');
        }
      });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filtering
  const filtered = initialReservations.filter((res) => {
    const matchesStatus = statusFilter === 'All' || res.status === statusFilter;
    const matchesSearch =
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.phone.includes(searchQuery) ||
      (res.notes && res.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-rustic-900 pb-6">
        <div>
          <span className="text-embers-500 font-semibold tracking-widest text-[10px] uppercase block mb-1">
            Guest Bookings
          </span>
          <h1 className="font-serif text-3xl font-bold text-white tracking-wide">
            Manage Reservations
          </h1>
          <p className="text-rustic-400 text-xs mt-1">
            Approve, fulfill, cancel, or delete table reservations made by customers.
          </p>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-rustic-900/30 border border-rustic-850 p-4 rounded-sm shadow-md">
        {/* Status Filters */}
        <div className="flex flex-wrap gap-1.5">
          {(['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'] as FilterType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4.5 py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-sm transition-all border duration-300 cursor-none
                ${
                  statusFilter === tab
                    ? 'bg-embers-600 text-white border-transparent shadow-md shadow-embers-950/30'
                    : 'text-rustic-400 border-rustic-850 hover:bg-rustic-900/40 hover:text-white'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search bar */}
        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-rustic-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 bg-rustic-950/90 border border-rustic-850 rounded-sm text-white placeholder-rustic-700 focus:outline-none focus:border-embers-500 focus:ring-1 focus:ring-embers-500/20 text-xs transition-all"
          />
        </div>
      </div>

      {/* Reservations Table/List */}
      {filtered.length === 0 ? (
        <div className="py-20 text-center border border-dashed border-rustic-800 text-rustic-500 rounded-sm">
          <p className="text-sm font-semibold">No reservations found.</p>
          <p className="text-xs mt-1">
            {searchQuery ? 'Adjust your search queries.' : 'Tables booked on the website show up here.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((res) => {
            const isExpanded = expandedId === res.id;
            return (
              <div
                key={res.id}
                className={`bg-rustic-900/40 border rounded-sm transition-all duration-300 overflow-hidden
                  ${
                    isExpanded
                      ? 'border-embers-600/40 shadow-2xl shadow-black/50'
                      : 'border-rustic-850 hover:border-rustic-750'
                  }`}
              >
                {/* Collapsed Bar Summary */}
                <div
                  onClick={() => toggleExpand(res.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-start md:items-center gap-4">
                    {/* Status Dot */}
                    <span
                      className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 md:mt-0
                        ${
                          res.status === 'Pending'
                            ? 'bg-amber-500 animate-pulse'
                            : res.status === 'Confirmed'
                            ? 'bg-green-400'
                            : res.status === 'Completed'
                            ? 'bg-blue-400'
                            : 'bg-red-500'
                        }`}
                    />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                        {res.name}
                        <span className="text-[10px] text-rustic-500 font-mono font-medium lowercase">
                          ({res.id})
                        </span>
                      </h3>
                      <p className="text-xs text-rustic-400 mt-0.5">
                        {res.date} at <strong className="text-white">{res.time}</strong> | {res.guests} |{' '}
                        {res.seating}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border
                        ${
                          res.status === 'Pending'
                            ? 'bg-amber-955/40 border-amber-500/20 text-amber-400'
                            : res.status === 'Confirmed'
                            ? 'bg-green-955/40 border-green-500/20 text-green-400'
                            : res.status === 'Completed'
                            ? 'bg-blue-955/40 border-blue-500/20 text-blue-400'
                            : 'bg-red-955/40 border-red-500/20 text-red-400'
                        }`}
                    >
                      {res.status}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-rustic-500 transition-transform duration-350
                        ${isExpanded ? 'transform rotate-180 text-white' : ''}`}
                    />
                  </div>
                </div>

                {/* Expanded Details Pane */}
                {isExpanded && (
                  <div className="border-t border-rustic-950 bg-rustic-950/70 p-6 space-y-6 animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left: Contact Info */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-rustic-500">
                          Guest Details
                        </h4>
                        <div className="space-y-2.5 text-xs text-rustic-300">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-embers-600 shrink-0" />
                            <span>Name: {res.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-embers-600 shrink-0" />
                            <a href={`mailto:${res.email}`} className="hover:text-embers-400 cursor-none">
                              {res.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-embers-600 shrink-0" />
                            <a href={`tel:${res.phone}`} className="hover:text-embers-400 cursor-none">
                              {res.phone}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right: Notes & Logs */}
                      <div className="space-y-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-rustic-500">
                          Dietary & Notes
                        </h4>
                        <div className="flex gap-2.5 p-3.5 bg-rustic-950 border border-rustic-850 rounded-sm text-xs text-rustic-400 italic leading-relaxed min-h-[70px]">
                          <MessageSquare className="w-4 h-4 text-embers-600 shrink-0 mt-0.5" />
                          <span>{res.notes || 'No special requests or notes.'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-rustic-900/30">
                      <div className="flex flex-wrap gap-2">
                        {res.status !== 'Confirmed' && res.status !== 'Completed' && (
                          <button
                            onClick={() => handleStatusChange(res.id, 'Confirmed')}
                            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-green-650 hover:bg-green-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors cursor-none"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Confirm Book
                          </button>
                        )}
                        {res.status === 'Confirmed' && (
                          <button
                            onClick={() => handleStatusChange(res.id, 'Completed')}
                            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-blue-650 hover:bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm transition-colors cursor-none"
                          >
                            <CheckCircle className="w-3.5 h-3.5" /> Mark Completed
                          </button>
                        )}
                        {res.status !== 'Cancelled' && res.status !== 'Completed' && (
                          <button
                            onClick={() => handleStatusChange(res.id, 'Cancelled')}
                            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-rustic-950/80 hover:bg-rustic-900 text-red-400 hover:text-red-300 border border-rustic-850 hover:border-rustic-750 rounded-sm transition-colors cursor-none"
                          >
                            <XCircle className="w-3.5 h-3.5" /> Cancel Request
                          </button>
                        )}
                        {res.status === 'Cancelled' && (
                          <button
                            onClick={() => handleStatusChange(res.id, 'Pending')}
                            className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-rustic-950/80 hover:bg-rustic-900 text-amber-400 hover:text-amber-300 border border-rustic-850 hover:border-rustic-750 rounded-sm transition-colors cursor-none"
                          >
                            <Clock className="w-3.5 h-3.5" /> Re-open (Pending)
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => handleDelete(res.id)}
                        className="inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-red-955/20 hover:bg-red-955/35 text-red-400 hover:text-red-300 border border-red-900/30 hover:border-red-900/50 rounded-sm transition-colors self-end sm:self-auto cursor-none"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete Entry
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
