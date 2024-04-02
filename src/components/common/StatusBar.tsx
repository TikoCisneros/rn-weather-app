import { Platform, StyleSheet, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const EXTRA_HEIGHT = 10;
/**
 * Use this component to add a status bar to the app when apply SafeAreaView Globally.
 * @returns Status bar component
 */
const StatusBar = ({ color }: { color: string }) => {
  return (
    <>
      <ExpoStatusBar style="auto" backgroundColor={color} />
      {Platform.OS === 'ios' && <View style={{ ...styles.container, backgroundColor: color }}></View>}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Constants.statusBarHeight + EXTRA_HEIGHT,
    position: 'absolute',
    top: 0,
  },
});

export default StatusBar;
