import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Button from "../../components/Button";
import HeaderLayout from "../../layouts/HeaderLayout";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import IconHideEye from "../../../assets/icons/hideEye.svg";
import NameApp from "../../../assets/imgs/nameapp.svg";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import axiosClient from "../../configs/axiosClient";
import { loginSuccess } from "../../store/slices/authSlice";

export default function LoginScreen({ navigation, route }) {
  const { role } = route.params || {};
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axiosClient.post("", {
        username,
        password,
      });
  
      const { token } = response.data;
  
      // Lưu token vào AsyncStorage
      await AsyncStorage.setItem("authToken", token);
  
      // Cập nhật redux state
      dispatch(loginSuccess({ token, role }));
  
      // Điều hướng tới màn hình Start (nếu muốn)
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Start", params: { role: role } }],
      // });
    } catch (error) {
      console.log("Login error:", error);
    }
  };
  
  return (
    <HeaderLayout>
      <ScrollView className="flex flex-1">
        <View className="mx-auto my-20">
          <NameApp/>
        </View>
        {/* Input Email */}
        <View className="mt-5">
          <Text className="text-bold font-semibold my-2">Email</Text>
          <Input
            value={username}
            placeholder="abc@gmail.com"
            onChange={setUsername}
          />
        </View>

        {/* Input password*/}
        <View className="my-5">
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
                  "🙈"
                ) : (
                  <IconHideEye width="16px" height="16px" />
                )}
              </Text>
            </TouchableOpacity>
          </Input>
        </View>
        <View className="flex flex-row justify-between items-center">
          <Checkbox
            checked={isChecked}
            onToggle={() => setIsChecked(!isChecked)}
            size={24}
            color="black"
            label="Ghi nhớ"
          />
          <Text className="font-interRegular underline">Quên mật khẩu?</Text>
        </View>
        <Button
          title="Đăng nhập"
          sxButton="bg-red mt-5 border border-b-[4px] border-b-[#343B6E]"
          sxText="text-white font-interBold"
          onClick={handleLogin}
        />
      </ScrollView>
    </HeaderLayout>
  );
}
