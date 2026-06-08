import React from 'react';
import { getDbData } from '../../../../lib/db';
import AdminGalleryManager from '../../../../components/AdminGalleryManager';

export const revalidate = 0;

export default async function AdminGalleryPage() {
  const db = await getDbData();
  return <AdminGalleryManager initialGallery={db.gallery} />;
}
