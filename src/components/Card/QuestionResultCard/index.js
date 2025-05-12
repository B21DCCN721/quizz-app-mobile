import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MultipleChoiceQuestionResult from '../MultipleChoiceQuestionResultCard';
import ColorQuestionResult from '../ColorQuestionResultCard';
import CountingQuestionResultCard from '../CountingQuestionResultCard';

const QuestionResultCard = ({ question, index }) => {
  const renderQuestionByType = () => {
    switch (question.type) {
      case 1: // Trắc nghiệm
        return <MultipleChoiceQuestionResult question={question} index={index} />;
      case 3: // Màu sắc
        return <ColorQuestionResult question={question} index={index} />;
      default:
        return <CountingQuestionResultCard question={question} index={index} />;
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

export default QuestionResultCard;