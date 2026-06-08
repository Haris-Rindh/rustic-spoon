import React from 'react';
import { getDbData } from '../../../../lib/db';
import AdminMenuManager from '../../../../components/AdminMenuManager';

export const revalidate = 0;

export default async function AdminMenuPage() {
  const db = await getDbData();
  return <AdminMenuManager initialMenu={db.menu} />;
}
