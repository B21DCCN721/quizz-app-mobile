  import React, { useState, useEffect } from 'react';
  import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    Alert,
  } from 'react-native';
  import HeaderLayout from '../../../layouts/HeaderLayout';
  import axiosClient from '../../../configs/axiosClient';

  export default function AssignmentDetailScreenTeacher({ route, navigation }) {
    const { assignment } = route.params || {};
    const assignmentCode = assignment?.id || '';

    // State for exercise info
    const [exerciseTitle, setExerciseTitle] = useState('');
    const [exerciseDescription, setExerciseDescription] = useState('');

    // State for submissions
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    // Fetch assignment submissions
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/api/submissions/exercise/" + assignmentCode);
        console.log("Submissions:", response.data.submissions);
        if (response.data.code === 1) {
          setSubmissions(response.data.submissions);
        } else {
          Alert.alert('Lỗi', response.data.message || 'Không thể tải danh sách bài nộp');
        }
      } catch (error) {
        console.error('Fetch submissions error:', error);
        Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };
  
     // Fetch exercise details
  const fetchExerciseDetails = async () => {
    try {
      const response = await axiosClient.get("/api/exercises/" + assignmentCode);
      if (response.data.code === 1) {
        setExerciseTitle(response.data.exercise.title);
        setExerciseDescription(response.data.exercise.description);
      }
    } catch (error) {
      console.error('Fetch exercise error:', error);
    }
  };

  // Initial load
  useEffect(() => {
    fetchExerciseDetails();
    fetchSubmissions();
  }, [assignmentCode]);

  const formattedSubmissions = submissions.map(sub => ({
    id: sub.id,
    name: sub.Student?.User?.name || 'Không xác định',
    submitTime: new Date(sub.submitted_at).toLocaleDateString('vi-VN') || 'Chưa nộp', 
    score: sub.score || 'Chưa chấm'
  }));

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchSubmissions();
  };

    const handleSeeAllSubmissions = () => {
      navigation.navigate('SubmissionScreen', { formattedSubmissions })
    };

    const handleDeleteExercise = async () => {
        const confirmDelete = await Alert.alert('Xoá bài tập', 'Bạn có chắc chắn muốn xoá bài tập này?', [
          { text: 'Huỷ', style: 'cancel' },
          { text: 'Xoá', onPress: async () => {
            try {
              const response = await axiosClient.delete(`/api/teacher/exercises/delete/${assignmentCode}`);  
              if (response.data.code === 1) {
                Alert.alert('Thành công', 'Bài tập đã được xoá thành công');
                navigation.navigate('Assignments', { refresh: true });
              } else {
                Alert.alert('Lỗi', response.data.message || 'Không thể xoá bài tập');
              }
            } catch (error) {
              console.error('Delete exercise error:', error);
              Alert.alert('Lỗi', 'Không thể kết nối đến máy chủ');
            }
          }},
        ]);
    }

    // Show only 5 most recent submissions
    const recentSubmissions = formattedSubmissions.slice(0, 5);

    // Calculate statistics
    const averageScore =
      formattedSubmissions.length > 0
        ? (
            submissions.reduce((acc, cur) => acc + cur.score, 0) /
            submissions.length
          ).toFixed(2)
        : 0;
    
    // Render submission item
    const renderSubmissionItem = (item) => (
      <View key={item.id} style={styles.submissionRow}>
        <View style={styles.submissionCell}>
          <Text style={styles.submissionText}>{item.name}</Text>
        </View>
        <View style={styles.submissionCell}>
          <Text style={styles.submissionText}>{item.submitTime}</Text>
        </View>
        <View style={styles.submissionCell}>
          <Text style={styles.submissionText}>{item.score}</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SubmissionDetailScreen', { item })}
          style={styles.viewButton}
          accessibilityLabel="View submission"
        >
        <Text style={styles.viewButtonText}>Chi Tiết</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <HeaderLayout>
        <View style={[styles.section, styles.overviewSection]}>
          <View style={styles.exerciseHeader}>
            <Text style={styles.exerciseTitle}>{exerciseTitle}</Text>
          </View>
          <Text style={styles.exerciseDescription}>{exerciseDescription}</Text>
        </View>
        <View style={[styles.section, styles.submittedSection]}>
          <Text style={styles.sectionTitle}>Bài đã nộp</Text>
          <View style={styles.submissionHeader}>
            <View style={styles.headerCell}><Text style={styles.headerText}>Tên</Text></View>
            <View style={styles.headerCell}><Text style={styles.headerText}>Ngày nộp</Text></View>
            <View style={styles.headerCell}><Text style={styles.headerText}>Điểm số</Text></View>
            <View style={styles.headerCell}><Text style={styles.headerText}>Thao tác</Text></View>
          </View>
          {loading ? (
            <ActivityIndicator size="large" color="#fbbf24" />
          ) : recentSubmissions.length === 0 ? (
            <Text style={styles.emptyText}>Chưa có bài nộp</Text>
          ) : (
            <ScrollView style={styles.submissionsScroll}>
              {recentSubmissions.map(renderSubmissionItem)}
              <TouchableOpacity
                onPress={handleSeeAllSubmissions}
                style={styles.seeAllButton}
                accessibilityLabel="See all submissions"
              >
                <Text style={styles.seeAllButtonText}>Xem tất cả bài nộp</Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
        <View style={[styles.section, styles.statisticsSection]}>
          <Text style={styles.sectionTitle}>Phân tích</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Số lượt làm bài:</Text>
            <Text style={styles.statValue}>{submissions.length}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Số điểm trung bình:</Text>
            <Text style={styles.statValue}>{averageScore}</Text>
          </View>
        </View>
        <View style={[styles.section, styles.actionsRow]}>
          <TouchableOpacity
            onPress={() => Alert.alert('Edit Exercise')}
            style={styles.actionButtonMain}
            accessibilityLabel="Chỉnh sửa"
          >
            <Text style={styles.actionButtonTextMain}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteExercise}
            style={styles.actionButtonSecondary}
            accessibilityLabel="Delete Exercise"
          >
            <Text style={styles.actionButtonTextSecondary}>Xoá</Text>
          </TouchableOpacity>
        </View>
      </HeaderLayout>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    section: {
      backgroundColor: '#fff7ed', // light orange background
      borderRadius: 12,
      padding: 16,
      marginBottom: 24,
      shadowColor: '#fbbf24', // warm shadow color
      shadowOpacity: 0.3,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 5,
    },
    overviewSection: {
      backgroundColor: '#fffde7', // lighter yellow for overview
    },
    statisticsSection: {
      backgroundColor: '#fff3e0', // lighter orange for statistics
    },
    submittedSection: {
      maxHeight: 300,
    },
    exerciseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    exerciseTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      flex: 1,
      color: '#b45309', // dark orange text
    },
    exerciseTitleInput: {
      flex: 1,
      fontSize: 22,
      fontWeight: 'bold',
      borderColor: '#fbbf24',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 6,
      color: '#b45309',
      backgroundColor: '#fffde7',
    },
    editButton: {
      backgroundColor: '#f59e0b',
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 8,
    },
    editButtonText: {
      color: '#fff',
      fontWeight: '700',
    },
    exerciseDescription: {
      color: '#92400e',
      fontSize: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#b45309',
      marginBottom: 12,
    },
    submissionsScroll: {
      maxHeight: 250,
    },
    submissionHeader: {
      flexDirection: 'row',
      backgroundColor: '#ffe8b3',
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      alignItems: 'center',
      shadowColor: '#fbbf24',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    headerCell: {
      flex: 1,
      alignItems: 'center',
    },  
    headerText: {
      fontSize: 14,
      fontWeight: '700',
      color: '#92400e',
    },

    submissionRow: {
      flexDirection: 'row',
      backgroundColor: '#fff8dc',
      borderRadius: 10,
      padding: 12,
      marginBottom: 10,
      alignItems: 'center',
      shadowColor: '#fbbf24',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },
    submissionCell: {
      flex: 1,
      alignItems: 'center',
    },  
    submissionText: {
      fontSize: 14,
      color: '#92400e',
    },
    viewButton: {
      backgroundColor: '#f59e0b',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
    },
    viewButtonText: {
      color: '#fff',
      fontWeight: '700',
    },
    seeAllButton: {
      marginTop: 8,
      alignSelf: 'center',
    },
    seeAllButtonText: {
      color: '#b45309',
      fontWeight: '700',
      textDecorationLine: 'underline',
    },
    statRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    statLabel: {
      fontWeight: '700',
      color: '#b45309',
      fontSize: 16,
    },
    statValue: {
      fontSize: 16,
      color: '#92400e',
    },
    chartPlaceholder: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    chartPlaceholderText: {
      color: '#b45309',
      fontStyle: 'italic',
    },
    actionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    actionButtonMain: {
      backgroundColor: '#f59e0b',
      paddingHorizontal: 12,
      paddingVertical: 12,
      borderRadius: 10,
    },
    actionButtonTextMain: {
      color: '#fff',
      fontWeight: '700',
    },
    actionButtonSecondary: {
      backgroundColor: '#b45309',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 10,
    },
    actionButtonTextSecondary: {
      color: '#fff',
      fontWeight: '700',
    },
  });
