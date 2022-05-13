import { MMKVLoader, useMMKVStorage } from 'react-native-mmkv-storage';

const MMKV = new MMKVLoader().initialize();

const useStorage = <T = string>(
  key: string,
  defaultValue?: T,
): readonly [T | null | undefined, (value: T | ((prevValue: T | null | undefined) => T)) => void] => {
  const [value, setValue] = useMMKVStorage(key, MMKV, defaultValue);

  return [value, setValue] as const;
};

export { useStorage };
