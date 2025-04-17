import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import IconTrue from "../../../assets/icons/true.svg";
import IconFalse from "../../../assets/icons/false.svg";

const examTitle = "Tên bài thi";

const historyData = [
  { id: "1", question: "Câu 1: Đâu là thủ đô của Việt Nam?", userAnswer: "A. Hà Nội", correctAnswer: "A. Hà Nội", isCorrect: true },
  { id: "2", question: "Câu 2: 2 + 2 bằng mấy?", userAnswer: "B. 4", correctAnswer: "B. 4", isCorrect: true },
  { id: "3", question: "Câu 3: Mặt trời mọc ở hướng nào?", userAnswer: "C. Tây", correctAnswer: "A. Đông", isCorrect: false },
];

function HistoryDetailScreen() {
  return (
    <HeaderLayout>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Chi tiết kết quả</Text>
        <Text style={styles.examTitle}>{examTitle}</Text>

        {historyData.map((item) => (
          <View key={item.id} style={styles.questionItem}>
            <Text style={styles.question}>{item.question}</Text>
            <View style={styles.answerRow}>
              {item.isCorrect ? <IconTrue width={20} height={20} /> : <IconFalse width={20} height={20} />}
              <Text style={[styles.answer, item.isCorrect ? styles.correct : styles.wrong]}>
                Đáp án của bạn: {item.userAnswer}
              </Text>
            </View>
            <Text style={styles.correctAnswer}>Đáp án đúng: {item.correctAnswer}</Text>
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
  examTitle: {
    fontSize: 30, 
    fontWeight: "bold",
    color: "#9ED832", 
    textAlign: "center",
    marginBottom: 20,
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
  answerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  answer: {
    fontSize: 14,
  },
  correctAnswer: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#27AE60",
    marginTop: 5,
  },
  correct: {
    color: "#27AE60",
  },
  wrong: {
    color: "#E74C3C",
  },
});

export default HistoryDetailScreen;
