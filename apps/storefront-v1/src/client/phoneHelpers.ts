import {
  AsYouType,
  CountryCode,
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js';

export const getPhoneNumberFormatter = (countryCode: CountryCode) =>
  new AsYouType(countryCode);

export const formatPhoneNumber = (value: string, countryCode: CountryCode) => {
  if (value.length > 10) {
    try {
      const parsed = parsePhoneNumber(value, countryCode);
      if (parsed) {
        return parsed.format('INTERNATIONAL', {
          humanReadable: true,
          fromCountry: countryCode,
        });
      }
    } catch (err) {
      return value;
    }
  }
  if (value.length > 6) {
    return formatIncompletePhoneNumber(value, countryCode) ?? '';
  }
  return value;
};

export const checkPhoneNumberValidity = (
  value: string,
  countryCode: CountryCode,
) => {
  return isValidPhoneNumber(value, countryCode);
};
