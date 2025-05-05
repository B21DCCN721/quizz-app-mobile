import DefaultLayout from "../../layouts/DefaultLayout";
import ImgResult from "../../../assets/imgs/imgresult.svg";
import { View, Text } from "react-native";
import IconTrue from "../../../assets/icons/true.svg";
import IconFalse from "../../../assets/icons/false.svg";
import IconStar from "../../../assets/icons/star.svg";
import Button from "../../components/Button";
import { useSelector } from "react-redux";

function ResultScreen({ navigation }) {
  const  dataResult  = useSelector((state) => state.dataResultTest);
  return (
    <DefaultLayout>
      <ImgResult width="100%" />
      <View className="rounded-40 bg-[#FFF2E4] p-5 rounded-10">
        <View className="flex-row items-center mt-5">
          <Text className="flex-1 font-interBold text-3xl">Số câu đúng: {dataResult?.correctAnswers}</Text>
          <IconTrue />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Số câu sai: {dataResult?.totalQuestions - dataResult?.correctAnswers}</Text>
          <IconFalse />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Điểm: {dataResult?.submissionScore}</Text>
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
