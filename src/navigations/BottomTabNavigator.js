import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import LessonScreen from "../screens/LessonScreen";
import RankScreen from "../screens/RankScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Text } from "react-native";
import IconHouseActive from "../../assets/icons/houseActive.svg";
import IconHouseInActive from "../../assets/icons/houseInActive.svg";
import IconLessonActive from "../../assets/icons/lessonActive.svg";
import IconLessonInActive from "../../assets/icons/lessonInActive.svg";
import IconRankingActive from "../../assets/icons/rankingActive.svg";
import IconRankingInActive from "../../assets/icons/rankingInActive.svg";
import IconProfileActive from "../../assets/icons/profileActive.svg";
import IconProfileInActive from "../../assets/icons/profileInActive.svg";

/*
thanh bottom tab điều hướng các tab
*/

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ size, focused }) => {
          if (route.name === "Home") {
            return focused ? <IconHouseActive width={size} height={size} /> : <IconHouseInActive width={size} height={size} />;
          } else if (route.name === "Lesson") {
            return focused ? <IconLessonActive width={size} height={size} /> : <IconLessonInActive width={size} height={size} />;
          } else if (route.name === "Rank") {
            return focused ? <IconRankingActive width={size} height={size} /> : <IconRankingInActive width={size} height={size} />;
          } else if (route.name === "Profile") {
            return focused ? <IconProfileActive width={size} height={size} /> : <IconProfileInActive width={size} height={size} />;
          };
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarLabel: () => {
          // Set tab label text
          if (route.name === "Home") return <Text style={{ fontFamily: "Inter-Regular" }}>Trang chủ</Text>;
          if (route.name === "Lesson") return <Text style={{ fontFamily: "Inter-Regular" }}>Bài thi</Text>;
          if (route.name === "Rank") return <Text style={{ fontFamily: "Inter-Regular" }}>Xếp hạng</Text>;
          if (route.name === "Profile") return <Text style={{ fontFamily: "Inter-Regular" }}>Hồ sơ</Text>;
        },
        tabBarStyle: {
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ popToTopOnBlur: true }} />
      <Tab.Screen name="Lesson" component={LessonScreen} />
      <Tab.Screen name="Rank" component={RankScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
