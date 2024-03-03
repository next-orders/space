import { TraitsBlock } from "@/components/TraitsBlock";
import { getDictionary, Locale } from "@/dictionaries";

export const ClientAvatarBlockSkeleton = ({ locale }: { locale: Locale }) => {
  const { LOADING_LABEL } = getDictionary(locale);

  return (
    <div className="mb-4 mx-auto max-w-xs group">
      <div className="relative w-full bg-zinc-50 rounded-2xl h-auto px-3 py-3 animate-pulse">
        <div className="w-full aspect-square rounded-xl bg-zinc-200" />
        <div className="mt-3 text-lg font-medium leading-tight text-center text-zinc-400">
          {LOADING_LABEL}
        </div>
      </div>

      <div className="mt-4 animate-pulse">
        <TraitsBlock traits={[]} locale={locale} />
      </div>
    </div>
  );
};
