module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts'],
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
  moduleNameMapper: {
    '\\.png$': 'identity-obj-proxy',
    '^@components/(.*)': '<rootDir>/src/components/$1',
    '^@generated$': '<rootDir>/src/generated/index',
    '^@theming$': '<rootDir>/src/theming/index',
  },
  transformIgnorePatterns: ['node_modules/(?!(jest-)?@?react-native|@react-native-community|@react-navigation)'],
};
