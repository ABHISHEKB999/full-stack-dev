module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'airbnb',
    'prettier',
    'plugin:prettier/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
    'prettier'
  ],
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    "import/no-named-as-default": "off",
    "react/jsx-props-no-spreading": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/label-has-associated-control": "off",
    "react/forbid-prop-types": "off",
    "no-param-reassign": "off",
    "react/no-array-index-key": "off"
  },
  ignorePatterns: ['**/*.test.js', '**/*.spec.js'],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
};
