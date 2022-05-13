import { useColorScheme } from 'react-native';
import type { ColorScheme } from './useAppColorScheme';
import { useAppColorScheme } from './useAppColorScheme';

const useActiveColorScheme = (): ColorScheme => {
  const preferredScheme = useColorScheme();
  const [appScheme] = useAppColorScheme();

  return appScheme ?? preferredScheme ?? undefined;
};

export { useActiveColorScheme };
