import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RoleScreen from "../screens/RoleScreen";
import LoginScreen from "../screens/LoginScreen";
import { SigupStudentScreen, SigupTeacherScreen } from "../screens/SigupScreen";

const Stack = createStackNavigator();

export default function PublicStack() {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Role" component={RoleScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SigupTeacher" component={SigupTeacherScreen} />
      <Stack.Screen name="SigupStudent" component={SigupStudentScreen} />
    </Stack.Navigator>
  );
}
