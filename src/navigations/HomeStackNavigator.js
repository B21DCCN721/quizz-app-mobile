import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ListTestScreen from "../screens/ListTestScreen";
import DetailTestScreen from "../screens/DetailTestScreen";

/*
stack ứng với tab home
*/
const Stack = createStackNavigator();

export default function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeMain" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ListTest" component={ListTestScreen} options={{ headerShown: false }} />
      <Stack.Screen name="DetailTest" component={DetailTestScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
