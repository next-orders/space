import { redirect } from "next/navigation";
import { GetShop } from "@/client/api";
import InstallPage from "@/app/install/client";

export default async function Page() {
  const shop = await GetShop();
  if (shop) {
    // Shop is already in DB
    return redirect("/auth/login");
  }

  return <InstallPage />;
}
