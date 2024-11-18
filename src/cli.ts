#!/usr/bin/env -S node

import dotenv from 'dotenv';
import { Command } from 'commander';
import chalk from 'chalk';
import { FileUtil } from './utils/FileUtil.js';
import { Config, ExtractTranslationsOptions } from './types/index.js';
import { UmbracoTranslations } from './services/UmbracoTranslations.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ override: true });

(() => {
  console.log(chalk.green.bold('Umbraco Translations\n'));
  const config: Config = JSON.parse(
    FileUtil.readFile('.gracefulrc.json') || '{}',
  );

  let apiUrl = process.env.UMBRACO_DICTIONARY_API_URL;

  const program = new Command();

  program
    .command('extract', { isDefault: true })
    .option('-o, --out <string>', 'output dir')
    .option('-a, --apiUrl <string>', 'api url')
    .option('-d, --default <string>', 'default locale')
    .option('-f, --force [boolean]', 'force')
    .action((input) => {
      const options: ExtractTranslationsOptions = {
        apiUrl,
        ...config['umbraco-translations'],
        ...input,
      };

      if (!options.out) {
        console.error('missing output dir\n');
        program.help();
        return;
      }
      if (!options.apiUrl) {
        console.error('missing api url\n');
        program.help();
        return;
      }
      if (!options.default) {
        console.error('missing default locale\n');
        program.help();
        return;
      }

      UmbracoTranslations.extract(options);
    });
  program.parse(process.argv);
})();
