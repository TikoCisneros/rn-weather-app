import { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { UILinearGradient, UISafeAreaView } from './NativeWind';

import { colors } from '../../styles';
import { isAndroid } from '../../utils/platform';

const GradientContainer = ({ children }: PropsWithChildren) => {
  return (
    <UILinearGradient colors={[colors.cyan500, colors.blue500]} className="flex-1">
      <UISafeAreaView className="flex-1" style={styles.notch}>
        {children}
      </UISafeAreaView>
    </UILinearGradient>
  );
};

const styles = StyleSheet.create({
  notch: {
    paddingTop: isAndroid() ? StatusBar.currentHeight : 0,
  },
});

export default GradientContainer;
