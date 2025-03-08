import { useState } from "react";
import DefaultLayot from "../../../layouts/DefaultLayot";
import Header from "../../../components/Header";
import { View, Text, TouchableOpacity, Image } from "react-native";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import DropDownPicker from "react-native-dropdown-picker";

function SigupStudenScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "js" },
  ]);

  return (
    <DefaultLayot>
      <Header />
      <View className="flex flex-1 px-5 mt-20">
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
                  <Image
                    className="w-[16px] h-[16px]"
                    source={require("../../../../assets/icons/hideEye.png")}
                  />
                )}
              </Text>
            </TouchableOpacity>
          </Input>
        </View>
        <View className="my-5">
          <Text className="text-bold font-semibold my-2">Chọn lớp</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder="Chọn lớp của bạn"
            listMode="SCROLLVIEW"
            style={{
              backgroundColor: "#F1F1F1",
              borderColor: "#DFDFDF",
              borderWidth: 1,
              paddingLeft: 16,
            }}
            placeholderStyle={{ fontFamily: "InterRegular", color: "#707070" }}
            dropDownContainerStyle={{
              borderColor: "#DFDFDF",
              borderWidth: 1,
              borderRadius: 8,
            }}
          />
        </View>
        <Button
          title="Đăng ký"
          sxButton="bg-red mt-5"
          sxText="text-center text-white"
          onClick={() => navigation.replace("Start")}
        />
      </View>
    </DefaultLayot>
  );
}

export default SigupStudenScreen;
