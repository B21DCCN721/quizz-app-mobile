import { ScrollView, View, Text, Alert } from "react-native";
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
import IconPassword from "../../../../assets/icons/password.svg";
import { useState} from "react";
import { Image } from "react-native";
import DefaultLayout from "../../../layouts/DefaultLayout";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice'; // Import action logout từ authSlice
import AsyncStorage from '@react-native-async-storage/async-storage';

function ProfileScreenTeacher({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState(user.avatar || ""); // Đường dẫn đến ảnh đại diện
  console.log("user", user);
  const [about, setAbout] = useState(false);
  const [help, setHelp] = useState(false);
  const [contact, setContact] = useState(false);
  const dispatch = useDispatch(); // Khởi tạo dispatch từ useDispatch

  const handleLogout = () => {
    Alert.alert("Thông báo", "Xác nhận đăng xuất.", [
      { text: "Đóng", style: "cancel" },
      {
        text: "ok",
        onPress: async () => {
          try {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("user");
            await AsyncStorage.removeItem("role");
            dispatch(logout());
          } catch (error) {
            console.error("Lỗi khi xoá token:", error);
          }
        },
      },
    ]);
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
          <Text style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 20,
              color: '#E7784C',
            }}>
            Tài khoản
          </Text>
          <IconSetting />
        </View>
        <View className="my-5 flex flex-row items-center">
          {image ? (
            <Image source={{ uri: image }} 
            style={{ width: 120, height: 120, borderRadius: 60 }}
            className="rounded-full"
            resizeMode="contain"/>
          ) : (
            <AvatarTeacher width="120px" height="120px"/>
          )}
          <View className="ms-20">
            <Text className="font-interSemiBold text-xl">{user.name}</Text>
            <Text className="font-interRegular text-sm text-gray-500">
              Giáo viên
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
          <IconPassword width="30px" height="30px" />
          <Button
            title="Đổi mật khẩu"
            sxText="font-interSemiBold"
            sxButton="flex flex-row justify-between flex-1"
            onClick={() => navigation.navigate("ChangePasswordTeacher")}
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
              {about ? (
                <IconChevronBottom height="30px" />
              ) : (
                <IconChevronRight height="30px" />
              )}
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
              {help ? (
                <IconChevronBottom height="30px" />
              ) : (
                <IconChevronRight height="30px" />
              )}
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
              {contact ? (
                <IconChevronBottom height="30px" />
              ) : (
                <IconChevronRight height="30px" />
              )}
            </Button>
          </View>
          {contact && (
            <Text className="ml-5 mb-2 font-interRegular">Thiên Vận Tinh</Text>
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
