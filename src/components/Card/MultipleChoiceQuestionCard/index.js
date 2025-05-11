import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MultipleChoiceQuestion = ({ question, index }) => {

    return (
        <View style={[styles.container]}>
            <Text style={styles.questionText}>
                {index + 1}. {question.question}
            </Text>

            {question.answers.map((answer, index) => (
                <Text key={index} style={styles.answerText}>
                    Đáp án {index + 1}: {answer.text}
                </Text>
            ))}

            <Text style={[styles.answerText, { fontWeight: 'bold' }]}>
                Đáp án đúng: {question.correctAnswer || 'Không có'}
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