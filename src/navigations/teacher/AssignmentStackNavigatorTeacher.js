import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AssignmentsScreenTeacher from "../../screens/teacher/AssignmentsScreenTeacher";
import CreateAssignmentScreenTeacher from "../../screens/teacher/CreateAssignmentScreenTeacher";
import CreateColorGameScreenTeacher from "../../screens/teacher/CreateColorGameScreenTeacher";
import CreateNumberGameScreenTeacher from "../../screens/teacher/CreateNumberGameScreenTeacher";
import CreateQuizScreenTeacher from "../../screens/teacher/CreateQuizScreenTeacher";
import AssignmentOverviewScreenTeacher from "../../screens/teacher/AssignmentOverviewScreenTeacher";
import SubmissionScreenTeacher from "../../screens/teacher/SubmissionScreenTeacher";
import SubmissionDetailScreenTeacher from "../../screens/teacher/SubmissionDetailScreenTeacher";
import EditQuizScreenTeacher from "../../screens/teacher/EditQuizTeacher";
import EditCountingScreenTeacher from "../../screens/teacher/EditCountingTeacher";
import EditColorGameScreenTeacher from "../../screens/teacher/EditColorTeacher";
import AssigntmentDetailScreenTeacher from "../../screens/teacher/AssigmentDetailScreenTeacer";

const Stack = createStackNavigator();

function AssignmentStackNavigatorTeacher() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Assignments"
        component={AssignmentsScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAssignment"
        component={CreateAssignmentScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateQuiz"
        component={CreateQuizScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateColorGame"
        component={CreateColorGameScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateNumberGame"
        component={CreateNumberGameScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssignmentOverview"
        component={AssignmentOverviewScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AssignmentDetailScreen"
        component={AssigntmentDetailScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubmissionScreen"
        component={SubmissionScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubmissionDetailScreen"
        component={SubmissionDetailScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditQuizScreen"
        component={EditQuizScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditNumberScreen"
        component={EditCountingScreenTeacher}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditColorScreen"
        component={EditColorGameScreenTeacher}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AssignmentStackNavigatorTeacher;
