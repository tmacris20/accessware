const customEslintConfig = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  globals: {
    JSX: true,
    cy: true,
    Cypress: true,
  },
  ignorePatterns: ['coverage', 'storybook-static', 'public', 'cache'],
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:react-hooks/recommended',
    'plugin:jest/recommended',
    'prettier',
    'plugin:cypress/recommended',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jsx-a11y', 'only-error'],
  rules: {
    'import/no-default-export': ['error'],
    'react/prop-types': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'jest/no-conditional-expect': 'off',
    'jest/no-try-expect': 'off',
    'jest/no-large-snapshots': [
      'error',
      {
        maxSize: 20,
        inlineMaxSize: 6,
      },
    ],
    semi: 'off',
    'comma-dangle': 'off',
    'no-console': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
  },
  overrides: [
    {
      files: ['pages/**/*'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
}
module.exports = customEslintConfig
