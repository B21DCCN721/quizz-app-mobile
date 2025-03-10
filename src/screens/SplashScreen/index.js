import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SplashSvg from "../../../assets/imgs/splash.svg"; // Import SVG

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
  }, []);

  return (
    <SafeAreaView className="flex flex-1 bg-white">
      {/* Đặt SVG làm nền */}
      <View className="flex flex-1 bg-white">
        <View className="flex flex-1">
          <SplashSvg style={{ position: "absolute" }} />
  
          {/* Nội dung */}
          <View className="flex flex-1 justify-center items-center">
            <Text className="text-cyan-500 text-[48px]">My App</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
