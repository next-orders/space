import type {
  CountryCode } from 'libphonenumber-js'
import {
  AsYouType,
  formatIncompletePhoneNumber,
  isValidPhoneNumber,
  parsePhoneNumber,
} from 'libphonenumber-js'

export function getPhoneNumberFormatter(countryCode: CountryCode) {
  return new AsYouType(countryCode)
}

export function formatPhoneNumber(value: string, countryCode: CountryCode) {
  if (value.length > 10) {
    try {
      const parsed = parsePhoneNumber(value, countryCode)
      if (parsed) {
        return parsed.format('INTERNATIONAL', {
          humanReadable: true,
          fromCountry: countryCode,
        })
      }
    } catch (err) {
      if (err instanceof Error) {
        return value
      }
    }
  }
  if (value.length > 6) {
    return formatIncompletePhoneNumber(value, countryCode) ?? ''
  }
  return value
}

export function checkPhoneNumberValidity(value: string,
  countryCode: CountryCode) {
  return isValidPhoneNumber(value, countryCode)
}
