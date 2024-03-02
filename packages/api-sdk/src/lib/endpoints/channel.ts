import { z } from 'zod';
import {
  Channel,
  CountryCode,
  CurrencyCode,
  LanguageCode,
} from '../types/objects';

const currencyCodes: CurrencyCode[] = ['USD', 'EUR', 'RUB'];
const languageCodes: LanguageCode[] = ['EN', 'ES', 'RU'];
const countriesCodes: CountryCode[] = ['US', 'GB', 'ES', 'MX', 'RU'];

export const ChannelCreateRequestSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string().optional(),
  currencyCode: z.enum(currencyCodes as [string, ...string[]]),
  languageCode: z.enum(languageCodes as [string, ...string[]]),
  countryCode: z.enum(countriesCodes as [string, ...string[]]),
});

export type ChannelCreateRequest = z.infer<typeof ChannelCreateRequestSchema>;
export type ChannelCreateResponse = {
  ok: boolean;
  result: Channel;
};
