import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import ImgHome from "../../../assets/imgs/imghome.svg";
import AvatarHome from "../../../assets/imgs/avatarhome.svg";
import { CardNameGame } from "../../components/Card";
import IconCardGame1 from "../../../assets/icons/cardGame1.svg";

export default function HomeScreen() {
  return (
    <DefaultLayot>
      <ScrollView className="px-5 mt-5">
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
        <View>
            <CardNameGame title="Trò chơi trắc nghiệm" onClick={() => alert('Halo cường giả âm hư dương thực')}><IconCardGame1/></CardNameGame>
            <CardNameGame/>
            <CardNameGame/>
        </View>
      </ScrollView>
    </DefaultLayot>
  );
}
