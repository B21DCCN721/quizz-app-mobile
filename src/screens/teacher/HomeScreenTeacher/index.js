import React from "react";
import { View, Text, ScrollView } from "react-native";
import DefaultLayout from "../../../layouts/DefaultLayout";
import ImgHome from "../../../../assets/imgs/imghome.svg";
import AvatarHomeTeacher from "../../../../assets/imgs/avatarhometeacher.svg";
import { CardNameGame } from "../../../components/Card";
import IconCardGame1 from "../../../../assets/icons/cardGame1.svg";
import IconCardGame2 from "../../../../assets/icons/cardGame2.svg";
import IconCardGame3 from "../../../../assets/icons/cardGame3.svg";

function HomeScreenTeacher({ navigation }) {
  return (
    <DefaultLayout>
      <ScrollView>
        <View className="flex items-center">
          <ImgHome />
        </View>
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
                Giáo viên
              </Text>
            </View>
            <AvatarHomeTeacher width="36px" height="36px" />
          </View>
        </View>
        <View className="flex flex-row justify-between items-center">
          <View>
            <Text className="font-interBold text-2xl">Bài học</Text>
            <Text className="font-interRegular">Các dạng bài</Text>
          </View>
        </View>
        <View>
          <CardNameGame
            title="Trò chơi trắc nghiệm"
            onClick={() =>
              navigation.navigate("ListTestTeacher", { mode: "tracnghiem" })
            }
          >
            <IconCardGame1 />
          </CardNameGame>
          <CardNameGame
            title="Trò chơi đoán màu"
            onClick={() =>
              navigation.navigate("ListTestTeacher", { mode: "tomau" })
            }
          >
            <IconCardGame2 />
          </CardNameGame>
          <CardNameGame
            title="Trò chơi đếm số"
            onClick={() =>
              navigation.navigate("ListTestTeacher", { mode: "demso" })
            }
          >
            <IconCardGame3 />
          </CardNameGame>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
}

export default HomeScreenTeacher;
