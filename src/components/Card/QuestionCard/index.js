import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MultipleChoiceQuestion from '../MultipleChoiceQuestionCard';
import ColorQuestion from '../ColorQuestionCard';

const QuestionCard = ({ question, index }) => {
  const renderQuestionByType = () => {
    switch (question.type) {
      case 1: // Trắc nghiệm
        return <MultipleChoiceQuestion question={question} index={index} />;
      case 3: // Màu sắc
        return <ColorQuestion question={question} index={index} />;
      default:
        return <Text>Loại câu hỏi không được hỗ trợ</Text>;
    }
  };

  return (
    <View style={styles.card}>
      {renderQuestionByType()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default QuestionCard;