import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import NoticeScreen from "../screens/NoticeScreen";
import RankScreen from "../screens/RankScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { Text } from "react-native";
import IconHouseActive from "../../assets/icons/houseActive.svg";
import IconHouseInActive from "../../assets/icons/houseInActive.svg";
import IconNoticeActive from "../../assets/icons/noticeActive.svg";
import IconNoticeInActive from "../../assets/icons/noticeInActive.svg";
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
          } else if (route.name === "Notice") {
            return focused ? <IconNoticeActive width={size} height={size} /> : <IconNoticeInActive width={size} height={size} />;
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
          if (route.name === "Notice") return <Text style={{ fontFamily: "Inter-Regular" }}>Thông báo</Text>;
          if (route.name === "Rank") return <Text style={{ fontFamily: "Inter-Regular" }}>Xếp hạng</Text>;
          if (route.name === "Profile") return <Text style={{ fontFamily: "Inter-Regular" }}>Hồ sơ</Text>;
        },
        tabBarStyle: {
          height: 60,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} options={{ popToTopOnBlur: true }} />
      <Tab.Screen name="Notice" component={NoticeScreen} />
      <Tab.Screen name="Rank" component={RankScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
