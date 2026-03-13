import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import { default as prettier } from 'eslint-config-prettier';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig(
  globalIgnores(['**/dist/', '**/coverage/', '**/build/', '**/node_modules/', '**/.turbo/']),
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    plugins: { jest: jestPlugin as any },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
  },
  prettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-useless-escape': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      'prefer-const': 'off',
      'no-empty': 'off',
      '@typescript-eslint/no-namespace': 'off',
      'no-useless-assignment': 'off',
      'prefer-rest-params': 'off',
      'no-prototype-builtins': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-non-null-asserted-optiona': 'off',
      'preserve-caught-error': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      'no-loss-of-precision': 'off',
      'no-shadow-restricted-names': 'off',
      'no-debugger': 'off',
      'no-async-promise-executor': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '': 'off',
    },
  },
);
