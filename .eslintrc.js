'use strict'

const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: './',
    project: './tsconfig.json',
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ["@typescript-eslint/eslint-plugin"],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    // specific options
    "semi": ["error", "never"],
    "max-len": ["warn", { "code": 120 }],
    "quotes": ["error", "single", { "allowTemplateLiterals": true }],

    "no-console": "off",
    "no-alert": "warn",
    "no-extra-boolean-cast": "off",
    "array-callback-return": "error",
    "no-multi-spaces": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-self-compare": "error",
    "no-unused-expressions": "error",
    "no-useless-return": "error",
    "radix": "error",
    "no-shadow": "error",
    "no-use-before-define": ["error", { "functions": false, "classes": false }],
    "no-undef-init": "error",
    "array-bracket-newline": ["warn", "consistent"],
    "brace-style": "error",
    "comma-dangle": ["error", "always-multiline"],
    "comma-spacing": "error",
    "comma-style": "error",
    "func-call-spacing": "error",
    "function-call-argument-newline": ["warn", "consistent"],
    "implicit-arrow-linebreak": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 3 }],
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "warn",
    "no-whitespace-before-property": "error",
    "object-curly-spacing": ["error", "always"],
    "operator-assignment": "error",
    "operator-linebreak": ["error", "before"],
    "prefer-object-spread": "error",
    "wrap-regex": "error",
    "arrow-body-style": "warn",
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "no-duplicate-imports": "error",
    "no-useless-rename": "error",
    "no-useless-constructor": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": ["error", { "allowNamedFunctions": true }],
    "prefer-const": "error",
    "prefer-rest-params": "error",
    "prefer-spread": "error",

    // JSX and react
    "jsx-quotes": "error",

    // node.js and commonJS
    "global-require": "error",
    "handle-callback-err": "warn",
    "no-mixed-requires": "error",
    "no-new-require": "error",

    // Typescript
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/camelcase": "off",
  }
}
