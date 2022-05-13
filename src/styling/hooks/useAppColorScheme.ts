import { useMMKVString } from 'react-native-mmkv';

const useAppColorScheme = (): readonly [
  ColorScheme,
  (value: ColorScheme | ((current: ColorScheme) => ColorScheme) | undefined) => void,
] => {
  const [appScheme, setAppScheme] = useMMKVString('color.scheme');

  return [
    appScheme as ColorScheme,
    setAppScheme as (value: ColorScheme | ((current: ColorScheme) => ColorScheme) | undefined) => void,
  ] as const;
};

export type ColorScheme = 'light' | 'dark' | undefined;
export { useAppColorScheme };
