const { FlatCompat } = require('@eslint/eslintrc');
const nxEslintPlugin = require('@nx/eslint-plugin');
const js = require('@eslint/js');
// import stylistic from '@stylistic/eslint-plugin'
// import stylisticRules from'./eslint-configs/eslint-stylistic';
const stylistic = require('@stylistic/eslint-plugin');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  { plugins: { '@nx': nxEslintPlugin, '@stylistic': stylistic, } },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...compat.config({ extends: ['plugin:@nx/typescript'], }).map((config) => ({
    ...config,
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      ...config.rules,
      '@stylistic/array-bracket-newline': ["error", { "minItems": 2 }],
      '@stylistic/array-bracket-spacing': ["error", "always"],
      '@stylistic/array-element-newline': ["error", { "minItems": 3 }],
      '@stylistic/arrow-parens': ["error", "always"],
      '@stylistic/arrow-spacing': "error",
      '@stylistic/block-spacing': "error",
      '@stylistic/brace-style': "error",
      '@stylistic/comma-dangle': ["error", "always"],
      '@stylistic/comma-spacing': ["error", { "before": false, "after": true }],
      '@stylistic/comma-style': ["error", "last"],
      '@stylistic/computed-property-spacing': ["error", "never"],
      '@stylistic/dot-location': ["error", "property"],
      '@stylistic/eol-last': ["error", "always"],
      '@stylistic/function-call-argument-newline': ["error", "always"], // Or "consistent" ?
      '@stylistic/function-call-spacing': ["error", "never"],
      '@stylistic/function-paren-newline': ["error", { "minItems": 3 }], // Not sure about this one
      '@stylistic/generator-star-spacing': ["error", {"before": true, "after": false}],
      '@stylistic/implicit-arrow-linebreak': ["error", "beside"],
      '@stylistic/indent': "error",
      '@stylistic/indent-binary-ops': ["error", 4],
      '@stylistic/key-spacing': "error",
      '@stylistic/keyword-spacing': "error",
      '@stylistic/line-comment-position': ["error", { "position": "above" }],
      '@stylistic/linebreak-style': ["error", "unix"],
      // @stylistic/lines-around-comment : Not Enabled,
      '@stylistic/lines-between-class-members': [
        "error",
        {
          enforce: [
            { blankLine: "always", prev: "method", next: "method" },
          ]
        },
      ],
      '@stylistic/max-len': ["error", { "code": 80, "tabWidth": 4 }],
      '@stylistic/max-statements-per-line': ["error", { "max": 1 }],
      '@stylistic/ts/member-delimiter-style': "error",
      '@stylistic/multiline-comment-style': ["error", "starred-block"],
      '@stylistic/multiline-ternary': ["error", "always"],
      '@stylistic/new-parens': "error",
      '@stylistic/newline-per-chained-call': "error",
      '@stylistic/no-confusing-arrow': "error",
      '@stylistic/no-extra-parens': "error",
      '@stylistic/no-extra-semi': "error",
      '@stylistic/no-floating-decimal': "error",
      '@stylistic/no-mixed-operators': "error",
      '@stylistic/no-mixed-spaces-and-tabs': "error",
      '@stylistic/no-multi-spaces': "error",
      '@stylistic/no-multiple-empty-lines': ["error", { "max":1 }],
      '@stylistic/no-tabs': "error",
      '@stylistic/no-trailing-spaces': "error",
      '@stylistic/no-whitespace-before-property': "error",
      '@stylistic/nonblock-statement-body-position': ["error", "beside"],
      '@stylistic/object-curly-newline': ["error", { "multiline": true }],
      '@stylistic/object-curly-spacing': ["error", "always"],
      '@stylistic/object-property-newline': "error",
      // '@stylistic/one-var-declaration-per-line': ["error", "initializations"], // Not Enabled, Not sure this is useful
      '@stylistic/operator-linebreak': ["error", "after"],
      '@stylistic/padded-blocks': ["error", "never"],
      // '@stylistic/padding-line-between-statements': // Not Enabled, Not sure this is useful
      '@stylistic/quote-props': ["error", "as-needed"],
      '@stylistic/quotes': ["error", "single"],
      '@stylistic/rest-spread-spacing': ["error", "never"],
      '@stylistic/semi': "error",
      '@stylistic/semi-spacing': "error",
      '@stylistic/semi-style': ["error", "last"],
      '@stylistic/space-before-blocks': "error",
      '@stylistic/space-before-function-paren': ["error", {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
      '@stylistic/space-in-parens': ["error", "never"],
      '@stylistic/space-infix-ops': "error",
      '@stylistic/space-unary-ops': "error",
      '@stylistic/spaced-comment': ["error", "always"],
      '@stylistic/switch-colon-spacing': "error",
      '@stylistic/template-curly-spacing': "error",
      '@stylistic/template-tag-spacing': "error",
      '@stylistic/ts/type-annotation-spacing': "error",
      '@stylistic/type-generic-spacing': ["error"],
      '@stylistic/type-named-tuple-spacing': ["error"],
      '@stylistic/wrap-iife': ["error", "outside"],
      '@stylistic/wrap-regex': "error",
      '@stylistic/yield-star-spacing': ["error", "before"],
    },
  })),
  ...compat.config({ extends: ['plugin:@nx/javascript'] }).map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      ...config.rules,
    },
  })),
  ...compat.config({ env: { jest: true } }).map((config) => ({
    ...config,
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.spec.js', '**/*.spec.jsx'],
    rules: {
      ...config.rules,
    },
  })),
];
