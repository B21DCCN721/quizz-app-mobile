import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import HeaderLayout from "../../../layouts/HeaderLayout";
import Button from "../../../components/Button";
import AvatarTeacher from "../../../../assets/imgs/avatarteacher.svg";
import Camera from "../../../../assets/imgs/camera.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import axiosClient from "../../../configs/axiosClient";
import { useDispatch } from "react-redux";
import * as ImageManipulator from "expo-image-manipulator";
import { useIsFocused } from "@react-navigation/native";

function EditProfileScreenTeacher({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [email, setEmail] = useState(user.email || "test@example.com");
  const [name, setName] = useState(user.name || "Phạm Hoài Nam");
  const [avatarUri, setAvatarUri] = useState(
    require("../../../../assets/imgs/avatar.png")
  );
  const [avatarBase64, setAvatarBase64] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  const pickImage = async () => {
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
  const handleConfimEdit = async () => {
    try {
      const payload = {
        email,
        name,
        avatar: avatarBase64 ? `data:image/jpeg;base64,${avatarBase64}` : null,
      };

      const response = await axiosClient.put(
        "/api/auth/change-profile",
        payload
      );

      if (response.status === 200) {
        Alert.alert("Thành công", "Thông tin đã được cập nhật.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Thông báo", error.response.data.message);
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
      }
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
            setAvatarUri(require("../../../../assets/imgs/avatar.png")); // fallback ảnh mặc định
          }
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
      <HeaderLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </HeaderLayout>
    );
  }
  return (
    <HeaderLayout>
      <ScrollView className="flex flex-1">
        <View className="flex-row items-center p-4">
          <Text className="font-interBold text-2xl text-center flex-1">
            Chỉnh sửa hồ sơ
          </Text>
        </View>
        <View className="items-center my-3">
          <View className="relative">
            <Image
              className="w-[120px] h-[120px] rounded-full border-[5px] border-pink"
              source={avatarUri}
            />
            <TouchableOpacity
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full"
              style={{ zIndex: 10 }}
              onPress={pickImage}
            >
              <Camera width="18px" height="18px" />
            </TouchableOpacity>
          </View>
        </View>
        <View className="space-y-4">
          <View>
            <Text className="font-interSemiBold my-2">Tên</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>
          <View>
            <Text className="font-interSemiBold my-2">Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>
        </View>
        <View className="flex justify-center items-center">
          <Button
            title="Lưu"
            sxButton="mt-5 w-1/2 mb-5 bg-red border border-b-[2px] border-b-[#343B6E] rounded-[20px]"
            sxText="text-white text-2xl/[20px] font-bold"
            onClick={handleConfimEdit}
          />
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
});

export default EditProfileScreenTeacher;
