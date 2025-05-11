import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import HeaderLayout from '../../../layouts/HeaderLayout';
import axiosClient from '../../../configs/axiosClient';
import QuestionResultCard from '../../../components/Card/QuestionResultCard';

export default function SubmissionDetailScreenTeacher({ route, navigation }) {
  const submissionId = route.params.item.id || '';
  const [submissionData, setSubmissionData] = useState({
    exerciseTitle: '',
    submitTime: '',
    studentName: '',
    studentEmail: '',
    totalScore: '',
    questions: [],
    exerciseType: 1, // Mặc định là trắc nghiệm
  });

  useEffect(() => {
    const fetchSubmissionDetail = async () => {
      try {
        const response = await axiosClient.get(`/api/submissions/${submissionId}`);
        
        if (response.data.code === 1) {
          const data = response.data.data;
          
          setSubmissionData({
            exerciseTitle: data.submission?.exercise?.title || '',
            submitTime: formatSubmitTime(data.submission?.submitted_at),
            studentName: data.submission?.student?.name || '',
            studentEmail: data.submission?.student?.email || '',
            totalScore: data.submission?.score || '',
            questions: data.questions || [],
            exerciseType: data.submission?.exercise?.exercise_type || 1,
          });
        }
      } catch (error) {
        console.error('Failed to fetch submission detail:', error);
      }
    };
  
    fetchSubmissionDetail();
  }, [submissionId]);

  const formatSubmitTime = (timestamp) => {
    return timestamp 
      ? new Date(timestamp).toLocaleString('vi-VN', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      : 'Chưa nộp';
  };

  const renderScoreSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tổng điểm</Text>
        <Text style={styles.scoreText}>{submissionData.totalScore}</Text>
      </View>
    );
  };

  return (
    <HeaderLayout title={`Chi tiết bài nộp`} navigation={navigation}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>{submissionData.exerciseTitle}</Text>
          <Text style={styles.exerciseType}>
            {submissionData.exerciseType === 3 ? 'Bài tập màu sắc' : 'Bài tập trắc nghiệm'}
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin học sinh</Text>
          <Text style={styles.infoText}>Tên: {submissionData.studentName}</Text>
          <Text style={styles.infoText}>Email: {submissionData.studentEmail}</Text>
          <Text style={styles.infoText}>Thời gian nộp: {submissionData.submitTime}</Text>
        </View>
        
        {renderScoreSection()}
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh sách câu hỏi</Text>
          
          {submissionData.questions.length === 0 ? (
            <Text style={styles.noQuestionsText}>Không có câu hỏi</Text>
          ) : (
            submissionData.questions.map((question, index) => (
              <QuestionResultCard 
                key={question.id} 
                question={question} 
                index={index} 
              />
            ))
          )}
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseType: {
    fontSize: 14,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  infoText: {
    fontSize: 15,
    marginBottom: 6,
    color: '#444',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  noQuestionsText: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginTop: 16,
  },
});