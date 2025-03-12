import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../../screens/teacher/HomeScreen";

const Stack = createStackNavigator();
function HomeStackNavigatorTeacher() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMainTeacher"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigatorTeacher;
