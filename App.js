import React from "react";
import { useFonts, Inter_400Regular, Inter_700Bold, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import StackNavigator from "./src/navigations/StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [fontsLoaded] = useFonts({
    InterRegular: Inter_400Regular,
    InterBold: Inter_700Bold,
    InterSemiBold: Inter_600SemiBold,
  });
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
