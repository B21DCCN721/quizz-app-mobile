import DefaultLayout from "../../layouts/DefaultLayout";
import ImgResult from "../../../assets/imgs/imgresult.svg";
import { View, Text } from "react-native";
import IconTrue from "../../../assets/icons/true.svg";
import IconFalse from "../../../assets/icons/false.svg";
import IconStar from "../../../assets/icons/star.svg";

function ResultScreen() {
  return (
    <DefaultLayout>
      <ImgResult />
      <Text className="font-interBold text-[#9ED832] text-6xl text-center">
        Tên bài thi
      </Text>
      <View className="rounded-40 bg-[#FFF2E4] p-5">
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Số câu đúng: 9</Text>
          <IconTrue />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Số câu đúng: 1</Text>
          <IconFalse />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Điểm: 90</Text>
          <IconStar />
        </View>
      </View>
      <Button
        title="Hoàn tất"
        sxButton="mb-5 bg-red border border-b-[4px] border-b-[#343B6E]"
        sxText="text-white text-2xl font-interBold"
      />
    </DefaultLayout>
  );
}

export default ResultScreen;
