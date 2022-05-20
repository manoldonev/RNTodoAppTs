import { setupServer } from 'msw/native';
import { handlers } from './handlers';

// enables requests interception in React Native
export const nativeServer = setupServer(...handlers);
