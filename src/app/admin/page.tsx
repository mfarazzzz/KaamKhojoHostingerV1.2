import { Metadata } from 'next';
import AdminDashboardPage from '@/components/pages/AdminDashboardPage';

export const metadata: Metadata = {
  title: 'Admin Dashboard | KaamKhojo.com',
  description: 'Admin dashboard for managing KaamKhojo.com platform.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminDashboard() {
  return <AdminDashboardPage />;
}