# @grace-studio/umbraco-translations

[![npm version](https://badge.fury.io/js/@grace-studio%2Fumbraco-translations.svg)](https://badge.fury.io/js/@grace-studio%2Fumbraco-translations)

## Overview

`@grace-studio/umbraco-translations` is a lightweight tool designed to fetch dictionary files from a custom Umbraco API endpoint and transform them into one JSON file per locale. It's perfect for localization workflows and simplifies integration with pipelines or CI/CD processes.

## Installation

### Global Installation

Install the package globally for system-wide usage:

```bash
npm i -g @grace-studio/umbraco-translations
# or
yarn global add @grace-studio/umbraco-translations
```

### Local Installation

Alternatively, install it locally within your project (e.g., as a dev dependency):

```bash
npm i -D @grace-studio/umbraco-translations
# or
yarn add -D @grace-studio/umbraco-translations
```

## Usage

### Using CLI Parameters

Run the following command with the appropriate parameters:

```bash
umbraco-translations \
  --apiUrl <api-url> \
  --out <output-directory> \
  --default <default-locale> \
  --force
```

| **Parameter** | **Description**                             | **Required** |
| ------------- | ------------------------------------------- | ------------ |
| `--apiUrl`    | The Umbraco API endpoint to fetch data from | Yes          |
| `--out`       | Output directory for generated JSON files   | Yes          |
| `--default`   | The default locale (e.g., `sv`, `en`)       | Yes          |
| `--force`     | Force overwrite without confirmation        | No           |

### Using Configuration File

Instead of passing CLI parameters, you can define a .gracefulrc.json configuration file in your project root:

```json
{
  "umbraco-translations": {
    "apiUrl": "https://example.umbraco.io",
    "out": "./output/dir",
    "default": "sv",
    "force": true
  }
}
```

Once the configuration file is in place, simply run:

```bash
umbraco-translations
```

### Example output

For the configuration above, JSON files for each locale will be saved in the ./output/dir directory.

## Environment Variables

To keep sensitive information secure, you can define the API URL and access token in a `.env` file:

```bash
UMBRACO_DICTIONARY_API_URL=https://example.umbraco.io
UMBRACO_DICTIONARY_ACCESS_TOKEN=your-secret-access-token
```

This approach is especially useful for CI/CD pipelines and avoids hardcoding sensitive data.

## Example Workflow

1. **Prepare Configuration**: Set up `.gracefulrc.json` or use CLI parameters to configure the tool.
2. **Run the Tool**: Execute the command `umbraco-translations` to generate JSON files.
3. **Integration**: Use the generated locale JSON files in your application or deploy them as needed.

## Features

- Supports fetching dictionary files from any custom Umbraco endpoint.
- Outputs one JSON file per locale, ready for use in applications.
- Configurable via CLI, JSON configuration file, or environment variables.
- Designed for seamless integration into localization workflows and pipelines.
