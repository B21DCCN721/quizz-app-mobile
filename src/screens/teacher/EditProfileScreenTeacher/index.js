import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput, Alert, ScrollView } from "react-native";
import HeaderLayout from "../../../layouts/HeaderLayout";
import Button from "../../../components/Button";
import AvatarTeacher from "../../../../assets/imgs/avatarteacher.svg";
import Camera from "../../../../assets/imgs/camera.svg";
import { useState } from "react";
import { useSelector } from "react-redux";
import * as ImagePicker from 'expo-image-picker';
import axiosClient from "../../../configs/axiosClient";
import { useDispatch } from "react-redux";
import * as ImageManipulator from "expo-image-manipulator";

function EditProfileScreenTeacher({ navigation }) {
  const user = useSelector((state) => state.auth.user);
  const [image, setImage] = useState(user.avatar || "");
  const [email, setEmail] = useState(user.email || "test@example.com");
  const [name, setName] = useState(user.name || "Phạm Hoài Nam");
  const [bio, setBio] = useState("Mô tả về bản thân");
  const [school, setSchool] = useState("PTIT");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    console.log("Saving profile...");
    try {
      let avatarBase64 = null;

      if (image) {
        const base64Image = await ImageManipulator.manipulateAsync(
          image,
          [{ resize: { width: 300, height: 300 } }],
          { base64: true }
        );
        avatarBase64 = base64Image.base64;
      }

      const payload = {
        email,
        name,
        grade: 0,
        avatar: avatarBase64 ? `data:image/jpeg;base64,${avatarBase64}` : null,
      };

      const response = await axiosClient.put(
        "/api/auth/change-profile",
        payload
      );

      if (response.status === 200) {
        Alert.alert("Thành công", "Thông tin đã được cập nhật.");

        // setEditInp(false); ← nếu cần thì phải khai báo
      }
    } catch (error) {
      console.error("Lỗi gọi API:", error);
      if (error.response && error.response.status === 400) {
        Alert.alert("Thông báo", error.response.data.message);
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
      }
    }
  };

  return (
    <HeaderLayout>
      <ScrollView>
        <View className="flex-row items-center p-4">
          <Text className="font-interBold text-2xl text-center flex-1">
            Chỉnh sửa hồ sơ
          </Text>
        </View>
        <View className="items-center my-3">
          <View className="relative">
            {image ? (
              <Image source={{ uri: image }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
                className="rounded-full"
                resizeMode="contain" />
            ) : (
              <AvatarTeacher width="120px" height="120px" />
            )}
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
            onClick={handleSave}
          />
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default EditProfileScreenTeacher;
