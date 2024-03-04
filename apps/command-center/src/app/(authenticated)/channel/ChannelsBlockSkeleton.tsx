import { getDictionary, Locale } from '../../../dictionaries';

export const ChannelsBlockSkeleton = ({ locale }: { locale: Locale }) => {
  const { LOADING_LABEL } = getDictionary(locale);

  return <div>{LOADING_LABEL}</div>;
};
