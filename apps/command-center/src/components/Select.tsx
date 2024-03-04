import { getDictionary, Locale } from '../dictionaries';

type SelectProps = {
  name: string;
  label: string;
  isRequired: boolean;
  defaultValue: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  options: { value: string; label: string }[] | undefined;
  locale: Locale;
};

export const Select = ({
  name,
  label,
  isRequired,
  defaultValue,
  onChange,
  options,
  locale,
}: SelectProps) => {
  const { SELECT_LABEL } = getDictionary(locale);

  const showOptions = options?.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));

  return (
    <>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-zinc-900"
      >
        {label} {isRequired && '*'}
      </label>
      <select
        id={name}
        name={name}
        required={isRequired}
        defaultValue={defaultValue}
        onWheel={(event) => event.currentTarget.blur()}
        onChange={(event) => onChange(event.currentTarget.value)}
        className="peer block w-full rounded-2xl border border-zinc-200 py-3 pl-4 pr-8 text-base cursor-pointer appearance-none form-select outline-2 outline-offset-1 outline-zinc-500 placeholder:text-zinc-400"
      >
        <option hidden>{SELECT_LABEL}</option>
        {showOptions}
      </select>
    </>
  );
};
