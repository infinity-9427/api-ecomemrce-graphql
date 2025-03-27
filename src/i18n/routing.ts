import { defineRouting } from 'next-intl/routing';

export const locales = [
  "en",
  "es",
  "fr",
  "pr",
  "it"
] as const;

export type Locale = ( typeof locales )[number];

export const routing = defineRouting( {
  locales,
  defaultLocale: "en"
} );
