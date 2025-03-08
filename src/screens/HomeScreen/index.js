import React from "react";
import { View, Text } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import ImgHome from "../../../assets/imgs/imghome.svg";
import AvatarHome from "../../../assets/imgs/avatarhome.svg";

export default function HomeScreen() {
  return (
    <DefaultLayot>
      <View className="flex flex-1 px-5 mt-5">
        <ImgHome />
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text>abc</Text>
          </View>
          <View className="flex flex-row items-center">
            <View>
              <Text className="font-interSemiBold text-right">
                ✋Xin chào, abc
              </Text>
              <Text className="font-interLight text-right">
                Học sinh khối 5
              </Text>
            </View>
            <AvatarHome width="36px" height="36px" />
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="font-interBold text-2xl">Bài học</Text>
            <Text className="font-interRegular">Chọn trò chơi</Text>
          </View>
          <AvatarHome width="36px" height="36px" />
        </View>
        <View className="bg-red flex-1"></View>
      </View>
    </DefaultLayot>
  );
}
