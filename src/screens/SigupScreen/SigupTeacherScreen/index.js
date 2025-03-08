import { useState } from "react";
import DefaultLayot from "../../../layouts/DefaultLayot";
import Header from "../../../components/Header";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import IconHideEye from "../../../../assets/icons/hideeye.svg";

function SigupTeacherScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <DefaultLayot>
      <Header />
      <View className="flex flex-1 px-5 mt-20">
        <Text className="text-2xl font-interSemiBold my-5">
          Đăng ký tài khoản
        </Text>
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
          <Input value={name} onChange={setName} />
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
                  "🙈"
                ) : (
                  <IconHideEye width = "16px" height = "16px"/>
                )}
              </Text>
            </TouchableOpacity>
          </Input>
        </View>

        <Button
          title="Đăng ký"
          sxButton="bg-red mt-5"
          sxText="text-center text-white font-interBold"
          onClick={() => navigation.replace("Start")}
        />
      </View>
    </DefaultLayot>
  );
}

export default SigupTeacherScreen;
