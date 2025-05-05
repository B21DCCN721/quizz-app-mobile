import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreen from "../screens/ProfileScreen";
import History from "../screens/HistoryScreen";
import HistoryResult from "../screens/HistoryResultScreen"
import HistoryDetail from "../screens/HistoryDetailScreen";
/*
stack ứng với tab profile
*/
const Stack = createStackNavigator();

export default function ProfileStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
      <Stack.Screen name="HistoryResult" component={HistoryResult} options={{ headerShown: false }}/>
      <Stack.Screen name="HistoryDetail" component={HistoryDetail} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
}
