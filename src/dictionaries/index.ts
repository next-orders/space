import { Dictionary, EN } from "@/dictionaries/en";
import { RU } from "@/dictionaries/ru";

const dictionaries = { EN, RU };

export type Locale = "EN" | "RU";

export const getDictionary = (locale: Locale = "EN"): Dictionary =>
  dictionaries[locale];
