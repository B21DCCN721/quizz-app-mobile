import Button from "../../../components/Button";
import { ScrollView, Text, View } from "react-native";
import IconSetting from "../../../../assets/icons/setting.svg";
import AvatarTeacher from "../../../../assets/imgs/avatarteacher.svg";
import ArrowRight from "../../../../assets/icons/arrowRight.svg";
import ArrowUp from "../../../../assets/icons/arrowUp.svg";
import HeaderLayout from "../../../layouts/HeaderLayout";

function StatisticalScreenTeacher() {
  return (
    <HeaderLayout>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex flex-row justify-between">
          <Text className="font-interSemiBold text-2xl text-orange">
            Tài khoản
          </Text>
          <IconSetting />
        </View>
        <View className="my-5 flex flex-row items-center">
          <AvatarTeacher width="120px" height="120px" />
          <View className="ms-20">
            <Text className="font-interSemiBold text-xl">Cơ vô Cực</Text>
            <Text className="font-interRegular text-sm text-gray-500">
              Giáo viên
            </Text>
          </View>
        </View>
        <View>
          <Text className="font-interRegular text-lg">Thống kê hôm nay:</Text>
          <Button
            title="Bài tập của tôi: 36"
            sxButton="mx-2 mt-5 bg-yellow-3 flex flex-row justify-between items-center rounded-30"
            sxText="font-interSemiBold text-xl mx-5"
            disabled={true}
          >
            <View className="flex flex-row items-center"><ArrowUp/><Text className="font-interSemiBold text-xl mr-5">50</Text></View>
          </Button>
          <Button
            title="Số lượt làm: 140"
            sxButton="mx-2 mt-5 bg-orange-2 flex flex-row justify-between items-center rounded-30"
            sxText="font-interSemiBold text-xl mx-5"
            disabled={true}
          >
            <View className="flex flex-row items-center"><ArrowUp/><Text className="font-interSemiBold text-xl mr-5">50</Text></View>
          </Button>
          <Button
            title="Xem chi tiết"
            sxButton="mx-2 mt-10 bg-red flex flex-row justify-center items-center rounded-30"
            sxText="font-interSemiBold text-white mr-5"
          >
            <ArrowRight/>
          </Button>
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

export default StatisticalScreenTeacher;