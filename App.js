import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import StackNavigator from "./src/navigations/StackNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
