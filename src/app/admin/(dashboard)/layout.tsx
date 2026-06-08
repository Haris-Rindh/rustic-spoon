import React from 'react';
import AdminSidebar from '../../../components/AdminSidebar';
import { isUsingKV } from '../../../lib/db';

export const revalidate = 0;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const kvConnected = isUsingKV();

  return (
    <div className="min-h-screen bg-rustic-950 text-white flex flex-col lg:flex-row select-none">
      {/* Background Texture & Gradients */}
      <div className="absolute inset-0 bg-texture opacity-[0.03] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-embers-900/[0.04] rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4 pointer-events-none" />

      {/* Sidebar navigation */}
      <AdminSidebar isUsingKV={kvConnected} />

      {/* Main content pane */}
      <main className="flex-1 bg-rustic-950/60 p-6 md:p-8 lg:p-10 overflow-y-auto max-h-[100vh] relative z-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
