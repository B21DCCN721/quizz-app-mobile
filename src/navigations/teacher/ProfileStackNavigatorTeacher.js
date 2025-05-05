import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileScreenTeacher from "../../screens/teacher/ProfileScreenTeacher";
import StatisticalScreenTeacher from "../../screens/teacher/StatisticalScreenTeacher";
import EditProfileScreenTeacher from "../../screens/teacher/EditProfileScreenTeacher";
import ChangePasswordScreenTeacher from "../../screens/teacher/ChangePasswordScreenTeacher";

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
        name="StatisticalTeacher"
        component={StatisticalScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfileTeacher"
        component={EditProfileScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePasswordTeacher"
        component={ChangePasswordScreenTeacher}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default ProfileStackNavigatorTeacher;
