import React from 'react';
import type { TailwindFn } from 'twrnc';
import { create } from 'twrnc';
import { DarkTheme, LightTheme } from './Themes';
import { useActiveColorScheme } from './hooks/useActiveColorScheme';

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
