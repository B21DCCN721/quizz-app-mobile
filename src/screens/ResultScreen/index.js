import DefaultLayout from "../../layouts/DefaultLayout";
import ImgResult from "../../../assets/imgs/imgresult.svg";
import { View, Text } from "react-native";
import IconTrue from "../../../assets/icons/true.svg";
import IconFalse from "../../../assets/icons/false.svg";
import IconStar from "../../../assets/icons/star.svg";
import Button from "../../components/Button";

function ResultScreen({ navigation }) {
  return (
    <DefaultLayout>
      <ImgResult width="100%" />
      <Text className="font-interBold text-[#9ED832] text-6xl text-center my-5">
        Tên bài thi
      </Text>
      <View className="rounded-40 bg-[#FFF2E4] p-5 rounded-10">
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
        sxButton="mb-5 bg-red border border-b-[4px] border-b-[#343B6E] mt-auto"
        sxText="text-white text-2xl font-interBold"
        onClick={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }],
          })
        }
      />
    </DefaultLayout>
  );
}

export default ResultScreen;
