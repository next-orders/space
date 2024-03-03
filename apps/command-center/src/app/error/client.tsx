'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { IconArrowBackUp } from '@tabler/icons-react';
import { Suspense } from 'react';

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="text-center">
      <h1 className="mt-16 mb-2 font-medium text-xl">Something went wrong!</h1>
      <Suspense>
        <ErrorMessage />
      </Suspense>

      <div className="flex flex-row gap-4 justify-center">
        <button
          className="px-5 py-3 flex flex-row gap-2 text-base font-medium bg-zinc-100 cursor-pointer hover:scale-95 duration-200 rounded-2xl"
          onClick={() => router.back()}
        >
          <IconArrowBackUp stroke={1.5} /> Return back
        </button>
      </div>
    </div>
  );
}

function ErrorMessage() {
  const query = useSearchParams();

  return (
    <h2 className="mb-8 font-medium text-md text-orange-700">
      Error: {query.get('message')}
    </h2>
  );
}
