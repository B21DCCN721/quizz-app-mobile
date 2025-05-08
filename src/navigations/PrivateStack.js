import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import StartScreen from "../screens/StartScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import BottomTabNavigatorTeacher from "./teacher/BottomTabNavigatorTeacher";
import MultipleChoiceTestScreen from "../screens/MultipleChoiceTestScreen";
import CountingTestScreen from "../screens/CountingTestScreen";
import ColorTestScreen from "../screens/ColorTestScreen";
import ResultScreen from "../screens/ResultScreen";
const Stack = createStackNavigator();

export default function PrivateStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="MainTeacher" component={BottomTabNavigatorTeacher} />
      <Stack.Screen name="MultipleChoice" component={MultipleChoiceTestScreen} />
      <Stack.Screen name="Counting" component={CountingTestScreen} />
      <Stack.Screen name="Color" component={ColorTestScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
}
