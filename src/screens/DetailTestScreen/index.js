import HeaderLayout from "../../layouts/HeaderLayout";
import { ScrollView, Text, View, ActivityIndicator } from "react-native";
import ImgDetailTest from "../../../assets/imgs/imgdetailtest.svg";
import { CardDetail } from "../../components/Card";
import { useEffect, useState } from "react";
import axiosClient from "../../configs/axiosClient";

function DetailTestScreen({ route, navigation }) {
  const { mode, id } = route.params || {}; // lấy ra id bài test và thể loại
  const [infoTest, setInfoTest] = useState({});
  const [loading, setLoading] = useState(true);
  const handleStartTest = () => {
    switch (mode) {
      case "1":
        navigation.navigate("MultipleChoice", { mode: mode, id: id });
        break;
      case "2":
        break;
      case "3":
        break;
      default:
        break;
    }
  };
  // call api
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get(`/api/exercises/${id}?type=${mode}`)
        if (response.status === 200) {
          setInfoTest(response.data.exercise);
          setLoading(false);
        }
      } catch (error) {
        setError(err.response ? err.response.data : "Something went wrong at detail test screen");
      }
    }
    getData();
  }, []);
  if (loading) {
    return (
      <HeaderLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </HeaderLayout>
    );
  }
  return (
    <HeaderLayout>
      <ScrollView
        className=" flex-1"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex items-center">
          <ImgDetailTest width="328px" />
        </View>
        <CardDetail info={infoTest} onClickEnterExam={handleStartTest} />
        <View className="mt-5">
          <Text className="font-interBold text-xl">Mô tả bài thi:</Text>
          <Text className="font-interRegular">{infoTest.description === null ? "Chưa có mô tả nào cho bài thi." : infoTest.description}</Text>
        </View>
        <View className="bg-red h-[1000px] mt-5">
          <Text>KHU VỰC CHỨA COMMENT</Text>
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

export default DetailTestScreen;
