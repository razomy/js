import { default as eslint } from '@eslint/js';
import { default as tseslint } from 'typescript-eslint';
// import {default as unicorn} from 'eslint-plugin-unicorn';
import { default as importX } from 'eslint-plugin-import-x';
import { default as prettier } from 'eslint-config-prettier';
import { default as globals } from 'globals';

export default tseslint.config(
  {
    ignores: ['**/dist/**', '**/coverage/**', '**/build/**', '**/node_modules/**', '**/.turbo/**'],
  },

  eslint.configs.recommended,

  // ...tseslint.configs.recommended,
  // ...tseslint.configs.stylisticTypeChecked,

  // unicorn.configs['flat/recommended'],

  importX.flatConfigs.recommended,
  // importX.flatConfigs.typescript,

  {
    // settings: {
    //   'import-x/resolver': {
    //     node: true,
    //     typescript: {
    //       alwaysTryTypes: true,
    //       project: true,
    //     },
    //   },
    // },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/explicit-function-return-type': 'error',
      // '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      // '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // '@typescript-eslint/no-non-null-assertion': 'error',
      // '@typescript-eslint/switch-exhaustiveness-check': 'error',
      //
      // 'unicorn/prevent-abbreviations': 'off',
      // 'unicorn/filename-case': ['error', { case: 'snakeCase' }],
      // 'unicorn/no-null': 'off',
      //
      // 'import-x/no-unresolved': 'error',
      // 'import-x/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      //     'newlines-between': 'always',
      //     alphabetize: { order: 'asc', caseInsensitive: true },
      //   },
      // ],
      //
      // 'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
      // 'eqeqeq': ['error', 'always'],
      // 'curly': ['error', 'all'],
    },
  },

  prettier,
);
