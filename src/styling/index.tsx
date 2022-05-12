// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import { useColorScheme } from 'react-native';
import type { TailwindFn } from 'twrnc';
import { create } from 'twrnc';
import { DarkTheme, LightTheme } from './themes';

const TailwindContext = React.createContext<TailwindFn | null>(null);

const TailwindProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const scheme = useColorScheme();
  const tw = React.useMemo(
    () =>
      create({
        theme: scheme === 'dark' ? { ...DarkTheme } : { ...LightTheme },
      }),
    [scheme],
  );

  return <TailwindContext.Provider value={tw}>{children}</TailwindContext.Provider>;
};

const useTailwind = (): TailwindFn => {
  const context = React.useContext(TailwindContext);
  if (context == null) {
    throw new Error('useTailwind must be used within a TailwindProvider');
  }

  return context;
};

export { TailwindProvider, useTailwind };
