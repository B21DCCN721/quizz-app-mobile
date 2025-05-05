import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MultipleChoiceQuestion = ({ question, index }) => {
  const studentAnswerObj = question.correct_answers.find(
    answer => answer.id === question.student_answer
  );
  
  const correctAnswerObj = question.correct_answers.find(
    answer => answer.is_correct
  );
  
  const isCorrect = question.student_answer === correctAnswerObj?.id;

  return (
    <View style={[styles.container, isCorrect ? styles.correct : styles.incorrect]}>
      <Text style={styles.questionText}>
        {index + 1}. {question.question_text}
      </Text>
      
      <Text style={styles.answerText}>
        Câu trả lời của học sinh: {studentAnswerObj?.answer_text || 'Không có'}
      </Text>
      
      <Text style={styles.answerText}>
        Đáp án đúng: {correctAnswerObj?.answer_text || 'Không có'}
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
  questionText: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  answerText: {
    fontSize: 14,
    marginBottom: 4,
  },
});

export default MultipleChoiceQuestion;