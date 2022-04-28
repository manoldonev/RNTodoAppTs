import './jest.mock.types';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import { server } from './mocks/msw/server';

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
