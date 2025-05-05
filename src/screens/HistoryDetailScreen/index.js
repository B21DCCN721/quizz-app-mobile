import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import axiosClient from "../../configs/axiosClient";

function HistoryDetailScreen({ route }) {
  const { examId, exerciseType } = route.params; // Nhận examId và exerciseType từ route.params
  const [historyData, setHistoryData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryDetail = async () => {
      try {
        setLoading(true);
        let apiUrl = "";

        // Xác định API dựa trên exerciseType
        if (exerciseType === 1) {
          apiUrl = `/api/history/result/multiple-choice/${examId}`;
        } else if (exerciseType === 2) {
          apiUrl = `/api/history/result/counting/${examId}`;
        } else if (exerciseType === 3) {
          apiUrl = `/api/history/result/color/${examId}`;
        }

        // Gửi yêu cầu API
        const response = await axiosClient.get(apiUrl);
        setHistoryData(response.data.data); // Lưu dữ liệu từ API
      } catch (error) {
        console.error("Lỗi khi lấy chi tiết bài thi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryDetail();
  }, [examId, exerciseType]);

  if (loading) {
    return (
      <HeaderLayout>
        <ActivityIndicator size="large" color="#0000ff" />
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Chi tiết kết quả</Text>

        {historyData.map((item, index) => (
          <View key={index} style={styles.questionItem}>
            <Text style={styles.question}>Câu: {item.order}</Text>

            {/* Hiển thị dữ liệu dựa trên loại bài kiểm tra */}
            {exerciseType === 1 && (
              <>
                <Text style={styles.question}>Câu hỏi: {item.questionText}</Text>
                <Text style={styles.correctAnswer}>Đáp án đúng: {item.correctAnswer}</Text>
                <Text style={styles.userAnswer}>Đáp án của bạn: {item.userAnswer}</Text>
              </>
            )}

            {exerciseType === 2 && (
              <>
                <Text style={styles.question}>Vật đếm: {item.objectName}</Text>
                <Text style={styles.correctAnswer}>Đáp án đúng: {item.correctAnswer}</Text>
                <Text style={styles.userAnswer}>Đáp án của bạn: {item.userAnswer}</Text>
              </>
            )}

            {exerciseType === 3 && (
              <>
                <Text style={styles.correctAnswer}>Đáp án đúng: {item.correctAnswer}</Text>
                <Text style={styles.userAnswer}>Đáp án của bạn: {item.userAnswer}</Text>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#E74C3C",
    textAlign: "left",
    marginBottom: 10,
  },
  questionItem: {
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  question: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  correctAnswer: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#27AE60",
    marginTop: 5,
  },
  userAnswer: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
});

export default HistoryDetailScreen;