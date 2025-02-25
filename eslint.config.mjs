import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import StylisticPlugin from '@stylistic/eslint-plugin'
import * as regexpPlugin from 'eslint-plugin-regexp'


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  { languageOptions: { parserOptions: { parser: tseslint.parser } } },
  regexpPlugin.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { stylistic: StylisticPlugin },
    rules: {
      'no-extra-boolean-cast': 'off',
      '@typescript-eslint/no-implicit-any': 'off',
      '@typescript-eslint/no-explicit-any': ['warn', { ignoreRestArgs: true }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          'args': 'all',
          'argsIgnorePattern': '^_',
          'caughtErrors': 'all',
          'caughtErrorsIgnorePattern': '^_',
          'destructuredArrayIgnorePattern': '^_',
          'varsIgnorePattern': '^_',
          'ignoreRestSiblings': true,
        },
      ],
      'stylistic/semi': ['warn', 'never'],
      // 'stylistic/max-len': ['warn', { 'code': 120 }],
      'stylistic/quotes': ['warn', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
      'stylistic/comma-dangle': ['warn', {
        'arrays': 'always-multiline',
        'objects': 'always-multiline',
        'imports': 'always-multiline',
        'exports': 'always-multiline',
        'functions': 'always-multiline',
        'importAttributes': 'always-multiline',
        'dynamicImports': 'always-multiline',
      }],
      'stylistic/indent': ['warn', 2],
      'stylistic/function-call-spacing': ['warn', 'never'],
      'stylistic/type-generic-spacing': ['warn'],
      'stylistic/object-curly-spacing': ['warn', 'always'],
      'stylistic/template-curly-spacing': ['warn', 'never'],
      'stylistic/object-curly-newline': ['warn', {
        'ObjectExpression': {
          multiline: true,
          minProperties: 8,
        },
        'ObjectPattern': 'never',
        'ImportDeclaration': {
          multiline: true,
          minProperties: 8,
        },
        'ExportDeclaration': {
          multiline: true,
          minProperties: 8,
        },
      }],
    },
  },
  { ignores: ['dist/*'] },
  // { ignores: ["/*", "!/src"] },
]
