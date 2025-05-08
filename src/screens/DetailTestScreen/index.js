import React, { useEffect, useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import ImgDetailTest from "../../../assets/imgs/imgdetailtest.svg";
import { CardDetail } from "../../components/Card";
import axiosClient from "../../configs/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";

function DetailTestScreen({ route, navigation }) {
  const { mode, id } = route.params || {};
  const [infoTest, setInfoTest] = useState({});
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingComment, setLoadingComment] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const inputRef = useRef(null);

  const handleStartTest = () => {
    if (mode === "1") {
      navigation.navigate("MultipleChoice", { mode, id });
    }
    if (mode === "2") {
      navigation.navigate("Counting", { mode, id });
    }
    if (mode === "3") {
      navigation.navigate("Color", { mode, id });
    }
  };

  const buildTree = (list) => {
    const map = {};
    list.forEach(c => { map[c.id] = { ...c, replies: [] }; });
    const roots = [];
    list.forEach(c => {
      if (c.parent_id && map[c.parent_id]) {
        map[c.parent_id].replies.push(map[c.id]);
      } else if (!c.parent_id) {
        roots.push(map[c.id]);
      }
    });
    return roots;
  };

  const fetchComments = async () => {
    try {
      const res = await axiosClient.get(`/api/comments/${id}`);
      if (res.status === 200) setComments(res.data.data);
    } catch (e) {
      console.error("Lỗi khi lấy comment:", e);
    }
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

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axiosClient.get(`/api/exercises/${id}?type=${mode}`);
        if (res.status === 200) setInfoTest(res.data.exercise);
      } catch (e) {
        console.error("Lỗi lấy bài test:", e);
      } finally {
        setLoading(false);
      }
    };
    load();
    fetchComments();
  }, [id]);

  const renderComments = (list, level = 0) => {
    return list.map(c => (
      <View
        key={c.id}
        className={`p-3 mb-2 border-b border-gray-300 ${level > 0 ? `pl-${level * 4}` : ''}`}
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

  if (loading) {
    return (
      <HeaderLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 20 })}
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          <View className="flex items-center">
            <ImgDetailTest width="328px" />
          </View>

          <CardDetail info={infoTest} onClickEnterExam={handleStartTest} />

          <View className="mt-5">
            <Text className="font-interBold text-xl">Mô tả bài thi:</Text>
            <Text className="font-interRegular">
              {infoTest.description ?? "Chưa có mô tả nào cho bài thi."}
            </Text>
          </View>

          <View className="mt-5 p-4 border border-blue-300 rounded-lg bg-blue-100 shadow-md">
            <Text className="text-lg font-bold mb-3">Comment</Text>
            {renderComments(tree)}

            <View className="flex-row items-center mt-3 p-2 border border-gray-400 rounded-md bg-gray-100">
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
                <Text className="text-black font">
                  {loadingComment ? "Đang gửi..." : "Gửi"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </HeaderLayout>
  );
}

export default DetailTestScreen;
