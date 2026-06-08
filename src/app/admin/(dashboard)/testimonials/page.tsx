import React from 'react';
import { getDbData } from '../../../../lib/db';
import AdminTestimonialsManager from '../../../../components/AdminTestimonialsManager';

export const revalidate = 0;

export default async function AdminTestimonialsPage() {
  const db = await getDbData();
  return <AdminTestimonialsManager initialTestimonials={db.testimonials} />;
}
