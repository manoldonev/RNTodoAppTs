module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [['module:react-native-dotenv', { safe: true, allowUndefined: false }]],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
