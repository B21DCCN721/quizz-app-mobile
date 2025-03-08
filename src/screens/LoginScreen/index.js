import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Button from "../../components/Button";
import DefaultLayot from "../../layouts/DefaultLayot";
import Input from "../../components/Input";
import Header from "../../components/Header";
import Checkbox from "../../components/Checkbox";
import IconHideEye from "../../../assets/icons/hideEye.svg";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = () => {
    if (username === "admin" && password === "123456") {
      navigation.replace("Start");
    } else {
      alert("Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <DefaultLayot>
      <Header />
      <View className="flex flex-1 px-5 mt-20">
        <Text className="text-5xl font-interSemiBold mx-auto my-20">
          Tên app
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
                  <IconHideEye width = "16px" height = "16px"/>
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
          sxButton="bg-red mt-5"
          sxText="text-white font-interBold"
          onClick={handleLogin}
        />
      </View>
    </DefaultLayot>
  );
}
