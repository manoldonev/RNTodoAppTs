import type { ColorSchemeName } from 'react-native';
import { useStorage } from '../../hooks/useStorage';

const useAppColorScheme = (): readonly [
  ColorSchemeName,
  (value: ColorSchemeName | ((prevValue: ColorSchemeName) => ColorSchemeName)) => void,
] => {
  const [appScheme, setAppScheme] = useStorage<ColorSchemeName>('color-scheme', null);

  return [appScheme, setAppScheme];
};

export { useAppColorScheme };
