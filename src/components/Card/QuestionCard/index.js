import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MultipleChoiceQuestion from '../MultipleChoiceQuestionCard';
import ColorQuestion from '../ColorQuestionCard';
import CountingQuestion from '../CountingQuestionCard';

const QuestionCard = ({ question, index, type }) => {
  const renderQuestionByType = () => {
    switch (type) {
      case 1: // Trắc nghiệm
        return <MultipleChoiceQuestion question={question} index={index} />;
      case 3: // Màu sắc
        return <ColorQuestion question={question} index={index} />;
      default:
        return <CountingQuestion question={question} index={index} />;
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