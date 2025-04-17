import HeaderLayout from "../../layouts/HeaderLayout";
import ImgResult from "../../../assets/imgs/imgresult.svg";
import { View, Text, TouchableOpacity } from "react-native";
import IconTrue from "../../../assets/icons/true.svg";
import IconFalse from "../../../assets/icons/false.svg";
import IconStar from "../../../assets/icons/star.svg";
import IconDetail from "../../../assets/icons/detail.svg";
import Button from "../../components/Button";
import { Alert } from "react-native";
function HistoryResultScreen({ navigation }) {
  return (
    <HeaderLayout>
      <ImgResult width="100%" height="36%" />

      {/* Tiêu đề + IconDetail */}
      <View className="flex-row items-center justify-center my-5">
        <Text className="font-interBold text-[#9ED832] text-6xl text-center">
          Tên bài thi
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("HistoryDetail")}>
          <IconDetail width={50} height={50}  style={{ marginLeft: 16 }} />
        </TouchableOpacity>
      </View>

      {/* Kết quả */}
      <View className="rounded-40 bg-[#FFF2E4] p-5 rounded-10">
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Số câu đúng: 9</Text>
          <IconTrue />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Số câu sai: 1</Text>
          <IconFalse />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Điểm: 90</Text>
          <IconStar />
        </View>
      </View>

      {/* Nút Làm Lại */}
      <Button
        title="Làm lại"
        sxButton="mb-5 bg-red border border-b-[4px] border-b-[#343B6E] mt-auto"
        sxText="text-white text-2xl font-interBold"
        onClick={() =>
          Alert.alert(
            "Xác nhận",
            "Bạn có muốn làm lại không?",
            [
              {
                text: "Hủy",
                style: "cancel",
              },
              {
                text: "Làm lại",
                onPress: () => navigation.navigate("MultipleChoice"),
              },
            ]
          )
        }
      />
    </HeaderLayout>
  );
}

export default HistoryResultScreen;
