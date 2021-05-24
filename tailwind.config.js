const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? 'build' : 'watch';

module.exports = {
    prefix: '',
    mode: 'jit',
    purge: {
      content: [
        './src/**/*.{html,ts,css,scss,sass,less,styl}',
      ]
    },
    darkMode: 'class', // or 'media' or 'class'
    theme: {
      fontFamily: {
        'narrow': ['PT Sans Narrow'],
       },
       screens: {
        'sm':'640px',
        'md':'768px',
        'minMD': '700px',
        'minLG':'1010px',
        'lg':'1024px',
        'xl':'1280px',
        '2xl':'1536px'
      },
      extend: {},
    },
    variants: {
      extend: {},
    },
    plugins: [],
};
