import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ColorQuestion = ({ question, index }) => {
  const correctPosition = question.correct_answers[0]?.correct_position;
  const isCorrect = question.student_answer === String(correctPosition);

  return (
    <View style={[styles.container, isCorrect ? styles.correct : styles.incorrect]}>
      <Text style={styles.questionNumber}>Câu {index + 1}</Text>
      
      <Image 
        source={{ uri: question.question_text }} 
        style={styles.image}
        resizeMode="contain"
      />
      
      <Text style={styles.answerText}>
        Học sinh chọn: Vị trí {question.student_answer}
      </Text>
      
      <Text style={styles.answerText}>
        Đáp án đúng: Vị trí {correctPosition}
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