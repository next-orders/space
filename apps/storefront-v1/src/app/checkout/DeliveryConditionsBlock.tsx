'use client';

import React from 'react';
import { IconClock } from '@tabler/icons-react';
import { getDictionary, Locale } from '@/dictionaries';
import { getCurrencySign } from '@/client/helpers';
import { CountryCode, CurrencyCode } from '@next-orders/api-sdk';
import {
  checkPhoneNumberValidity,
  formatPhoneNumber,
  getPhoneNumberFormatter,
} from '@/client/phoneHelpers';

type DeliveryConditionsBlockProps = {
  locale: Locale;
  currencyCode: CurrencyCode;
  countryCode: CountryCode;
};

export const DeliveryConditionsBlock = ({
  locale,
  currencyCode,
  countryCode,
}: DeliveryConditionsBlockProps) => {
  const {
    DELIVERY_CONDITIONS_LABEL,
    DELIVERY_LABEL,
    INDICATE_ADDRESS_LABEL,
    DELIVERY_TIME_LABEL,
    NOW_LABEL,
    MIN_LABEL,
    ADDRESS_STREET_PLACEHOLDER,
    ADDRESS_APT_OFFICE_PLACEHOLDER,
    ADDRESS_DOOR_PHONE_PLACEHOLDER,
    ADDRESS_ENTRANCE_PLACEHOLDER,
    ADDRESS_FLOOR_PLACEHOLDER,
    COMMENT_PLACEHOLDER,
    CONTACTS_LABEL,
    CONTACT_PHONE_PLACEHOLDER,
    CONTACT_NAME_PLACEHOLDER,
  } = getDictionary(locale);

  const currencySign = getCurrencySign(currencyCode);

  const [phone, setPhone] = React.useState<string>('');
  const [isValidPhone, setIsValidPhone] = React.useState<boolean>(false);

  const handlePhoneChange: React.ChangeEventHandler<HTMLInputElement> = (
    el
  ) => {
    const phoneInputValue = el.target.value;
    if (phoneInputValue.length > 17) return;

    getPhoneNumberFormatter(countryCode).input(phoneInputValue);

    const formattedPhoneNo = formatPhoneNumber(phoneInputValue, countryCode);
    setPhone(formattedPhoneNo);

    const isPhoneValid = checkPhoneNumberValidity(phoneInputValue, countryCode);
    setIsValidPhone(isPhoneValid);
  };

  return (
    <div className="mb-6 px-4 py-5 md:px-6 md:py-6 bg-white rounded-3xl">
      <h2 className="mb-2 text-xl md:text-2xl font-medium">
        {DELIVERY_CONDITIONS_LABEL}
      </h2>

      <div className="px-4 py-2 bg-zinc-100 rounded-2xl inline-block">
        <div className="font-medium">{DELIVERY_LABEL}</div>
        <div>
          5<span className="pl-1 text-xs">{currencySign}</span>
        </div>
      </div>

      <div className="w-full mt-4">
        <h3 className="mb-2 text-lg md:text-xl font-medium">
          {CONTACTS_LABEL}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2">
          <input
            type="text"
            name="phone"
            value={phone}
            onChange={handlePhoneChange}
            placeholder={CONTACT_PHONE_PLACEHOLDER}
            className="px-4 py-3 mb-2 w-full border border-zinc-200 rounded-2xl outline-2 outline-offset-1 outline-zinc-500 placeholder:text-zinc-400 data-[valid=true]:outline-teal-400"
            data-valid={isValidPhone}
          />

          <input
            type="text"
            name="name"
            placeholder={CONTACT_NAME_PLACEHOLDER}
            className="px-4 py-3 mb-2 w-full border border-zinc-200 rounded-2xl"
          />
        </div>
      </div>

      <div className="w-full mt-4">
        <h3 className="mb-2 text-lg md:text-xl font-medium">
          {INDICATE_ADDRESS_LABEL}
        </h3>
        <input
          type="text"
          name="street"
          placeholder={ADDRESS_STREET_PLACEHOLDER}
          className="px-4 py-3 mb-2 w-full border border-zinc-200 rounded-2xl"
        />

        <div className="mb-2 grid grid-cols-2 md:grid-cols-4 gap-2">
          <input
            type="text"
            name="apartment"
            placeholder={ADDRESS_APT_OFFICE_PLACEHOLDER}
            className="px-4 py-3 border border-zinc-200 rounded-2xl"
          />

          <input
            type="text"
            name="doorphone"
            placeholder={ADDRESS_DOOR_PHONE_PLACEHOLDER}
            className="px-4 py-3 border border-zinc-200 rounded-2xl"
          />

          <input
            type="text"
            name="entrance"
            placeholder={ADDRESS_ENTRANCE_PLACEHOLDER}
            className="px-4 py-3 border border-zinc-200 rounded-2xl"
          />

          <input
            type="text"
            name="floor"
            placeholder={ADDRESS_FLOOR_PLACEHOLDER}
            className="px-4 py-3 border border-zinc-200 rounded-2xl"
          />
        </div>

        <input
          type="text"
          name="comment"
          placeholder={COMMENT_PLACEHOLDER}
          className="px-4 py-3 mb-2 w-full border border-zinc-200 rounded-2xl"
        />
      </div>

      <h2 className="mt-4 mb-2 text-xl md:text-2xl font-medium">
        {DELIVERY_TIME_LABEL}
      </h2>

      <div className="flex flex-row gap-2">
        <IconClock stroke={1.5} />
        {NOW_LABEL}: 45-60 {MIN_LABEL}
      </div>
    </div>
  );
};
