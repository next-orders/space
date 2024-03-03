import { ClientCardSkeleton } from "@/components/ClientCard";
import { Locale } from "@/dictionaries";

export const ClientsBlockSkeleton = ({ locale }: { locale: Locale }) => {
  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-2">
      <ClientCardSkeleton locale={locale} />
      <ClientCardSkeleton locale={locale} />
      <ClientCardSkeleton locale={locale} />
      <ClientCardSkeleton locale={locale} />
      <ClientCardSkeleton locale={locale} />
      <ClientCardSkeleton locale={locale} />
      <ClientCardSkeleton locale={locale} />
    </div>
  );
};
