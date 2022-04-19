import type { AppStateStatus } from 'react-native';
import { Platform } from 'react-native';
import { focusManager } from 'react-query';
import { useAppState } from './useAppState';

const onAppStateChange = (status: AppStateStatus): void => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
};

const useRefetchOnAppFocus = (): void => {
  useAppState({
    onChange: onAppStateChange,
  });
};

export { useRefetchOnAppFocus };
