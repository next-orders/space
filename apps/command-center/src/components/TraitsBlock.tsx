import { ClientTrait } from '@next-orders/api-sdk';
import { HoverDropdown } from '@/components/HoverDropdown';
import { ClientTraitBadge } from '@/components/ClientTraitBadge';
import { getDropdownByTraitType, Locale } from '@/dictionaries';

type TraitsBlockProps = {
  traits: ClientTrait[];
  locale: Locale;
};

export const TraitsBlock = ({ traits, locale }: TraitsBlockProps) => {
  const traitsToShow = getTraitsWithMinimum(traits);

  const threeTraits = traitsToShow?.map((trait) => (
    <HoverDropdown
      key={trait.id}
      dropdown={getDropdownByTraitType(trait.type, locale)}
    >
      <div className="cursor-default md:hover:scale-125 hover:drop-shadow-md duration-200">
        <ClientTraitBadge size="lg" type={trait.type} />
      </div>
    </HoverDropdown>
  ));

  return (
    <div className="flex flex-row gap-2 justify-center md:group-hover:scale-105 duration-300">
      {threeTraits}
    </div>
  );
};

const getTraitsWithMinimum = (
  traits: ClientTrait[],
  minCount = 3,
): ClientTrait[] => {
  const blankTrait: ClientTrait = {
    id: '',
    type: 'BLANK',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Copy the array to avoid mutating the input
  const traitsCopy = [...traits];

  // Min 3 to show, if less - add blank
  for (let i = traitsCopy.length; i < minCount; i++) {
    traitsCopy.push({
      ...blankTrait,
      id: `blank${i + 1}`,
    });
  }

  return traitsCopy;
};
