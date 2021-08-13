/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

module.exports = {
    purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            filter: ['dark'],
            invert: ['dark'],
            display: ['dark'],
        },
    },
    plugins: [
        require('@tailwindcss/forms')({
            strategy: 'class',
        }),
    ],
};
