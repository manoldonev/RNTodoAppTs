import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { renderUnderlay } from './utils';

const useThemedStyles = (): { underlayContainer: ViewStyle } => {
  const { colors } = useTheme();

  return React.useMemo(
    () =>
      StyleSheet.create({
        underlayContainer: {
          backgroundColor: colors.notification,
          flex: 1,
          justifyContent: 'center',
        },
      }),
    [colors],
  );
};

const SwipeToAction = ({
  children,
  onSwiped,
}: {
  children: React.ReactNode;
  onSwiped?: ((direction: 'left' | 'right') => void) | undefined;
}): JSX.Element => {
  const { width: screenWidth } = useWindowDimensions();
  const styles = useThemedStyles();

  return (
    <Swipeable
      renderLeftActions={renderUnderlay(screenWidth, styles.underlayContainer)}
      renderRightActions={renderUnderlay(screenWidth, styles.underlayContainer, 'right')}
      rightThreshold={screenWidth / 4}
      leftThreshold={screenWidth / 4}
      onSwipeableOpen={onSwiped}
    >
      {children}
    </Swipeable>
  );
};

export { SwipeToAction };
