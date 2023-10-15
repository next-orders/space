import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "404",
  description: "Page not found",
};

export default function NotFound() {
  return (
    <div className="text-center my-10">
      <h1 className="text-xl">Error 404</h1>
      <p>What you requested does not exist.</p>

      <div className="mt-8">
        <Link href="/">Go back to the Home page</Link>
      </div>
    </div>
  );
}
