import dotenv from 'dotenv';
import inquirer, { DistinctQuestion } from 'inquirer';
import { FileUtil } from '../utils/FileUtil.js';
import chalk from 'chalk';
import {
  Config,
  ExtractTranslationsOptions,
  LocaleJSON,
} from '../types/index.js';
import { httpClient } from '../data/httpClient.js';
import { LocaleFactory } from '../factories/LocaleFactory.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ override: true });

const checkInputs = async ({ out, ...options }: ExtractTranslationsOptions) => {
  let token = process.env.UMBRACO_DICTIONARY_ACCESS_TOKEN;

  const getToken: DistinctQuestion = {
    type: 'input',
    name: 'token',
    message: 'Enter Umbraco Dictionary access token',
  };

  const confirm: DistinctQuestion = {
    type: 'confirm',
    name: 'confirm',
    message: `All content in ${out} will be deleted before writing new files. Proceed?`,
  };

  const questions = [
    ...(token ? [] : [getToken]),
    ...(options.force ? [] : [confirm]),
  ];

  const answers = await inquirer.prompt(questions);
  token = token || answers.token;

  if (!token || (!answers.confirm && !options.force)) {
    return;
  }

  return token;
};

const getRawJson = async (options: ExtractTranslationsOptions, token: string) =>
  httpClient<LocaleJSON>(options.apiUrl, token);

const extract = async (options: ExtractTranslationsOptions) => {
  const token = await checkInputs(options);

  if (token) {
    try {
      const json = await getRawJson(options, token);

      const splittedLocales = LocaleFactory.split(json);
      // splittedLocales.default = splittedLocales[options.default];

      FileUtil.clearPath(options.out);

      Object.entries(splittedLocales).forEach(([locale, content]) => {
        FileUtil.writeFile(
          `${options.out}/locales`,
          `${locale}.json`,
          JSON.stringify(content, null, 2),
        );
      });

      const indexTs: string[] = [];
      Object.keys(splittedLocales).forEach((locale) => {
        indexTs.push(
          `export { default as ${locale} } from './locales/${locale}.json';`,
        );

        if (locale === options.default) {
          indexTs.push(
            `export { default as defaultLocale } from './locales/${locale}.json';`,
          );
        }
      });
      FileUtil.writeFile(options.out, 'index.ts', indexTs.join('\n'));
    } catch (erro) {}
  }
};

export const UmbracoTranslations = {
  extract,
};
