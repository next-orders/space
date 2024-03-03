import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mt-8 text-center">
      <div>
        <h1 className="mb-2 text-3xl font-semibold">Error 404</h1>
        <p>What you requested does not exist.</p>
      </div>
      <div className="text-center my-10">
        <div className="mt-8">
          <Link href={"/dashboard"}>Go back to the Dashboard</Link>
        </div>
      </div>
    </div>
  );
}
