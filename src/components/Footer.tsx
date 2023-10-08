import Link from "next/link";
import { IconBrandGithubFilled, IconHearts } from "@tabler/icons-react";

export const Footer = () => {
  return (
    <div className="px-4 pb-10 mt-4 md:px-6 md:mt-4 text-center">
      <div className="flex flex-row gap-1 justify-center">
        Created with <IconHearts stroke={1.5} className="text-red-500" /> by
        Nick Kosarev and team
      </div>

      <div className="mt-4">
        <Link
          href={"https://github.com/next-orders/v1"}
          target="_blank"
          className="px-3 py-3 bg-zinc-800 inline-block rounded-full text-white hover:scale-110 duration-200"
        >
          <IconBrandGithubFilled stroke={1.5} size={24} />
        </Link>
      </div>
    </div>
  );
};
