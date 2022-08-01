import { useEffect } from 'react';
import { addEventListener } from '@react-native-community/netinfo';
import { onlineManager } from '@tanstack/react-query';

const useRefetchOnReconnect = (): void => {
  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      return addEventListener((state) => {
        setOnline(state.isConnected ?? undefined);
      });
    });
  }, []);
};

export { useRefetchOnReconnect };
