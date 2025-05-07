import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import IconHideEye from "../../../../assets/icons/hideEye.svg";
import IconEye from "../../../../assets/icons/eye.svg";
import HeaderLayout from "../../../layouts/HeaderLayout";
import axiosClient from "../../../configs/axiosClient";

function SigupTeacherScreen({ navigation, route }) {
  const { role } = route.params || {};
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handelResgister = async () => {
    if (!email || !name || !password || !password.length) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Thông báo", "Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }
    try {
      const response = await axiosClient.post("/api/auth/register", {
        email: email,
        password: password,
        name: name,
        role: role,
      });
      if (response.status === 201) {
        Alert.alert("Thông báo", "Đăng ký thành công", [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Login", params: { role: role } }],
                // routes: [{ name: "Login"}],
              });
            },
          },
        ]);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Thông báo", error.response.data.message);
      } else {
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
      }

      console.log("Register teacher error:", error);
    }
  };
  return (
    <HeaderLayout>
      <View className="flex flex-1">
        <Text className="text-2xl font-interSemiBold my-5">
          Đăng ký tài khoản
        </Text>
        <Text>{role}</Text>
        {/* Input Email */}
        <View className="mt-5">
          <Text className="font-interSemiBold my-2">Email</Text>
          <Input
            value={email}
            placeholder="abc@gmail.com"
            onChange={setEmail}
          />
        </View>
        {/* Input name */}
        <View className="mt-5">
          <Text className="font-interSemiBold my-2">Họ và tên</Text>
          <Input value={name} onChange={setName} placeholder="Nguyễn Văn A" />
        </View>
        {/* Input password*/}
        <View className="my-5">
          <Text className="font-interSemiBold my-2">Mật khẩu</Text>
          <Input
            placeholder="Ít nhất 6 ký tự"
            value={password}
            onChange={setPassword}
            hide={!showPassword}
          >
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text>
                {showPassword ? (
                  <IconEye width="16px" height="16px" />
                ) : (
                  <IconHideEye width="16px" height="16px" />
                )}
              </Text>
            </TouchableOpacity>
          </Input>
        </View>

        <Button
          title="Đăng ký"
          sxButton="bg-red mt-5 border border-b-[4px] border-b-[#343B6E]"
          sxText="text-center text-white font-interBold"
          onClick={handelResgister}
        />
      </View>
    </HeaderLayout>
  );
}

export default SigupTeacherScreen;
