import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import DefaultLayout from "../../layouts/DefaultLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Select from "../../components/Select";
import IconHideEye from "../../../assets/icons/hideEye.svg";
import { useState } from "react";
import IconLogout from "../../../assets/icons/logout.svg";
import IconEditInfo from "../../../assets/icons/editInfo.svg";
import IconHistoryProfile from "../../../assets/icons/historyProfile.svg";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axiosClient from "../../configs/axiosClient";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState("abc@gmail.com");
  const [name, setName] = useState("VoCucThienTon");
  const [avatarUri, setAvatarUri] = useState(
    require("../../../assets/imgs/avatar.png")
  );
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [editInp, setEditInp] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { isMemoAccount } = useSelector((state) => state.auth);
  const isFocused = useIsFocused();

  //xử lý dropdow
  const [valueSelect, setValueSelect] = useState("1");
  const itemsSelect = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];

  const handleEditProfile = () => {
    setEditInp(true);
  };
  const handleConfimEdit = async () => {
    try {
      const payload = {
        email,
        name,
        grade: parseInt(valueSelect),
        avatar: avatarBase64 ? `data:image/jpeg;base64,${avatarBase64}` : null,
      };

      const response = await axiosClient.put(
        "/api/auth/change-profile",
        payload
      );

      if (response.status === 200) {
        Alert.alert("Thành công", "Thông tin đã được cập nhật.");
        setEditInp(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Thông báo", error.response.data.message);
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  const handleLogout = () => {
    Alert.alert("Thông báo", "Xác nhận đăng xuất.", [
      { text: "Đóng", style: "cancel" },
      {
        text: "ok",
        onPress: async () => {
          try {
            if (isMemoAccount) {
              await AsyncStorage.removeItem("token");
              await AsyncStorage.removeItem("user");
              await AsyncStorage.removeItem("role");
            }
            dispatch(logout());
          } catch (error) {
            console.error("Lỗi khi xoá token:", error);
          }
        },
      },
    ]);
  };
  const pickImage = async () => {
    setEditInp(true);
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Thông báo", "Bạn cần cấp quyền truy cập ảnh.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: false, // ban đầu chưa cần
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 300 } }], // resize ảnh nhỏ lại
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        } // nén và lấy base64
      );

      setAvatarUri({ uri: manipResult.uri });
      setAvatarBase64(manipResult.base64);
    }
  };

  // call api get profile
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosClient.get("/api/auth/profile");
        if (response.status === 200) {
          setEmail(response.data.user.email);
          setName(response.data.user.name);
          const avatarFromServer = response.data.user.avatar;
          if (avatarFromServer !== null) {
            setAvatarUri({ uri: avatarFromServer }); // 👉 base64 URI từ backend
          } else {
            setAvatarUri(require("../../../assets/imgs/avatar.png")); // fallback ảnh mặc định
          }

          setValueSelect(String(response.data.user.grade));
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
        {/* avatar và các button chọn option */}
        <View className="h-[180px] flex flex-row items-center">
          <View className="mr-2">
            <Image
              className="w-[120px] h-[120px] rounded-full border-[5px] border-pink"
              source={avatarUri}
            />

            <Button
              title="Tải ảnh lên"
              onClick={pickImage}
              sxButton="py-2 mt-2 mx-auto bg-pink shadow-lg"
              style={{
                shadowColor: "black",
                elevation: 20,
              }}
            />
          </View>
          <View
            className="bg-[#E5D0D0] h-full rounded-10 flex-1 flex justify-evenly"
            // style={{ elevation: 20 }}
          >
            <Button
              title="Xem lịch sử làm bài"
              sxButton="mx-2 bg-pink flex flex-row justify-between items-center"
              sxText="font-interRegular"
              onClick={() => {
                navigation.navigate("History", { screen: "History" });
              }}
            >
              <IconHistoryProfile />
            </Button>

            <Button
              title="Đổi mật khẩu"
              sxButton="mx-2 bg-pink flex flex-row justify-between items-center"
              sxText="font-interRegular"
              onClick={() => {
                navigation.navigate("ChangePassword");
              }}
            >
              <IconEditInfo />
            </Button>
            <Button
              title="Đăng xuất"
              sxButton="mx-2 bg-pink flex flex-row justify-between items-center"
              sxText="font-interRegular"
              onClick={handleLogout}
            >
              <IconLogout />
            </Button>
          </View>
        </View>
        {/* Các thẻ input hiển thị thông tin cá nhân */}
        <View>
          <Text className="text-xl font-semibold mt-5 mx-auto">
            Thông tin cá nhân
          </Text>
          {/* Input Email */}
          <View className="mt-5">
            <Text className="text-bold font-semibold my-2">Email</Text>
            <Input
              value={email}
              placeholder="abc@gmail.com"
              edit={editInp}
              onChange={setEmail}
            />
          </View>
          {/* Input name */}
          <View className="mt-5">
            <Text className="text-bold font-semibold my-2">Họ và tên</Text>
            <Input value={name} edit={editInp} onChange={setName} />
          </View>
          <Select
            label="Lớp của bạn"
            items={itemsSelect}
            value={valueSelect}
            disabled={!editInp}
            setValue={setValueSelect}
          />
        </View>
        {!editInp && (
          <Button
            title="Chỉnh sửa thông tin"
            sxButton="mb-5 w-[160px] bg-pink flex flex-row justify-between items-center mx-auto"
            sxText="font-interRegular"
            onClick={handleEditProfile}
          ></Button>
        )}
        {editInp && (
          <Button
            onClick={handleConfimEdit}
            title="Xác nhận"
            sxButton="bg-pink w-[120px] m-auto mb-5"
          />
        )}
      </ScrollView>
    </DefaultLayout>
  );
}
