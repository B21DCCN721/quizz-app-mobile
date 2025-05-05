import { View, Text, Alert } from "react-native";
import { useState } from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axiosClient from "../../configs/axiosClient";

function ForgotPassword({ navigation, route }) {
  const { role } = route.params || {};
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showBtnGetOTP, setShowBtnGetOTP] = useState(true);
  const handleGetOTP = async () => {
    try {
      const response = await axiosClient.post("/api/auth/forgot-password", {
        email,
      });
      if (response.status === 200) {
        Alert.alert("Thông báo", "Mã OTP đã được gửi đến email của bạn.");
        setShowBtnGetOTP(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleResetPassword = async () => {
    if (!email || !OTP || !newPassword) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin.");
      return;
    }
    try {
      const response = await axiosClient.post("/api/auth/reset-password", {
        email,
        otp: OTP,
        newPassword,
      });
      if (response.status === 200) {
        Alert.alert("Thông báo", "Mật khẩu đã được thay đổi thành công.", [
          {
            text: "OK",
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Login", params: { role: role } }],
              });
            },
          },
        ]);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <HeaderLayout>
      <View>
        <Text className="text-2xl font-interSemiBold my-5 mx-auto">
          Quên mật khẩu
          {role}
        </Text>
        <Text className="text-lg font-interSemiBold my-5">
          Nhập email của bạn:
        </Text>
        <Input
          value={email}
          placeholder="abc@gmail.com"
          onChange={setEmail}
          keyboardType="email-address"
        />
        {!showBtnGetOTP && (
          <Text className="text-lg font-interSemiBold my-5">Nhập OTP:</Text>
        )}
        {!showBtnGetOTP && (
          <Input value={OTP} placeholder="Nhập mã OTP" onChange={setOTP} />
        )}
        {!showBtnGetOTP && (
          <Text className="text-lg font-interSemiBold my-5">
            Nhập mật khẩu mới:
          </Text>
        )}
        {!showBtnGetOTP && (
          <Input
            value={newPassword}
            placeholder="Nhập mật khẩu mới"
            onChange={setNewPassword}
          />
        )}
        {showBtnGetOTP && (
          <Button
            title="Nhận mã OTP"
            sxButton="bg-red mt-5 border border-red-500"
            sxText="text-white font-interBold"
            onClick={handleGetOTP}
          />
        )}
        {!showBtnGetOTP && (
          <Button
            title="Xác nhận"
            sxButton="bg-red mt-5 border border-red-500"
            sxText="text-white font-interBold"
            onClick={handleResetPassword}
          />
        )}
      </View>
    </HeaderLayout>
  );
}

export default ForgotPassword;
