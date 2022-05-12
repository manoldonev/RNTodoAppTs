// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { StatusBarProps } from 'react-native';
import { StatusBar } from 'react-native';

// NOTE: see https://reactnavigation.org/docs/status-bar/#tabs-and-drawer
const FocusAwareStatusBar = (props: StatusBarProps): JSX.Element | null => {
  const isFocused = useIsFocused();

  // eslint-disable-next-line react/jsx-props-no-spreading
  return isFocused ? <StatusBar {...props} /> : null;
};

export { FocusAwareStatusBar };
