"use client";

import Link from "next/link";
import { IconArrowBackUp } from "@tabler/icons-react";
import { getDictionary, Locale } from "@/dictionaries";

type HeaderCheckoutProps = {
  locale: Locale;
};

export const HeaderCheckout = ({ locale }: HeaderCheckoutProps) => {
  const { RETURN_BUTTON } = getDictionary(locale);

  return (
    <div className="z-10 w-full h-full px-4 md:px-4 flex flex-row flex-nowrap justify-between content-center items-center border-b border-zinc-100">
      <Link
        href={"/"}
        className="mr-2 md:mr-0 flex flex-row gap-2 items-center hover:scale-95 duration-200"
      >
        <IconArrowBackUp stroke={1.5} /> {RETURN_BUTTON}
      </Link>
    </div>
  );
};
