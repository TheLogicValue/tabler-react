import js from '@eslint/js'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'

const reactRules = fixupPluginRules(react)
const accessibilityRules = fixupPluginRules(jsxA11y)
export default [
  { ignores: ['**/node_modules/**', 'dist/**', 'demo/dist/**'] },
  {
    files: ['src/**/*.{js,ts,tsx}', 'tests/**/*.cjs', 'tests/types/**/*.tsx', 'demo/src/**/*.{js,jsx}', '**/*.mjs'],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.es2025 },
    },
    rules: {
      ...js.configs.recommended.rules,
      // Preserve the legacy project's warning level while exposing unused code.
      'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      eqeqeq: 'off',
      'no-implied-eval': 'off',
    },
  },
  {
    files: ['src/**/*.{ts,tsx}', 'tests/types/**/*.tsx'],
    languageOptions: { parser: typescriptParser },
    plugins: { '@typescript-eslint': typescriptPlugin },
    rules: {
      ...typescriptPlugin.configs['eslint-recommended'].overrides[0].rules,
      ...typescriptPlugin.configs.recommended.rules,
      'no-undef': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
    },
  },
  {
    files: ['src/**/*.{js,ts,tsx}', 'tests/types/**/*.tsx', 'demo/src/**/*.{js,jsx}'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { react: reactRules, 'react-hooks': reactHooks, 'jsx-a11y': accessibilityRules },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      // TypeScript declarations define the library's component props.
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/anchor-is-valid': ['error', {
        components: ['Link'], specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      }],
    },
  },
  {
    files: ['**/*.mjs', 'demo/scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['tests/**/*.cjs'],
    languageOptions: { sourceType: 'commonjs', globals: globals.node },
  },
  {
    files: ['demo/src/**/*.{js,jsx}'],
    languageOptions: { globals: { __LIBRARY_VERSION__: 'readonly', __DEMO_VITE_VERSION__: 'readonly' } },
  },
]
