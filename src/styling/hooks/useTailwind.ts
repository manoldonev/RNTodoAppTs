import React from 'react';
import type { TailwindFn } from 'twrnc';
import { TailwindContext } from '../TailwindProvider';

const useTailwind = (): TailwindFn => {
  const context = React.useContext(TailwindContext);
  if (context == null) {
    throw new Error('useTailwind must be used within a TailwindProvider');
  }

  return context;
};

export { useTailwind };
