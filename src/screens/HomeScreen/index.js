import React from "react";
import { View, Text, ScrollView } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import ImgHome from "../../../assets/imgs/imghome.svg";
import AvatarHome from "../../../assets/imgs/avatarhome.svg";
import { CardNameGame } from "../../components/Card";
import IconCardGame1 from "../../../assets/icons/cardGame1.svg";

export default function HomeScreen({navigation}) {
  return (
    <DefaultLayout>
      <ScrollView>
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
            <CardNameGame title="Trò chơi trắc nghiệm" onClick={() => navigation.navigate("ListTest", { mode: 1 })}><IconCardGame1/></CardNameGame>
            <CardNameGame/>
            <CardNameGame/>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
}
