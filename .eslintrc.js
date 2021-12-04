// @ts-check

/**
 * ESLint Configuration File
 *
 * Docs: https://eslint.org/docs/user-guide/configuring
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  /**
   * Config Root
   */
  root: true,
  /**
   * Custom Rules
   */
  rules: {},
  /**
   * Custom Groups
   */
  overrides: [
    {
      files: ['*.js', '*.jsx'],
      env: {
        es2020: true,
        node: true,
      },
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    },
    {
      files: ['*.ts', '*.tsx'],
      env: {
        es2020: true,
        node: true,
      },
      parser: '@typescript-eslint/parser',
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    },
  ],
}
