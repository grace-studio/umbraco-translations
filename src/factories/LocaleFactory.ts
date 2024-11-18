import { LocaleJSON, LocaleResult } from '../types/index.js';

const getOrCreateLocaleObject = (
  locale: string,
  result: LocaleResult,
): LocaleJSON => {
  if (!result[locale]) {
    result[locale] = {};
  }

  return result[locale];
};

const addTranslation = (
  locale: string,
  path: string[],
  value: string,
  result: LocaleResult,
) => {
  const localeObj = getOrCreateLocaleObject(locale, result);
  let current = localeObj;

  path.forEach((key, index) => {
    if (index === path.length - 1) {
      current[key] = value;
    } else {
      if (!current[key]) {
        current[key] = {};
      }

      current = current[key] as LocaleJSON;
    }
  });
};

const traverse = (
  obj: LocaleJSON,
  path: string[] = [],
  result: LocaleResult,
) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
      traverse(value, [...path, key], result);
    } else if (typeof value === 'string') {
      addTranslation(key, path, value, result);
    }
  });
};

const split = (input: LocaleJSON): LocaleResult => {
  const result: LocaleResult = {};
  traverse(input, [], result);

  return result;
};
export const LocaleFactory = {
  split,
};
