import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// enables requests interception in node environment (jest tests)
export const testServer = setupServer(...handlers);
