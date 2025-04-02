/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {}, // Change this to the correct PostCSS plugin
    autoprefixer: {},           // Make sure autoprefixer is added as well
  },
};

export default config;
