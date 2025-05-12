import { View, Text, Alert, TouchableOpacity } from "react-native";
import { useState } from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import Input from "../../components/Input";
import Button from "../../components/Button";
import IconHideEye from "../../../assets/icons/hideEye.svg";
import IconEye from "../../../assets/icons/eye.svg";
import axiosClient from "../../configs/axiosClient";
import { ScrollView } from "react-native-gesture-handler";

function ForgotPassword({ navigation, route }) {
  const { role } = route.params || {};
  const [email, setEmail] = useState("");
  const [OTP, setOTP] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showBtnGetOTP, setShowBtnGetOTP] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (newPassword !== confirmPassword) {
      Alert.alert("Thông báo", "Mật khẩu mới không khớp, vui lòng kiểm tra lại.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Thông báo", "Mật khẩu mới phải có ít nhất 6 ký tự.");
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
      if(error.response && error.response.status === 400) {
        Alert.alert("Thông báo", error.response.data.message);
      }else {
        Alert.alert("Lỗi", "Có lỗi xảy ra, vui lòng thử lại.");
      }
      // console.error(error);
    }
  };
  return (
    <HeaderLayout>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <Text className="text-2xl font-interSemiBold my-5 mx-auto">
          Quên mật khẩu
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
            placeholder="Ít nhất 6 ký tự"
            value={newPassword}
            onChange={setNewPassword}
            hide={!showNewPassword}
            secureTextEntry={true}
          >
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
            >
              <Text>
                {showNewPassword ? (
                  <IconEye width="16px" height="16px" />
                ) : (
                  <IconHideEye width="16px" height="16px" />
                )}
              </Text>
            </TouchableOpacity>
          </Input>
        )}
        {!showBtnGetOTP && (
          <Text className="text-lg font-interSemiBold my-5">
            Nhập lại mật khẩu mới:
          </Text>
        )}
        {!showBtnGetOTP && (
          <Input
            placeholder="Ít nhất 6 ký tự"
            value={confirmPassword}
            onChange={setConfirmPassword}
            hide={!showConfirmPassword}
            secureTextEntry={true}
          >
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Text>
                {showConfirmPassword ? (
                  <IconEye width="16px" height="16px" />
                ) : (
                  <IconHideEye width="16px" height="16px" />
                )}
              </Text>
            </TouchableOpacity>
          </Input>
        )}
        {showBtnGetOTP && (
          <Button
            title="Nhận mã OTP"
            sxButton="bg-red mt-5 border "
            sxText="text-white font-interBold"
            onClick={handleGetOTP}
          />
        )}
        {!showBtnGetOTP && (
          <Button
            title="Xác nhận"
            sxButton="bg-red mt-5 border mb-5"
            sxText="text-white font-interBold"
            onClick={handleResetPassword}
          />
        )}
      </ScrollView>
    </HeaderLayout>
  );
}

export default ForgotPassword;
