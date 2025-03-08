import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import DefaultLayot from "../../layouts/DefaultLayot";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DropDownPicker from "react-native-dropdown-picker";
import IconHideEye from "../../../assets/icons/hideEye.svg";
import { useState } from "react";
import IconLogout from "../../../assets/icons/logout.svg";
import IconEditInfo from "../../../assets/icons/editInfo.svg";
import IconHistoryProfile from "../../../assets/icons/historyProfile.svg";

export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState("abc@gmail.com");
  const [name, setName] = useState("VoCucThienTon");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [editInp, setEditInp] = useState(false);

  //xử lý dropdow
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("2");
  const [items, setItems] = useState([
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ]);

  const handleEditProfile = () => {
    setEditInp(true);
  }
  const handleConfimEdit = () => {
    setEditInp(false);
  }
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  }
  return (
    <DefaultLayot>
      <ScrollView className="flex">
        {/* avatar và các button chọn option */}
        <View className="h-[180px] flex flex-row px-5 items-center mt-5">
          <View className="mr-2">
            <Image
            className="w-[120px] h-[120px] rounded-full border border-[5px] border-pink"
            source={require("../../../assets/imgs/avatar.png")}
          />
          <Button title="Tải ảnh lên" sxButton="py-2 mt-2 mx-auto bg-pink border-0"/>
          </View>
          <View className="bg-[#E5D0D0] h-full rounded-10 flex-1 flex justify-evenly">
            <Button title="Xem lịch sử làm bài" sxButton="mx-2 bg-pink border-0 flex flex-row justify-between items-center" sxText="font-interRegular"><IconHistoryProfile/></Button>
            <Button title="Chỉnh sửa thông tin" sxButton="mx-2 bg-pink border-0 flex flex-row justify-between items-center" sxText="font-interRegular" onClick={handleEditProfile}><IconEditInfo/></Button>
            <Button title="Đăng xuất" sxButton="mx-2 bg-pink border-0 flex flex-row justify-between items-center" sxText="font-interRegular" onClick={handleLogout}><IconLogout/></Button>
          </View>
        </View>
        {/* Các thẻ input hiển thị thông tin cá nhân */}
        <View className="px-5">
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
          {/* Input name */}
          <View className="mt-5">
            <Text className="text-bold font-semibold my-2">Họ và tên</Text>
            <Input value={name} edit={editInp} onChange={setName} />
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
          <View className="my-5">
            <Text className="text-bold font-semibold my-2">Chọn lớp</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              disabled={!editInp}
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
              placeholderStyle={{
                fontFamily: "InterRegular",
                color: "#707070",
              }}
              dropDownContainerStyle={{
                borderColor: "#DFDFDF",
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
          </View>
        </View>
        {editInp && <Button onClick={handleConfimEdit} title="Xác nhận" sxButton="bg-pink border-0 w-[120px] m-auto"/>}
      </ScrollView>
    </DefaultLayot>
  );
}
