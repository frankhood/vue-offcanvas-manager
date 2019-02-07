module.exports = {
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  rules: {
    'prefer-destructuring': 'off',
    'no-param-reassign': ['error', {'props': false}]
  },
  env: {
    browser: true,
    node: true,
    mocha: true
  },
  globals: {
    expect: true
  }
}
