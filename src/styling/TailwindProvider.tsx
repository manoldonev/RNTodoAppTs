import React from 'react';
import { create } from 'twrnc';
import type { TailwindFn } from 'twrnc';
import { useActiveColorScheme } from './hooks/useActiveColorScheme';
import { DarkTheme, LightTheme } from './TailwindConfig';

const TailwindContext = React.createContext<TailwindFn | null>(null);

const TailwindProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const scheme = useActiveColorScheme();
  const tw = React.useMemo(
    () =>
      create({
        theme: scheme === 'dark' ? { ...DarkTheme } : { ...LightTheme },
      }),
    [scheme],
  );

  return <TailwindContext.Provider value={tw}>{children}</TailwindContext.Provider>;
};

export { TailwindProvider, TailwindContext };
