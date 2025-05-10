import React, { useState, useEffect } from "react";
import HeaderLayout from "../../layouts/HeaderLayout";
import ImgResult from "../../../assets/imgs/imgresult.svg";
import { View, Text, ScrollView, TouchableOpacity, Alert, StyleSheet } from "react-native";
import IconTrue from "../../../assets/icons/true.svg";
import IconFalse from "../../../assets/icons/false.svg";
import IconStar from "../../../assets/icons/star.svg";
import IconDetail from "../../../assets/icons/detail.svg";
import Button from "../../components/Button";
import axiosClient from "../../configs/axiosClient";

function HistoryResultScreen({ navigation, route }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  // Lấy ID bài kiểm tra từ route params
  const { examId, exerciseType } = route.params;

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(`/api/history/result/${examId}`);
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
  },  [ examId]);

  if (loading) {
    return (
      <HeaderLayout style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.centered}>
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </ScrollView>
      </HeaderLayout>
    );
  }

  if (!result) {
    return (
      <HeaderLayout style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.centered}>
          <Text style={styles.errorText}>Không tìm thấy kết quả bài thi.</Text>
        </ScrollView>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout >
      <ScrollView contentContainerStyle={styles.container}>
       
        <View style={{ alignItems: "center" }}>
          <ImgResult width={500} height={350}  />
        </View>

        {/* Tiêu đề + IconDetail */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{result.examName}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HistoryDetail", {
                examId, // ID của bài kiểm tra
                exerciseType, // Loại bài kiểm tra
              })
            }
          >
            <IconDetail width={40} height={40} style={styles.iconDetail} />
          </TouchableOpacity>
        </View>

        {/* Kết quả */}
        <View style={styles.resultContainer}>
          <View style={styles.resultRow}>
            <Text style={styles.resultText}>Số câu đúng: {result.correctAnswers}</Text>
            <IconTrue marginRight={10} />
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultText}>Số câu sai: {result.wrongAnswers}</Text>
            <IconFalse marginRight={10} />
          </View>
          <View style={styles.resultRow}>
            <Text style={styles.resultText}>Điểm: {result.score}</Text>
            <IconStar  />
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
                  onPress: () => {
                    switch (exerciseType) {
                      case 1:
                        navigation.navigate("MultipleChoice", { id: result.exerciseId, mode: exerciseType });
                        break;
                      case 2:
                        navigation.navigate("Counting", { id: result.exerciseId, mode: exerciseType });
                        break;
                      case 3:
                        navigation.navigate("Color", { id: result.exerciseId, mode: exerciseType });
                        break;
                      default:
                        Alert.alert("Lỗi", "Loại bài kiểm tra không hợp lệ.");
                    }
                  },
                },
              ]
            )
          }
/>
      </ScrollView>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "space-between",
  },
  centered: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#555",
  },
  errorText: {
    fontSize: 18,
    color: "#E74C3C",
  },
 
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontFamily: "Inter-Bold",
    color: "#9ED832",
    fontSize: 28,
    textAlign: "center",
  },
  iconDetail: {
    marginLeft: 16,
  },
  resultContainer: {
    backgroundColor: "#FFF2E4",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  resultRow: {
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center", 
    marginBottom: 10,
  },
  resultText: {
    flex: 1, 
    fontFamily: "Inter-Bold",
    fontSize: 23,
  },
  
});

export default HistoryResultScreen;