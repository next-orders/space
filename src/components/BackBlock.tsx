"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mantine/core";
import { IconArrowBackUp } from "@tabler/icons-react";

export const BackBlock = () => {
  const router = useRouter();

  return (
    <div className="mx-auto lg:mx-0">
      <Button
        size="lg"
        leftSection={<IconArrowBackUp stroke={1.5} />}
        onClick={() => router.back()}
        className="px-5 bg-zinc-200 rounded-2xl mx-auto"
      >
        Вернуться назад
      </Button>
    </div>
  );
};
