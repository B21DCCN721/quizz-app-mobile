import React, { useState } from 'react';
import {Alert, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PaginationTest } from '../../../components/Pagination';
import { useNavigation } from '@react-navigation/native';
import HeaderLayout from '../../../layouts/HeaderLayout';

const CreateQuizScreenTeacher = () => {
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState(
    Array(10).fill({
      question: '',
      answers: ['', '', '', ''],
      correctAnswer: '1'
    })
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleQuestionChange = (text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentPage - 1] = {
      ...updatedQuestions[currentPage - 1],
      question: text
    };
    setQuestions(updatedQuestions);
  };

  const handleAnswerChange = (index, text) => {
    const updatedQuestions = [...questions];
    const updatedAnswers = [...updatedQuestions[currentPage - 1].answers];
    updatedAnswers[index] = text;
    updatedQuestions[currentPage - 1] = {
      ...updatedQuestions[currentPage - 1],
      answers: updatedAnswers
    };
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentPage - 1] = {
      ...updatedQuestions[currentPage - 1],
      correctAnswer: value
    };
    setQuestions(updatedQuestions);
  };

  const handleSave = () => {
    if (questions.some(q => !q.question || q.answers.some(a => !a))) {
      Alert.alert('Cảnh báo','Không được để trống câu hỏi hoặc đáp án');
      return;
    }
    if (questions.some(q => q.correctAnswer === '')) {
      Alert.alert('Cảnh báo','Bạn chưa chọn đáp án đúng cho câu hỏi');
      return;
    }
    // Save logic here
    navigation.goBack();
  };

  return (
    <HeaderLayout>
      <Text className="text-xl font-bold mb-4">
        Thêm câu hỏi - Câu ({currentPage}/10)
      </Text>
      <TextInput
        className="border p-6 mb-6 rounded text-xl"
        placeholder="Nhập câu hỏi"
        value={questions[currentPage - 1].question}
        onChangeText={handleQuestionChange}
        multiline
        style={{ minHeight: 150, textAlignVertical: 'top' }}
      />
      {[0, 1, 2, 3].map((i) => (
        <TextInput
          key={i}
          className="border p-5 mb-5 rounded text-lg"
          placeholder={`Nhập đáp án số ${i + 1}`}
          value={questions[currentPage - 1].answers[i]}
          onChangeText={(text) => handleAnswerChange(i, text)}
          multiline
          style={{ minHeight: 60, textAlignVertical: 'top' }}
        />
      ))}
      <View className="border p-2 mb-4 rounded">
        <Picker
          selectedValue={questions[currentPage - 1].correctAnswer}
          onValueChange={handleCorrectAnswerChange}
        >
          <Picker.Item label="Chọn đáp án đúng" value="" />
          <Picker.Item label="Đáp án 1" value="1" />
          <Picker.Item label="Đáp án 2" value="2" />
          <Picker.Item label="Đáp án 3" value="3" />
          <Picker.Item label="Đáp án 4" value="4" />
        </Picker>
      </View>
      <PaginationTest
        currentScreen={currentPage}
        onChangeScreen={handlePageChange}
      />
      <View className="flex-row justify-between mt-4">
        <TouchableOpacity
          className="bg-gray-300 p-3 rounded"
          onPress={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1);
            } else {
              navigation.goBack();
            }
          }}
        >
          <Text>Trở về</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-gray-300 p-3 rounded"
          onPress={() => {
            if (currentPage < 10) {
              handlePageChange(currentPage + 1);
            } else {
              handleSave();
            }
          }}
        >
          <Text className="text-b">{currentPage === 10 ? 'Lưu bài tập' : 'Câu tiếp theo'}</Text>
        </TouchableOpacity>
      </View>
    </HeaderLayout>
  );
};

export default CreateQuizScreenTeacher;
