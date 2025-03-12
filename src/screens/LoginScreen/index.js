import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import HeaderLayout from "../../layouts/HeaderLayout";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import IconHideEye from "../../../assets/icons/hideEye.svg";

export default function LoginScreen({ navigation, route }) {
  const { role } = route.params || {};
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = () => {
    navigation.reset(
      {
        index: 0,
        routes: [{ name: "Start", params: { role: role } }],
      },
    );
  };

  return (
    <HeaderLayout>
      <View className="flex flex-1">
        <Text className="text-5xl font-interSemiBold mx-auto my-20">
          {role}
        </Text>
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
      </View>
    </HeaderLayout>
  );
}
