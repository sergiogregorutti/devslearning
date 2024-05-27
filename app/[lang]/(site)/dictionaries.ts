import "server-only";

interface Dictionary {
  [key: string]: () => Promise<{ [key: string]: any }>;
}

const dictionaries: Dictionary = {
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale: string) => dictionaries[locale]();
