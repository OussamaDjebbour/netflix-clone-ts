import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
// import tseslint from '@typescript-eslint/eslint-plugin';

export default tseslint.config({
  // extends: [js.configs.recommended, ...tseslint.configs.recommended],
  extends: [
    js.configs.recommended,
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
  ],
  files: ['**/*.{ts,tsx}'],
  ignores: ['dist'],
  languageOptions: {
    // ecmaVersion: 'es2022',
    globals: globals.browser,
  },
  plugins: {
    'react-hooks': reactHooks,
    'react-refresh': reactRefresh,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json', // Ensure this path points to your tsconfig.json
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: globals.browser,
  plugins: ['react-hooks', 'react-refresh', '@typescript-eslint'],
  rules: {
    ...reactHooks.configs.recommended.rules,
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    // "react-hooks/rules-of-hooks": "error",
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-vars': 'error',
    'react/jsx-no-undef': 'error',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-var-requires': 'error',
  },
});
