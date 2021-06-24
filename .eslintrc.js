module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    camelcase: 'off',
    ignoreDestructuring: true,
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-catch': 'off',
    'no-unused-vars': ['error', { varsIgnorePattern: 'debug' }],
    'max-len': ['error', {
      code: 200,
      ignoreComments: true,
    }],
    'prefer-destructuring': ['error', {
      'object': true,
      'array': false
    }],
    'no-use-before-define': ['error', { 'functions': false, 'classes': false }]
  },
};
