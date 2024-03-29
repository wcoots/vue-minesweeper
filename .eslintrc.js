module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: ['plugin:vue/essential', '@vue/airbnb', '@vue/typescript', 'plugin:prettier/recommended'],
    plugins: ['prettier'],
    rules: {
        'prettier/prettier': 'error',
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        camelcase: 'off',
        'prefer-default-export': 'off',
        'no-restricted-syntax': 'off',
        'no-nested-ternary': 'off',
        'no-lonely-if': 'off',
        'no-restricted-globals': 'off',
        'no-useless-concat': 'off',
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
}
