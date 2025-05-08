import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreenTeacher from "../../screens/teacher/HomeScreenTeacher";

const Stack = createStackNavigator();
function HomeStackNavigatorTeacher() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeMainTeacher"
        component={HomeScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ListTestTeacher"
        component={ListTestScreenTeacher}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackNavigatorTeacher;
