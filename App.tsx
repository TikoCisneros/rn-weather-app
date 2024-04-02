import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

import { HomeScreen } from './src/screens';
import { colors } from './src/styles';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <>
      <ExpoStatusBar style="auto" backgroundColor={colors.cyan500} />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
