import React from "react";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_600SemiBold, Inter_300Light, Inter_500Medium } from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import StackNavigator from "./src/navigations/StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
    InterSemiBold: Inter_600SemiBold,
    InterLight: Inter_300Light,
    InterMedium: Inter_500Medium,
  });
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
