import { MainAPI } from "@next-orders/api-sdk";

export const apiPublicClient = new MainAPI(
  process.env.NEXT_PUBLIC_API_URL || "",
  "",
);
