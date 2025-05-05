import { ScrollView, Text, View, Image, ActivityIndicator, Alert } from "react-native";
import HeaderLayout from "../../../layouts/HeaderLayout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import axiosClient from "../../../configs/axiosClient";

function EditProfileScreenTeacher() {
  const [email, setEmail] = useState("abc@gmail.com");
  const [name, setName] = useState("VoCucThienTon");
  const [loading, setLoading] = useState(true);
  const [editInp, setEditInp] = useState(false);
    const [avatarUri, setAvatarUri] = useState(
      require("../../../../assets/imgs/avatar.png")
    );
    const [avatarBase64, setAvatarBase64] = useState(null);
  const handleEditProfile = () => {
    setEditInp(true);
  };
  const handleConfimEdit = async () => {
    try {
      const payload = {
        name,
        avatar: avatarBase64 ? `data:image/jpeg;base64,${avatarBase64}` : null,
      };
  
      const response = await axiosClient.put("/api/auth/change-profile", payload);
  
      if (response.status === 200) {
        Alert.alert("Thành công", "Thông tin đã được cập nhật.");
        setEditInp(false);
      }
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      Alert.alert("Lỗi", "Không thể cập nhật thông tin.");
    }
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
          setName(response.data.user.name);
          setEmail(response.data.user.email);
          const avatarFromServer = response.data.user.avatar;
          if (avatarFromServer !== null) {
            setAvatarUri({ uri: avatarFromServer }); //  base64 URI từ backend
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
  }, []);
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <Text className="font-interBold text-2xl text-center">
          Chỉnh sửa hồ sơ
        </Text>
        <View className="mx-auto my-5">
          <Image
            className="w-[120px] h-[120px] rounded-full"s
            source={avatarUri}
          />
          <Button
            title="Tải ảnh lên"
            sxButton="py-2 mt-2 mx-auto bg-red shadow-lg"
            sxText="text-white"
            onClick={pickImage}
          />
        </View>
        <View>
          {/* Input name */}
          <View className="mt-5">
            <Text className="text-bold font-semibold my-2">Họ và tên</Text>
            <Input value={name} edit={editInp} onChange={setName} />
          </View>
          {/* Input Email */}
          <View className="mt-5">
            <Text className="text-bold font-semibold my-2">Email</Text>
            <Input
              value={email}
              placeholder="abc@gmail.com"
              edit={false}
              onChange={setEmail}
            />
          </View>
        </View>
        {editInp ? (
          <Button
            onClick={handleConfimEdit}
            title="Xác nhận"
            sxButton="bg-red w-[150px] rounded-30 m-auto mt-5"
            sxText="text-white font-interSemiBold"
          />
        ) : (
          <Button
            onClick={handleEditProfile}
            title="Chỉnh sửa"
            sxButton="bg-red w-[150px] rounded-30 m-auto mt-5"
            sxText="text-white font-interSemiBold"
          />
        )}
      </ScrollView>
    </HeaderLayout>
  );
}

export default EditProfileScreenTeacher;
