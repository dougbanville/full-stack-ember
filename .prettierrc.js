'use strict';

module.exports = {
  overrides: [
    {
      files: '*.{js,ts}',
      options: {
        singleQuote: true,
        trailingComma: 'all',
        printWidth: 100,
        tabWidth: 2,
        semi: true,
        bracketSpacing: true,
      },
    },
  ],
};
