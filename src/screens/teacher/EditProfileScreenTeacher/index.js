import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import HeaderLayout from "../../../layouts/HeaderLayout";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { useState } from "react";
import IconHideEye from "../../../../assets/icons/hideEye.svg";

function EditProfileScreenTeacher() {
  const [email, setEmail] = useState("abc@gmail.com");
  const [name, setName] = useState("VoCucThienTon");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [editInp, setEditInp] = useState(false);
  const handleEditProfile = () => {
    setEditInp(true);
  };
  const handleConfimEdit = () => {
    setEditInp(false);
  };
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
            className="w-[120px] h-[120px] rounded-full"
            source={require("../../../../assets/imgs/avatar.png")}
          />
          <Button
            title="Tải ảnh lên"
            sxButton="py-2 mt-2 mx-auto bg-red shadow-lg"
            sxText="text-white"
            style={{
              shadowColor: "black",
              elevation: 20,
            }}
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
              edit={editInp}
              onChange={setEmail}
            />
          </View>
          {/* Input password*/}
          <View className="mt-5">
            <Text className="text-bold font-semibold my-2">Mật khẩu</Text>
            <Input
              placeholder="Ít nhất 6 ký tự"
              value={password}
              edit={editInp}
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
        </View>
        {editInp ? (
          <Button
            onClick={handleConfimEdit}
            title="Xác nhận"
            sxButton="bg-red w-[150px] rounded-30 m-auto mt-5"
            sxText="text-white font-interSemiBold"
          />
        ):  <Button
            onClick={handleEditProfile}
            title="Chỉnh sửa"
            sxButton="bg-red w-[150px] rounded-30 m-auto mt-5"
            sxText="text-white font-interSemiBold"
          />}
      </ScrollView>
    </HeaderLayout>
  );
}

export default EditProfileScreenTeacher;
