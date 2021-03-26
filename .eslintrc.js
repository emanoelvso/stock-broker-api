module.exports = {
  env: {
    es2020: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['promise', 'jest', 'prettier'],
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
