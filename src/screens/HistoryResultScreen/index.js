import React, { useState, useEffect } from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import ImgResult from "../../../assets/imgs/imgresult.svg";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import IconTrue from "../../../assets/icons/true.svg";
import IconFalse from "../../../assets/icons/false.svg";
import IconStar from "../../../assets/icons/star.svg";
import IconDetail from "../../../assets/icons/detail.svg";
import Button from "../../components/Button";
import axiosClient from "../../configs/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
function HistoryResultScreen({ navigation, route }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy ID bài kiểm tra từ route params
  const { examId,exerciseType } = route.params;

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
        if (!token) {
          throw new Error("Token không tồn tại. Vui lòng đăng nhập lại.");
        }
  
        const response = await axiosClient.get(`/api/history/result/${examId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        setResult(response.data.data);
      } catch (error) {
        console.error("Error fetching result:", error);
        if (error.response && error.response.status === 401) {
          Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
          navigation.navigate("Login"); // Điều hướng đến màn hình đăng nhập
        } else {
          Alert.alert("Lỗi", "Không thể tải dữ liệu kết quả bài thi.");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchResult();
  }, [examId]);
  if (loading) {
    return (
      <HeaderLayout>
        <Text>Đang tải dữ liệu...</Text>
      </HeaderLayout>
    );
  }

  if (!result) {
    return (
      <HeaderLayout>
        <Text>Không tìm thấy kết quả bài thi.</Text>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <ImgResult width="100%" height="36%" />

      {/* Tiêu đề + IconDetail */}
      <View className="flex-row items-center justify-center my-5">
        <Text className="font-interBold text-[#9ED832] text-6xl text-center">
          {result.examName}
        </Text>
        <TouchableOpacity
  onPress={() =>
    navigation.navigate("HistoryDetail", {
      examId , // ID của bài kiểm tra
      exerciseType  // Loại bài kiểm tra
    })
  }
>
  <IconDetail width={50} height={50} style={{ marginLeft: 16 }} />
</TouchableOpacity>
      </View>

      {/* Kết quả */}
      <View className="rounded-40 bg-[#FFF2E4] p-5 rounded-10">
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Số câu đúng: {result.correctAnswers}</Text>
          <IconTrue />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Số câu sai: {result.wrongAnswers}</Text>
          <IconFalse />
        </View>
        <View className="flex-row items-center">
          <Text className="flex-1 font-interBold text-3xl">Điểm: {result.score}</Text>
          <IconStar />
        </View>
      </View>

      {/* Nút Làm Lại */}
      <Button
        title="Làm lại"
        sxButton="mb-5 bg-red border border-b-[4px] border-b-[#343B6E] mt-auto"
        sxText="text-white text-2xl font-interBold"
        onClick={() =>
          Alert.alert(
            "Xác nhận",
            "Bạn có muốn làm lại không?",
            [
              {
                text: "Hủy",
                style: "cancel",
              },
              {
                text: "Làm lại",
                onPress: () => navigation.navigate("MultipleChoice"),
              },
            ]
          )
        }
      />
    </HeaderLayout>
  );
}

export default HistoryResultScreen;