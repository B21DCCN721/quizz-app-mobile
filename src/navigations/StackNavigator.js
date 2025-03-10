import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RoleScreen from "../screens/RoleScreen";
import LoginScreen from "../screens/LoginScreen";
import { SigupStudentScreen, SigupTeacherScreen } from "../screens/SigupScreen";
import StartScreen from "../screens/StartScreen";
import BottomTabNavigator from "./BottomTabNavigator";


/*
main stack của app
*/
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Role"
          component={RoleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigupTeacher"
          component={SigupTeacherScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SigupStudent"
          component={SigupStudentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Start"
          component={StartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
  );
}
