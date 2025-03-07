import React, { useEffect } from "react";
import { View, Text, ImageBackground } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Welcome");
    }, 2000);
  }, []);

  return (
    <DefaultLayot>
      <ImageBackground className = 'flex flex-1 bg-cover' source={require("../../../assets/imgs/splash.png")}>
        <View className = 'flex flex-1 justify-center items-center'>
          <Text className = 'text-cyan-500 text-[48px]'>My App</Text>
        </View>
      </ImageBackground>
    </DefaultLayot>
  );
};

export default SplashScreen;
