export type LocaleJSON = {
  [key: string]: string | LocaleJSON;
};

export type LocaleResult = {
  [locale: string]: LocaleJSON;
};

export type ExtractTranslationsOptions = {
  out: string;
  default: string;
  apiUrl: string;
  force?: boolean;
};

export type Config = {
  'umbraco-translations'?: Partial<ExtractTranslationsOptions>;
};
