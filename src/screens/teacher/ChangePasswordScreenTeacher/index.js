import Input from "../../../components/Input";
import HeaderLayout from "../../../layouts/HeaderLayout";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import IconHideEye from "../../../../assets/icons/hideEye.svg";
import IconEye from "../../../../assets/icons/eye.svg";
import Button from "../../../components/Button";
import axiosClient from "../../../configs/axiosClient";

function ChangePasswordScreenTeacher() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // call api
  const handleChangePassword = async () => {
    if(newPassword !== confirmPassword) {
      Alert.alert("Thông báo","Mật khẩu mới không khớp vui lòng kiểm tra lại");
      return;
    }
    if(oldPassword.length < 6 || newPassword.length < 6) {
      Alert.alert("Thông báo","Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if(oldPassword === newPassword) {
      Alert.alert("Thông báo","Mật khẩu mới không được giống mật khẩu cũ");
      return;
    }
    try {
      const response = await axiosClient.post("/api/auth/change-password", {
        oldPassword,
        newPassword,
      });
      if (response.status === 200) {
        Alert.alert("Thông báo", "Mật khẩu đã được thay đổi thành công.")
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Thông báo", error.response.data.message);
      }
      else {
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
      }
      console.log("Change password error:", error);
    }
  }
  return (
    <HeaderLayout>
      <View className="flex flex-1">
        <Text className="text-2xl font-interSemiBold my-5 text-center">Đổi mật khẩu</Text>
        <Text className="text-lg font-interSemiBold my-5">
          Nhập mật khẩu cũ:
        </Text>
        <Input
          placeholder="Ít nhất 6 ký tự"
          value={oldPassword}
          onChange={setOldPassword}
          hide={!showPassword}
          secureTextEntry={true}
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
        <Text className="text-lg font-interSemiBold my-5">
          Nhập mật khẩu mới:
        </Text>
        <Input
          placeholder="Ít nhất 6 ký tự"
          value={newPassword}
          onChange={setNewPassword}
          hide={!showNewPassword}
          secureTextEntry={true}
        >
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
            <Text>
              {showNewPassword ? (
                <IconEye width="16px" height="16px" />
              ) : (
                <IconHideEye width="16px" height="16px" />
              )}
            </Text>
          </TouchableOpacity>
        </Input>
        <Text className="text-lg font-interSemiBold my-5">
          Nhập lại mật khẩu mới:
        </Text>
        <Input
          placeholder="Ít nhất 6 ký tự"
          value={confirmPassword}
          onChange={setConfirmPassword}
          hide={!showConfirmPassword}
          secureTextEntry={true}
        >
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Text>
              {showConfirmPassword ? (
                <IconEye width="16px" height="16px" />
              ) : (
                <IconHideEye width="16px" height="16px" />
              )}
            </Text>
          </TouchableOpacity>
        </Input>
        <Button
          title="Xác nhận"
          sxButton="bg-red mt-5 border border-gray-500"
          sxText="text-white font-interBold"
          onClick={handleChangePassword}
        />
      </View>
    </HeaderLayout>
  );
}

export default ChangePasswordScreenTeacher;
