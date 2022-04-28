module.exports = {
  preset: 'react-native',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node', 'd.ts'],
  setupFilesAfterEnv: ['./src/jest.setup.ts'],
};
