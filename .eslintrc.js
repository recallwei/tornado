module.exports = {
  extends: '@brucesong/eslint-config-ts',
  overrides: [
    {
      files: ['*.{ts,tsx,cts,mts}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: __dirname,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      rules: {
        'no-undef': 'off'
      }
    }
  ]
}
