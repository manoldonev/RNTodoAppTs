import type { ColorSchemeName } from 'react-native';
import { useColorScheme } from 'react-native';
import { useAppColorScheme } from './useAppColorScheme';

const useActiveColorScheme = (): ColorSchemeName => {
  const preferredScheme = useColorScheme();
  const [appScheme] = useAppColorScheme();

  return appScheme ?? preferredScheme;
};

export { useActiveColorScheme };
