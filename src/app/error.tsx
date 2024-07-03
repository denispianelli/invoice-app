'use client';

import { Button } from '@/components/ui/button';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-center">Oops! Someting went wrong!</h2>
      <Button variant={'one'} onClick={() => reset()} className="mt-4">
        Try again
      </Button>
    </main>
  );
}
