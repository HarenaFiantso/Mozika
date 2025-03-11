import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: [
      '**/node_modules',
      '**/ios',
      '**/android',
      '**/.expo',
      '**/.vscode',
      '**/package.json',
    ],
  },
  ...compat.extends(
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-native/all',
    'expo',
    'plugin:react/jsx-runtime',
    'prettier'
  ),
  {
    plugins: {
      prettier,
    },

    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/array-type': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      '@typescript-eslint/no-explicit-any': 0,

      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/no-var-requires': 0,
      '@typescript-eslint/no-require-imports': 0,
      '@typescript-eslint/no-empty-object-type': 0,
      'no-use-before-define': 0,

      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'react',
              importNames: ['default'],
              message: "Import named exports from 'react' instead.",
            },
          ],
        },
      ],

      'react/prop-types': 0,
      'react-native/no-raw-text': 0,
      'comma-dangle': 0,
      'no-global-assign': 0,
      'quotes': 0,
      'space-before-function-paren': 0,
    },
  },
];
