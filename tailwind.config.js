// NOTE: do not provide color values here -- use src/styling/themes instead
// placeholder config file so tailwindCSS vscode extension provides correct intellisense for the overwridden theme color keys (i.e. bg-primary vs bg-red-100 / bg-red-200, etc.)
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    colors: {
      primary: '',
      'on-primary': '',
      'on-primary-variant': '',
      'primary-container': '',
      'on-primary-container': '',
      secondary: '',
      'on-secondary': '',
      'secondary-container': '',
      'on-secondary-container': '',
      error: '',
      'on-error': '',
      'error-container': '',
      'on-error-container': '',
      background: '',
      'on-background': '',
      surface: '',
      'on-surface': '',
      outline: '',
    },
    extend: {},
  },
};
