import React from 'react';
import { getDbData } from '../../../../lib/db';
import AdminSettingsManager from '../../../../components/AdminSettingsManager';

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const db = await getDbData();
  return <AdminSettingsManager initialSettings={db.settings} />;
}
