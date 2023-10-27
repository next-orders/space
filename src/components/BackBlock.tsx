"use client";

import { useRouter } from "next/navigation";
import { IconArrowBackUp } from "@tabler/icons-react";

export const BackBlock = () => {
  const router = useRouter();

  return (
    <div className="mx-auto md:mx-0">
      <div
        onClick={() => router.back()}
        className="px-5 py-3 flex flex-row gap-2 text-base font-medium bg-zinc-200 cursor-pointer hover:scale-95 duration-200 rounded-2xl"
      >
        <IconArrowBackUp stroke={1.5} /> Return
      </div>
    </div>
  );
};
