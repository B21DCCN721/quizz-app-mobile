import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreenTeacher from "../../screens/teacher/ProfileScreenTeacher";
import EditProfileScreenTeacher from "../../screens/teacher/EditProfileScreenTeacher";

const Stack = createStackNavigator();
function ProfileStackNavigatorTeacher() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMainTeacher"
        component={ProfileScreenTeacher}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="EditProfileTeacher"
        component={EditProfileScreenTeacher}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigatorTeacher;
