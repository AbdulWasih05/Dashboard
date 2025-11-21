'use client';

import { useState, useEffect } from 'react';

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
