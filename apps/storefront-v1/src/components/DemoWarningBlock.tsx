import { IconTrafficCone } from '@tabler/icons-react';
import { getDictionary, Locale } from '@/dictionaries';

type DemoWarningBlockProps = {
  locale: Locale;
};

export const DemoWarningBlock = ({ locale }: DemoWarningBlockProps) => {
  const { DEMO_WARNING_DESCRIPTION } = getDictionary(locale);

  return (
    <div className="px-4 pt-4 pb-6">
      <div className="px-4 py-4 flex flex-col lg:flex-row gap-2 items-center bg-white rounded-2xl">
        <IconTrafficCone stroke={1.5} className="w-12 h-12 text-orange-600" />
        <p className="text-lg text-center md:text-left">
          {DEMO_WARNING_DESCRIPTION}
        </p>
      </div>
    </div>
  );
};
