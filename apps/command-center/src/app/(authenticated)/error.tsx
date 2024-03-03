"use client";

import { useEffect } from "react";
import { IconArrowBackUp, IconRefreshAlert } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <div className="text-center">
      <h1 className="mt-16 mb-2 font-medium text-xl">Something went wrong!</h1>
      <h2 className="mb-8 font-medium text-md text-orange-700">
        Description: {error.message}
      </h2>

      <div className="flex flex-row gap-4 justify-center">
        <button
          className="px-5 py-3 flex flex-row gap-2 text-base font-medium bg-zinc-100 cursor-pointer hover:scale-95 duration-200 rounded-2xl"
          onClick={() => reset()}
        >
          <IconRefreshAlert stroke={1.5} /> Try again
        </button>

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
