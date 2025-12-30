import { Metadata } from 'next';
import LoginPage from '@/components/pages/LoginPage';

export const metadata: Metadata = {
  title: 'Login - Access Your Account | KaamKhojo.com',
  description: 'Login to your KaamKhojo.com account to access job applications, saved jobs, profile settings, and more career opportunities.',
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: 'Login - Access Your Account | KaamKhojo.com',
    description: 'Login to access your job applications, saved jobs, and career opportunities.',
    url: 'https://kaamkhojo.com/login',
  },
  alternates: {
    canonical: 'https://kaamkhojo.com/login',
  },
};

export default function Login() {
  return <LoginPage />;
}