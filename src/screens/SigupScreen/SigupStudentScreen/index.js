import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import IconHideEye from "../../../../assets/icons/hideEye.svg";
import Select from "../../../components/Select";
import HeaderLayout from "../../../layouts/HeaderLayout";

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
    { label: "3", value: "js" },
  ];

  return (
    <HeaderLayout>
      <View className="flex flex-1">
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
          <Input value={name} onChange={setName} />
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
                  "🙈"
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
          onClick={() =>
            navigation.reset(
              {
                index: 0,
                routes: [{ name: "Start", params: {role: role} }],
              },
            )
          }
        />
      </View>
    </HeaderLayout>
  );
}

export default SigupStudenScreen;
