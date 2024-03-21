interface LocaleMetadata {
  [key: string]: { name: string; prefix: string };
}

export const defaultLocale = "en-us";
export const defaultInternalPrefix = "en";

export const localeMetadata: LocaleMetadata = {
  [defaultLocale]: {
    name: "English",
    prefix: "",
  },
  es: {
    name: "Spanish",
    prefix: "es",
  },
};

export const allowedLocales = Object.keys(localeMetadata);
export const getLocaleMetadata = (locale: string) => localeMetadata[locale];

export const getLocalizedPath = (locale: string, path: string) =>
  locale === defaultLocale
    ? path
    : `/${getLocaleMetadata(locale).prefix}${path}`;

export const getLocaleFromPathParam = (langPrefix: string) =>
  langPrefix === defaultInternalPrefix
    ? defaultLocale
    : allowedLocales.find((l) => getLocaleMetadata(l)?.prefix === langPrefix);

export const getLocalizedPathFromPrefix = (
  langPrefix: string,
  path: string
) => {
  const locale = getLocaleFromPathParam(langPrefix);
  if (locale) {
    return getLocalizedPath(locale, path);
  } else {
    return defaultInternalPrefix;
  }
};

export const getLanguageFromLocale = (locale: string) => locale.split("-")[0];

export const getInternalPrefixFromLocale = (locale: string) =>
  locale === defaultLocale
    ? defaultInternalPrefix
    : getLocaleMetadata(locale).prefix;
