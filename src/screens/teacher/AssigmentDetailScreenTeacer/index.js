import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import HeaderLayout from '../../../layouts/HeaderLayout';
import axiosClient from '../../../configs/axiosClient';
import QuestionCard from '../../../components/Card/QuestionCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AssigntmentDetailScreenTeacher({ route, navigation }) {
  const id = route.params.assignment.id || '';
  const type = route.params.assignment.exercise_type || '';
  console.log('ID:', id);
  console.log('Type:', type);

  const [questions, setQuestions] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const inputRef = useRef(null);
  const [loadingComment, setLoadingComment] = useState(false);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      try {
        const res = await axiosClient.get(`/api/exercises/${id}?type=${type}`);
        if (res.data.code === 1) {
          console.log('Exercise detail:', res.data);
          setTitle(res.data.exercise.title);
          setDescription(res.data.exercise.description);
          if (res.data.exercise.exercise_type === 1) {
            setQuestions(
              Array(10).fill({
                question: '',
                answers: [
                  { 'text': '', 'is_correct': false },
                  { 'text': '', 'is_correct': false },
                  { 'text': '', 'is_correct': false },
                  { 'text': '', 'is_correct': false }
                ],
                correctAnswer: '',
              })
            );
            // Trắc nghiệm
            const rawQuestions = res.data.exercise.MultipleChoiceQuestions || [];

            console.log("rawQuestions", rawQuestions);

            const mappedQuestions = rawQuestions.map((q) => {
              const correctIdx = q.MultipleChoiceAnswers.findIndex(a => a.is_correct);
              return {
                question: q.question,
                answers: q.MultipleChoiceAnswers.map(a => ({
                  text: a.answer_text,
                  is_correct: a.is_correct,
                })),
                correctAnswer: correctIdx !== -1 ? (correctIdx + 1).toString() : '',
              };
            });

            setQuestions(mappedQuestions.length === 10 ? mappedQuestions : [
              ...mappedQuestions,
              ...Array(10 - mappedQuestions.length).fill({
                question: '',
                answers: Array(4).fill({ text: '', is_correct: false }),
                correctAnswer: '',
              }),
            ]);
          } else if (res.data.exercise.exercise_type === 3) {
            setQuestions(
              Array(10)
                .fill()
                .map(() => ({
                  question: "",
                  image: null,
                  correct_position: "",
                }))
            );

            // Màu sắc
            const rawQuestions = res.data.exercise.ColorQuestions || [];

            console.log("rawQuestions", rawQuestions);

            const mappedQuestions = rawQuestions.map((q) => ({
              question: q.question_text || "",
              image: q.image_url || null,
              correct_position: q.ColorAnswers[0].correct_position || "",
            }));

            // Đảm bảo có đủ 10 câu hỏi
            setQuestions(
              mappedQuestions.length === 10
                ? mappedQuestions
                : [
                  ...mappedQuestions,
                  ...Array(10 - mappedQuestions.length).fill({
                    question: "",
                    image: null,
                    correct_position: "",
                  }),
                ]
            );
          } else if (res.data.exercise.exercise_type === 2) {
            setQuestions(
              Array(10)
                .fill()
                .map(() => ({
                  question: "",
                  image: null,
                  item: { name: "", quantity: "" },
                }))
            );


            // Đếm số lượng
            const rawQuestions = res.data.exercise.CountingQuestions || [];

            console.log("rawQuestions", rawQuestions);

            const mappedQuestions = rawQuestions.map((q) => ({
              question: q.question_text || "",
              image: q.image_url || null,
              item: {
                name: q.CountingAnswers[0].object_name,
                quantity: q.CountingAnswers[0].correct_count?.toString(),
              },
            }));

            // Đảm bảo có đủ 10 câu hỏi
            setQuestions(
              mappedQuestions.length === 10
                ? mappedQuestions
                : [
                  ...mappedQuestions,
                  ...Array(10 - mappedQuestions.length).fill({
                    question: "",
                    image: null,
                    item: { name: "", quantity: "" },
                  }),
                ]
            );
          }

        } else {
          Alert.alert('Lỗi', 'Không lấy được dữ liệu bài tập');
        }
      } catch (error) {
        console.error('Lỗi khi fetch bài tập:', error);
        Alert.alert('Lỗi', 'Không thể tải bài tập');
      }
    };
    fetchComments();
    fetchExerciseDetail();
  }, [id, type]);

  console.log('Questions:', questions);
  console.log('Comments:', comments);

  const fetchComments = async () => {
    try {
      const res = await axiosClient.get(`/api/comments/${id}`);
      if (res.status === 200) setComments(res.data.data);
    } catch (e) {
      console.error("Lỗi khi lấy comment:", e);
    }
  };


  const buildTree = (list) => {
    const map = {};
    list.forEach((c) => {
      map[c.id] = { ...c, replies: [] };
    });
    const roots = [];
    list.forEach((c) => {
      if (c.parent_id && map[c.parent_id]) {
        map[c.parent_id].replies.push(map[c.id]);
      } else if (!c.parent_id) {
        roots.push(map[c.id]);
      }
    });
    return roots;
  };

  const handleSubmit = async () => {
    if (!commentInput.trim()) return;
    setLoadingComment(true);
    try {
      if (replyTo) {
        await axiosClient.post("/api/comments/reply", {
          parent_id: replyTo,
          exercise_id: id,
          content: commentInput,
        });
      } else {
        const userData = await AsyncStorage.getItem("user");
        const userId = userData ? JSON.parse(userData).id : null;
        if (!userId) throw new Error("Không tìm thấy user ID");
        await axiosClient.post("/api/comments", {
          user_id: userId,
          exercise_id: id,
          content: commentInput,
        });
      }
      setCommentInput("");
      setReplyTo(null);
      await fetchComments();
    } catch (e) {
      console.error("Lỗi khi gửi comment:", e);
    } finally {
      setLoadingComment(false);
    }
  };

  const renderComments = (list, level = 0) => {
    return list.map((c) => (
      <View
        key={c.id}
        className="p-3 mb-2 border-b border-gray-300"
        style={{ paddingLeft: level * 16 }}
      >
        <Text style={{ color: "#FF6347", fontWeight: "bold" }}>
          {c.User?.name || `User ${c.user_id}`}
        </Text>
        <Text className="mb-2">{c.content}</Text>
        <TouchableOpacity
          onPress={() => {
            setReplyTo(c.id);
            inputRef.current?.focus();
          }}
        >
          <Text className="font-interBold text-blue-600">Trả lời</Text>
        </TouchableOpacity>
        {c.replies.length > 0 && renderComments(c.replies, level + 1)}
      </View>
    ));
  };



  const tree = buildTree(comments);

  return (
    <HeaderLayout title={`Chi tiết bài tập`} navigation={navigation}>
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.title}>{description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Danh sách câu hỏi</Text>

          {questions.length === 0 ? (
            <Text style={styles.noQuestionsText}>Không có câu hỏi</Text>
          ) : (
            questions.map((question, index) => (
              <QuestionCard
                key={index}
                question={question}
                index={index}
                type={type}
              />
            ))
          )}
        </View>

        <View style={styles.section}>
          <Text className="text-lg font-bold mb-3">Comment</Text>
          {renderComments(tree)}

          <TextInput
            ref={inputRef}
            className="flex-1"
            placeholder={replyTo ? "Trả lời..." : "Thêm bình luận..."}
            value={commentInput}
            onChangeText={setCommentInput}
            editable={!loadingComment}
          />
          <TouchableOpacity
            className="ml-2 p-2 bg-blue-500 rounded"
            onPress={handleSubmit}
            disabled={loadingComment}
          >
            <Text className="text-white font text-center text-base">
              {loadingComment ? "Đang gửi..." : "Gửi"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6facd',
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