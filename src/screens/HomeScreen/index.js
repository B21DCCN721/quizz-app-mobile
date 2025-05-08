import React from "react";
import { View, Text, ScrollView, ActivityIndicator, Image } from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import ImgHome from "../../../assets/imgs/imghome.svg";
import { CardNameGame } from "../../components/Card";
import IconCardGame1 from "../../../assets/icons/cardGame1.svg";
import IconCardGame2 from "../../../assets/icons/cardGame2.svg";
import IconCardGame3 from "../../../assets/icons/cardGame3.svg";
import { useState, useEffect } from "react";
import axiosClient from "../../configs/axiosClient";
import { useIsFocused } from "@react-navigation/native";

export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("VoCucThienTon");
  const [score, setScore] = useState(0);
  const [grade, setGrade] = useState(1);
  const [avatarUri, setAvatarUri] = useState(
    require("../../../assets/imgs/avatar.png")
  );
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  // call api
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get("/api/auth/profile");
        if (response.status === 200) {
          setName(response.data.user.name);
          setScore(response.data.user.score);
          setGrade(response.data.user.grade);
          const avatarFromServer = response.data.user.avatar;
          if (avatarFromServer !== null) {
            setAvatarUri({ uri: avatarFromServer }); // 👉 base64 URI từ backend
          } else {
            setAvatarUri(require("../../../assets/imgs/avatar.png")); // fallback ảnh mặc định
          }
          setLoading(false);
        }
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };
    getData();
  }, [isFocused]);
  if (loading) {
    return (
      <DefaultLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </DefaultLayout>
    );
  }
  return (
    <DefaultLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex items-center">
          <ImgHome />
        </View>
        <View className="flex flex-row justify-between items-center mb-3">
          <View className="flex flex-row items-center">
            <Text className="font-interRegular">
              Điểm số:
            </Text>
            <Text className="font-interBold">
              {score}
            </Text>
          </View>
          <View className="flex flex-row items-center">
            <View>
              <Text className="font-interSemiBold text-right">
                ✋Xin chào, {name}
              </Text>
              <Text className="font-interLight text-right">
                Học sinh khối {grade}
              </Text>
            </View>
            <Image
              className="w-[36px] h-[36px] rounded-full border border-pink"
              source={avatarUri}
            />
          </View>
        </View>
        <View>
          <Text className="font-interBold text-2xl">Bài học</Text>
          <Text className="font-interRegular">Chọn trò chơi</Text>
        </View>
        <View>
          <CardNameGame
            title="Trò chơi trắc nghiệm"
            onClick={() => navigation.navigate("ListTest", { mode: "1" })}
          >
            <IconCardGame1 />
          </CardNameGame>
          <CardNameGame
            title="Trò chơi đoán màu"
            onClick={() => navigation.navigate("ListTest", { mode: "3" })}
          >
            <IconCardGame2 />
          </CardNameGame>
          <CardNameGame
            title="Trò chơi đếm số"
            onClick={() => navigation.navigate("ListTest", { mode: "2" })}
          >
            <IconCardGame3 />
          </CardNameGame>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
}
