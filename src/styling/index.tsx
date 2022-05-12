// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import React from 'react';
import type { ColorSchemeName } from 'react-native';
import { useColorScheme } from 'react-native';
import type { TailwindFn, TwConfig } from 'twrnc';
import { create } from 'twrnc';
import tailwidConfig from '../../tailwind.config';
import { DarkTheme, LightTheme } from './themes';

const TailwindContext = React.createContext<TailwindFn | null>(null);

const themeableCreate = (scheme: ColorSchemeName): TailwindFn => {
  const twConfig = { ...tailwidConfig } as TwConfig;
  if (twConfig.theme != null) {
    throw new Error("Do not provide 'theme' key in tailwind.config.js");
  }

  if (scheme === 'dark') {
    twConfig.theme = {
      ...DarkTheme,
    };
  } else {
    twConfig.theme = {
      ...LightTheme,
    };
  }

  return create(twConfig);
};

const TailwindProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const scheme = useColorScheme();
  const tw = React.useMemo(() => themeableCreate(scheme), [scheme]);

  return <TailwindContext.Provider value={tw}>{children}</TailwindContext.Provider>;
};

const useTailwind = (): TailwindFn => {
  const context = React.useContext(TailwindContext);
  if (context == null) {
    throw new Error('useTailwind must be within a TailwindProvider');
  }

  return context;
};

export { TailwindProvider, useTailwind };
