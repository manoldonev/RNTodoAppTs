import { useEffect } from 'react';
import type { AppStateStatus } from 'react-native';
import { AppState } from 'react-native';

const useAppState = ({ onChange }: { onChange: (status: AppStateStatus) => void }): void => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      onChange(nextAppState);
    });

    return () => {
      subscription.remove();
    };
  }, [onChange]);
};

export { useAppState };
