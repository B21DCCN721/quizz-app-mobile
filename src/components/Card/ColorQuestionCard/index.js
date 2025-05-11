import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ColorQuestion = ({ question, index }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>Câu {index + 1}</Text>
      <Text style={styles.questionNumber}>{question.question_text}</Text>
      <Image 
        source={{ uri: question.image }} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <Text style={styles.answerText}>
        Đáp án đúng: Vị trí chính xác là {question.correct_position}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
  },
  correct: {
    backgroundColor: '#e6f7ee',
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  incorrect: {
    backgroundColor: '#ffebee',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 12,
    borderRadius: 4,
  },
  answerText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default ColorQuestion;