import React from 'react';
import { getDbData } from '../../../../lib/db';
import AdminReservationsManager from '../../../../components/AdminReservationsManager';

export const revalidate = 0;

export default async function AdminReservationsPage() {
  const db = await getDbData();
  return <AdminReservationsManager initialReservations={db.reservations} />;
}
