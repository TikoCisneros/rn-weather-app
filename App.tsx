import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

import { HomeScreen } from './src/screens';
import { colors } from './src/styles';
import { KeyboardAvoidingView } from 'react-native';

const Stack = createNativeStackNavigator();

/**
 * See more: https://blog.logrocket.com/keyboardawarescrollview-keyboardavoidingview-react-native/
 * https://www.netguru.com/blog/avoid-keyboard-react-native
 * */
function App() {
  return (
    <>
      <ExpoStatusBar style="auto" backgroundColor={colors.cyan500} />
      <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </>
  );
}

export default App;
