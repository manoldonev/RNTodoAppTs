import React from 'react';
import { create } from 'twrnc';
import type { TailwindFn } from 'twrnc';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { useActiveColorScheme } from './hooks/useActiveColorScheme';
import { DarkTheme, LightTheme } from '../tailwind.config';

const TailwindContext = React.createContext<TailwindFn | null>(null);

const ThemingProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const scheme = useActiveColorScheme();
  const tw = React.useMemo(
    () =>
      create({
        theme: scheme === 'dark' ? { ...DarkTheme } : { ...LightTheme },
      }),
    [scheme],
  );

  const paperTheme = React.useMemo(
    () => ({
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        primary: tw.color('primary') ?? DefaultTheme.colors.primary,
        accent: tw.color('secondary') ?? DefaultTheme.colors.accent,
        background: tw.color('background') ?? DefaultTheme.colors.background,
        surface: tw.color('surface') ?? DefaultTheme.colors.surface,
        text: tw.color('on-primary') ?? DefaultTheme.colors.text,
        onSurface: tw.color('on-surface') ?? DefaultTheme.colors.onSurface,
        error: tw.color('error') ?? DefaultTheme.colors.error,
      },
    }),
    [tw],
  );

  return (
    <TailwindContext.Provider value={tw}>
      <PaperProvider theme={paperTheme}>{children}</PaperProvider>
    </TailwindContext.Provider>
  );
};

export { ThemingProvider, TailwindContext };
