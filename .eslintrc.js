module.exports = {
    env: {
        node: true,
        jest: true,
    },
    extends: ['standard', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        'node/no-path-concat': 'off',
        'node/handle-callback-err': 'off',
        'node/no-callback-literal': 'off',
        'node/no-exports-assign': 'off',
        'node/no-new-require': 'off',
        'no-useless-constructor': 'off',
    },
}
