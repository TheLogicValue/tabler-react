import js from '@eslint/js'
import { fixupPluginRules } from '@eslint/compat'
import globals from 'globals'
import hermesParser from 'hermes-eslint'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

const reactRules = fixupPluginRules(react)
const accessibilityRules = fixupPluginRules(jsxA11y)
// These types are supplied by Flow's React/DOM standard libraries, rather than
// declared as JavaScript bindings. Keep no-undef active for actual identifiers.
const flowGlobals = Object.fromEntries([
  '$Keys', 'MouseEventListener', 'SyntheticEvent', 'SyntheticAnimationEvent',
  'SyntheticClipboardEvent', 'SyntheticFocusEvent', 'SyntheticInputEvent',
  'SyntheticKeyboardEvent', 'SyntheticMouseEvent', 'SyntheticTouchEvent',
  'SyntheticTransitionEvent', 'SyntheticUIEvent', 'SyntheticWheelEvent',
].map(name => [name, 'readonly']))

export default [
  { ignores: ['**/node_modules/**', 'dist/**', 'demo/dist/**', 'flow-typed/**'] },
  {
    files: ['src/**/*.js', 'demo/src/**/*.{js,jsx}', '**/*.mjs'],
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
    files: ['src/**/*.js'],
    // Hermes supports Flow and ESLint 10 without changing the Babel 7 build.
    languageOptions: { parser: hermesParser, globals: flowGlobals },
  },
  {
    files: ['src/**/*.js', 'demo/src/**/*.{js,jsx}'],
    languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
    plugins: { react: reactRules, 'react-hooks': reactHooks, 'jsx-a11y': accessibilityRules },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      // Flow is the library's existing props schema; don't require PropTypes.
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
    files: ['src/test.js', '**/*.{test,spec}.{js,jsx}'],
    languageOptions: { globals: globals.jest },
  },
  {
    files: ['demo/src/**/*.{js,jsx}'],
    languageOptions: { globals: { __LIBRARY_VERSION__: 'readonly', __DEMO_VITE_VERSION__: 'readonly' } },
  },
]
