import React, { useState } from 'react';
import {Alert, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { PaginationTest } from '../../../components/Pagination';
import { useNavigation } from '@react-navigation/native';
import HeaderLayout from '../../../layouts/HeaderLayout';
import axiosClient from '../../../configs/axiosClient';
import { useRoute } from '@react-navigation/native';

const CreateQuizScreenTeacher = ({ route }) => {
  const { name, des ,type, grade } = route.params.assignmentData;
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [questions, setQuestions] = useState(
    Array(10).fill({
      question: '',
      answers:[ 
        {'text': '', 'is_correct': false}, 
        {'text': '', 'is_correct': false}, 
        {'text': '', 'is_correct': false}, 
        {'text': '', 'is_correct': false}
      ],
      correctAnswer: '',
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
  updatedAnswers[index] = {
    ...updatedAnswers[index],
    text,
  };
  updatedQuestions[currentPage - 1] = {
    ...updatedQuestions[currentPage - 1],
    answers: updatedAnswers,
  };
  setQuestions(updatedQuestions);
};


  const handleCorrectAnswerChange = (value) => {
  const updatedQuestions = [...questions];
  const correctIndex = parseInt(value) - 1;
  const updatedAnswers = updatedQuestions[currentPage - 1].answers.map((ans, idx) => ({
    ...ans,
    is_correct: idx === correctIndex,
  }));

  updatedQuestions[currentPage - 1] = {
    ...updatedQuestions[currentPage - 1],
    answers: updatedAnswers,
    correctAnswer: value,
  };
  setQuestions(updatedQuestions);
};


  const handleSave = async () => {
    try {
      if (questions.some(q => !q.question || q.answers.some(a => !a))) {
        Alert.alert('Cảnh báo','Không được để trống câu hỏi hoặc đáp án');
        return;
      }
      if (questions.some(q => q.correctAnswer === '')) {
        Alert.alert('Cảnh báo','Bạn chưa chọn đáp án đúng cho câu hỏi');
        return;
      }

      console.log('Saved questions:', JSON.stringify(questions, null, 2));

      const payload = {
        title: name,
        description: des,
        grade: grade, 
        type: type,
        questions: questions.map(q => ({
          question: q.question,
          answers: q.answers.map(a => ({
            text: a.text,
            is_correct: a.is_correct
          }))
        }))
      };

      // Gửi request tạo bài tập
      const response = await axiosClient.post('/api/teacher/exercises/create/multiple-choice', payload);

      if (response.data.code === 1) {
        Alert.alert('Thành công', 'Đã tạo bài tập thành công');
        navigation.navigate('Assignments', { refresh: true });
      } else {
        Alert.alert('Thất bại', response.data.message || 'Không thể tạo bài tập');
      }
    } catch (error) {
      console.error('Lỗi tạo bài tập:', error);
      Alert.alert('Lỗi', 'Đã xảy ra lỗi khi lưu bài tập');
    }
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
          value={questions[currentPage - 1].answers[i].text}
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
            const currentQ = questions[currentPage - 1];
            if (!currentQ.question || currentQ.answers.some(a => !a.text) || currentQ.correctAnswer === '') {
              Alert.alert('Cảnh báo', 'Vui lòng nhập đầy đủ dữ liệu trước khi tiếp tục');
              return;
            }
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
