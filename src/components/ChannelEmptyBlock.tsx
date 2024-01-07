import { getDictionary, Locale } from "@/dictionaries";

type ChannelEmptyBlockProps = {
  locale: Locale;
};

export const ChannelEmptyBlock = ({ locale }: ChannelEmptyBlockProps) => {
  const {
    CHANNEL_IS_NOT_CONFIGURED_LABEL,
    CHANNEL_IS_NOT_CONFIGURED_DESCRIPTION,
  } = getDictionary(locale);

  return (
    <div className="max-w-md mx-auto mt-20 text-center">
      <h1 className="mb-2 text-xl font-medium">
        {CHANNEL_IS_NOT_CONFIGURED_LABEL}
      </h1>
      <p>{CHANNEL_IS_NOT_CONFIGURED_DESCRIPTION}</p>
    </div>
  );
};
