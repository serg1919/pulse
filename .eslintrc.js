module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'jQuery': true
  },
  'extends': 'eslint:recommended',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module'
  },
  'rules': {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    'no-unused-vars': [
      'warn'
    ]
  }
};
