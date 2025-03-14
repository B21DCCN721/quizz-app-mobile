import { ScrollView, View, Text } from "react-native";
import IconSetting from "../../../../assets/icons/setting.svg";
import AvatarTeacher from "../../../../assets/imgs/avatarteacher.svg";
import Button from "../../../components/Button";
import IconChevronRight from "../../../../assets/icons/chevronRight.svg";
import IconChevronBottom from "../../../../assets/icons/chevronBottom.svg";
import IconEditProfile from "../../../../assets/icons/editProfile.svg";
import IconLogoutTeacher from "../../../../assets/icons/logoutTeacher.svg";
import IconAbout from "../../../../assets/icons/about.svg";
import IconHelp from "../../../../assets/icons/help.svg";
import IconContact from "../../../../assets/icons/contact.svg";
import IconThongKe from "../../../../assets/icons/thongKe.svg";
import { useState } from "react";
import DefaultLayout from "../../../layouts/DefaultLayout";

function ProfileScreenTeacher({ navigation }) {
  const [about, setAbout] = useState(false);
  const [help, setHelp] = useState(false);
  const [contact, setContact] = useState(false);
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Welcome" }],
    });
  };
  const handleEditProfile = () => {
    navigation.navigate("EditProfileTeacher");
  };
  return (
    <DefaultLayout>
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
              Chu Tước Tử
            </Text>
          </View>
        </View>
        {/* Các option của màn hình */}
        <View className="flex flex-row items-center border-b border-grayBorder">
          <IconEditProfile width="30px" height="30px" />
          <Button
            title="Chỉnh sửa hồ sơ"
            sxText="font-interSemiBold"
            sxButton="flex flex-row justify-between flex-1"
            onClick={handleEditProfile}
          >
            <IconChevronRight />
          </Button>
        </View>
        <View className="flex flex-row items-center border-b border-grayBorder">
          <IconThongKe width="30px" height="30px" />
          <Button
            title="Thống kê"
            sxText="font-interSemiBold"
            sxButton="flex flex-row justify-between flex-1"
            onClick={() => navigation.navigate("StatisticalTeacher")}
          >
            <IconChevronRight />
          </Button>
        </View>
        <View className="flex border-b border-grayBorder">
          <View className="flex flex-row items-center">
            <IconAbout width="30px" height="30px" />
            <Button
              title="Về chúng tôi"
              sxText="font-interSemiBold"
              sxButton="flex flex-row justify-between items-center flex-1"
              onClick={() => setAbout((prev) => !prev)}
            >
              {about ? <IconChevronBottom height="30px" /> : <IconChevronRight height="30px" />}
            </Button>
          </View>

          {about && (
            <Text className="ml-5 mb-2 font-interRegular">
              Thẳng thắn hành sự, thuần mặc tự nhiên, liền gọi là Đạo.
            </Text>
          )}
        </View>
        <View className="flex border-b border-grayBorder">
          <View className="flex flex-row items-center">
            <IconHelp width="30px" height="30px" />
            <Button
              title="Hỗ trợ"
              sxText="font-interSemiBold"
              sxButton="flex flex-row justify-between flex-1"
              onClick={() => setHelp((prev) => !prev)}
            >
              {help ? <IconChevronBottom height="30px" /> : <IconChevronRight height="30px" />}
            </Button>
          </View>
          {help && (
            <Text className="ml-5 mb-2 font-interRegular">
              Cao nhất trong thiên địa thì có ích gì! Chúng sinh bái lạy thì có
              ích gi! Vô lượng kiếp kinh có ích gì! Thiên địa như vậy thì sao
              còn chưa hủy diệt? Chúng sinh như thế sao còn chưa tiêu tán? Kiếp
              kinh như thế sao còn chưa thất truyền?
            </Text>
          )}
        </View>
        <View className="flex border-b border-grayBorder">
          <View className="flex flex-row items-center ">
            <IconContact width="30px" height="30px" />
            <Button
              title="Liên hệ"
              sxText="font-interSemiBold"
              sxButton="flex flex-row justify-between items-center flex-1"
              onClick={() => setContact((prev) => !prev)}
            >
              {contact ? <IconChevronBottom height="30px" /> : <IconChevronRight height="30px" />}
            </Button>
          </View>
          {contact && (
            <Text className="ml-5 mb-2 font-interRegular">
              Thiên Vận Tinh
            </Text>
          )}
        </View>
        <View className="flex flex-row items-center border-b border-grayBorder">
          <IconLogoutTeacher width="30px" height="30px" />
          <Button
            title="Đăng xuất"
            sxText="font-interSemiBold"
            sxButton="flex flex-row justify-between flex-1"
            onClick={handleLogout}
          >
            <IconChevronRight />
          </Button>
        </View>
      </ScrollView>
    </DefaultLayout>
  );
}

export default ProfileScreenTeacher;
