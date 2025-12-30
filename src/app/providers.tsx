'use client';

import { ReactNode } from 'react';
import ErrorBoundary from '@/components/ErrorBoundary';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  );
}