import React from "react";
import PublicStack from "./PublicStack";
import PrivateStack from "./PrivateStack";
import { useSelector } from "react-redux";

import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RoleScreen from "../screens/RoleScreen";
import LoginScreen from "../screens/LoginScreen";
import { SigupStudentScreen, SigupTeacherScreen } from "../screens/SigupScreen";
import StartScreen from "../screens/StartScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import BottomTabNavigatorTeacher from "./teacher/BottomTabNavigatorTeacher";
import MultipleChoiceTestScreen from "../screens/MultipleChoiceTestScreen";
import ResultScreen from "../screens/ResultScreen";

export default function StackNavigator() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated )

  return isAuthenticated ? <PrivateStack /> : <PublicStack />;
}
