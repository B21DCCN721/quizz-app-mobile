import HeaderLayout from "../../layouts/HeaderLayout";
import { ScrollView, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import ImgDetailTest from "../../../assets/imgs/imgdetailtest.svg";
import { CardDetail } from "../../components/Card";
import axiosClient from "../../configs/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import { useEffect, useState } from "react";

function DetailTestScreen({ route, navigation }) {
  const { mode, id } = route.params || {}; // lấy ra id bài test và thể loại
  const [infoTest, setInfoTest] = useState({});
  const [comments, setComments] = useState([]); // State lưu danh sách comment
  const [newComment, setNewComment] = useState(""); // State lưu nội dung comment mới
  const [loading, setLoading] = useState(true); // State hiển thị trạng thái loading
  const [loadingComment, setLoadingComment] = useState(false); // State khi gửi comment

  const handleStartTest = () => {
    switch (mode) {
      case "1":
        navigation.navigate("MultipleChoice", { mode: mode, id: id });
        break;
      case "2":
        break;
      case "3":
        break;
      default:
        break;
    }
  };

  // Hàm lấy danh sách comment
  const fetchComments = async () => {
    try {
      const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
      const response = await axiosClient.get(`/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      });
      if (response.status === 200) {
        setComments(response.data.data); // Lưu danh sách comment vào state
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách comment:", error);
    }
  };

  // Hàm thêm comment mới
  const addComment = async () => {
    if (!newComment.trim()) return; // Kiểm tra nếu nội dung comment rỗng

    setLoadingComment(true);
    try {
      const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
      const response = await axiosClient.post(
        "/api/comments",
        {
          user_id: 1, // Thay bằng ID người dùng hiện tại
          exercise_id: id,
          content: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Thêm comment mới vào danh sách
        setComments([response.data.data, ...comments]);
        setNewComment(""); // Xóa nội dung trong ô nhập
      }
    } catch (error) {
      console.error("Lỗi khi thêm comment:", error);
    } finally {
      setLoadingComment(false);
    }
  };

  // Gọi API lấy thông tin bài test và danh sách comment khi component được mount
  useEffect(() => {
    const getData = async () => {
      try {
        const token = await AsyncStorage.getItem("token"); // Lấy token từ AsyncStorage
        const response = await axiosClient.get(`/api/exercises/${id}?type=${mode}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Thêm token vào header
          },
        });
        if (response.status === 200) {
          setInfoTest(response.data.exercise);
          setLoading(false);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin bài test:", error);
      }
    };
  
    getData();
    fetchComments(); // Gọi API lấy comment
  }, [id]);

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
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View className="flex items-center">
          <ImgDetailTest width="328px" />
        </View>
        <CardDetail info={infoTest} onClickEnterExam={handleStartTest} />
        <View className="mt-5">
          <Text className="font-interBold text-xl">Mô tả bài thi:</Text>
          <Text className="font-interRegular">
            {infoTest.description === null ? "Chưa có mô tả nào cho bài thi." : infoTest.description}
          </Text>
        </View>
        <View className="mt-5 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
          <Text className="text-lg font-bold mb-3">Comment</Text>

          {/* Hiển thị danh sách comment */}
          {comments.map((item) => (
            <View key={item.id} className="p-3 mb-2 border-b border-gray-200">
              <Text className="font-semibold">{`User ${item.user_id}`}</Text>
              <Text className="mb-2">{item.content}</Text>
            </View>
          ))}

          {/* Form thêm comment */}
          <View className="flex-row items-center mt-3 p-2 border border-gray-400 rounded-md bg-gray-100">
            <TextInput
              className="flex-1"
              placeholder="Tham gia trò chuyện"
              value={newComment}
              onChangeText={setNewComment}
              editable={!loadingComment}
            />
            <TouchableOpacity
              className="ml-2 p-2 bg-blue-500 rounded"
              onPress={addComment}
              disabled={loadingComment}
            >
              <Text className="text-white">{loadingComment ? "Đang gửi..." : "Gửi"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </HeaderLayout>
  );
}

export default DetailTestScreen;