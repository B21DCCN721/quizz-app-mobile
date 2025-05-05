import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigatorTeacher from "./HomeStackNavigatorTeacher";
import AssignmentStackNavigatorTeacher from "./AssignmentStackNavigatorTeacher";
import NoticeScreenTeacher from "../../screens/teacher/NoticeScreenTeacher";
import ProfileStackNavigatorTeacher from "./ProfileStackNavigatorTeacher";
import { Text } from "react-native";
import IconHouseActive from "../../../assets/icons/houseActive.svg";
import IconHouseInActive from "../../../assets/icons/houseInActive.svg";
import IconLessonActive from "../../../assets/icons/lessonActive.svg";
import IconLessonInActive from "../../../assets/icons/lessonInActive.svg";
import IconProfileActive from "../../../assets/icons/profileActive.svg";
import IconProfileInActive from "../../../assets/icons/profileInActive.svg";
import IconNoticeActive from "../../../assets/icons/noticeActive.svg";
import IconNoticeInActive from "../../../assets/icons/noticeInActive.svg";

/*
thanh bottom tab điều hướng các tab
*/

const Tab = createBottomTabNavigator();

export default function BottomTabNavigatorTeacher() {

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, focused }) => {
          if (route.name === "HomeTeacher") {
            return focused ? <IconHouseActive width={size} height={size} /> : <IconHouseInActive width={size} height={size} />;
          } else if (route.name === "AssignmentsList") {
            return focused ? <IconLessonActive width={size} height={size} /> : <IconLessonInActive width={size} height={size} />;
          }else if (route.name === "NoticeTeacher") {
            return focused ? <IconNoticeActive width={size} height={size} /> : <IconNoticeInActive width={size} height={size} />;
          } else if (route.name === "ProfileTeacher") {
            return focused ? <IconProfileActive width={size} height={size} /> : <IconProfileInActive width={size} height={size} />;
          }
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => {
          // Set tab label text
          if (route.name === "HomeTeacher") return <Text style={{ fontFamily: "Inter-Regular" }}>Trang chủ</Text>;
          if (route.name === "AssignmentsList") return <Text style={{ fontFamily: "Inter-Regular" }}>Bài tập</Text>;
          if (route.name === "NoticeTeacher") return <Text style={{ fontFamily: "Inter-Regular" }}>Thông báo</Text>;
          if (route.name === "ProfileTeacher") return <Text style={{ fontFamily: "Inter-Regular" }}>Hồ sơ</Text>;
        },
        tabBarStyle: {
          height: 60,
        },
      })}
    >
      <Tab.Screen name="HomeTeacher" component={HomeStackNavigatorTeacher} options={{ popToTopOnBlur: true }} />
      <Tab.Screen name="AssignmentsList" component={AssignmentStackNavigatorTeacher} options={{ popToTopOnBlur: true }} />
      <Tab.Screen name="NoticeTeacher" component={NoticeScreenTeacher} />
      <Tab.Screen name="ProfileTeacher" component={ProfileStackNavigatorTeacher} options={{ popToTopOnBlur: true }} />
    </Tab.Navigator>
  );
}
