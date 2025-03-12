import HeaderLayout from "../../layouts/HeaderLayout";
import { ScrollView, Text, View } from "react-native";
import ImgDetailTest from "../../../assets/imgs/imgdetailtest.svg";
import { CardDetail } from "../../components/Card";

function DetailTestScreen({ route }) {
  const info = {
    id: 1,
    name: "abc",
    code: "ABC",
    quantity: 10,
    grade: 5,
    category: "trắc nghiệm",
  };
  const { mode, id } = route.params || {}; // lấy ra id bài test và thể loại
  return (
    <HeaderLayout>
      <ScrollView className=" flex-1" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
        <View className="flex items-center">
          <ImgDetailTest width="328px" />
        </View>
        <Text>Id thật bài test: {id}</Text>
        <CardDetail info={info} />
        <View className="bg-red h-[1000px] mt-5">
            <Text>KHU VỰC CHỨA COMMENT</Text>
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

export default DetailTestScreen;
