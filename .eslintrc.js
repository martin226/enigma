module.exports = {
    root: true,

    env: {
        node: true,
    },

    extends: [
        'plugin:vue/recommended',
        '@vue/airbnb',
        '@vue/typescript/recommended',
        'plugin:prettier/recommended',
    ],

    parserOptions: {
        ecmaVersion: 2020,
    },

    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        'vuejs-accessibility/form-control-has-label': 'off',
        'vuejs-accessibility/label-has-for': 'off',
        'vuejs-accessibility/click-events-have-key-events': 'off',
        'vue/no-mutating-props': 'off',
    },
};
