import './jest.mock';
import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import 'react-native-url-polyfill/auto';
import 'whatwg-fetch';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock';
import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';
import { testServer as server } from './mocks/msw/server';

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

// Establish API mocking before all tests.
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
