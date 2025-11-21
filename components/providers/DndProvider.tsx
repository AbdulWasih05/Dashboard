'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-dnd with no SSR to prevent hydration issues
const ReactDndProvider = dynamic(
  () => import('react-dnd').then((mod) => mod.DndProvider),
  { ssr: false }
);

const HTML5Backend = dynamic(
  () => import('react-dnd-html5-backend').then((mod) => mod.HTML5Backend as unknown as React.ComponentType),
  { ssr: false }
);

export default function DndProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return children directly during SSR/initial render
  if (!isMounted) {
    return <>{children}</>;
  }

  // Dynamically load the actual DnD provider only on client
  return <DndProviderClient>{children}</DndProviderClient>;
}

// Separate client component for the actual DnD functionality
function DndProviderClient({ children }: { children: React.ReactNode }) {
  const { DndProvider: Provider } = require('react-dnd');
  const { HTML5Backend: Backend } = require('react-dnd-html5-backend');

  return <Provider backend={Backend}>{children}</Provider>;
}
