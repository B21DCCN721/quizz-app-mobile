import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import IconHideEye from "../../../../assets/icons/hideEye.svg";
import IconEye from "../../../../assets/icons/eye.svg";
import Select from "../../../components/Select";
import HeaderLayout from "../../../layouts/HeaderLayout";
import axiosClient from "../../../configs/axiosClient";

function SigupStudenScreen({ navigation, route }) {
  const { role } = route.params || {};
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [valueSelect, setValueSelect] = useState(null);
  const itemsSelect = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
  ];
  const handelResgister = async () => {
    if (!email || !name || !password || !valueSelect || password.length < 6) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ và đúng thông tin.");
      return;
    }
    try {
      const response = await axiosClient.post("/api/auth/register", {
        email: email,
        password: password,
        name: name,
        grade: parseInt(valueSelect),
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

      console.log("Register student error:", error);
    }
  };
  return (
    <HeaderLayout>
      <ScrollView className="flex flex-1">
        <Text className="text-2xl font-interSemiBold mx-auto my-5">
          Đăng ký tài khoản
        </Text>
        {/* Input Email */}
        <View className="mt-5">
          <Text className="text-bold font-semibold my-2">Email</Text>
          <Input
            value={email}
            placeholder="abc@gmail.com"
            onChange={setEmail}
          />
        </View>
        {/* Input name */}
        <View className="mt-5">
          <Text className="text-bold font-semibold my-2">Họ và tên</Text>
          <Input value={name} onChange={setName} placeholder="Nguyễn Văn A" />
        </View>
        {/* Input password*/}
        <View className="mt-5">
          <Text className="text-bold font-semibold my-2">Mật khẩu</Text>
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
        <Select
          label="Chọn lớp"
          placeholder="Chọn lớp của bạn"
          items={itemsSelect}
          value={valueSelect}
          setValue={setValueSelect}
        />
        <Button
          title="Đăng ký"
          sxButton="bg-red mt-5 border border-b-[4px] border-b-[#343B6E]"
          sxText="text-center text-white"
          onClick={handelResgister}
        />
      </ScrollView>
    </HeaderLayout>
  );
}

export default SigupStudenScreen;  
