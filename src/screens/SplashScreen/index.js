import React, { useEffect } from "react";
import { View, Text } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import SplashSvg from "../../../assets/imgs/splash.svg"; // Import SVG

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
  }, []);

  return (
    <DefaultLayot>
      {/* Đặt SVG làm nền */}
      <View className="flex flex-1">
        <SplashSvg style={{ position: "absolute" }} />

        {/* Nội dung */}
        <View className="flex flex-1 justify-center items-center">
          <Text className="text-cyan-500 text-[48px]">My App</Text>
        </View>
      </View>
    </DefaultLayot>
  );
};

export default SplashScreen;
