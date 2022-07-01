module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'airbnb',
    'prettier',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['@typescript-eslint', '@typescript-eslint/tslint'],
  rules: {
    'no-unused-vars': 'error',
    'no-use-before-define': 0,
    'prefer-destructuring': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/destructuring-assignment': 0,
    'react/default-props-match-prop-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-misused-promises': 0,
    '@typescript-eslint/no-unsafe-call': 0,
    '@typescript-eslint/no-unsafe-argument': 0,
    '@typescript-eslint/no-unsafe-assignment': 0,
  },
};
