import HeaderLayout from "../../layouts/HeaderLayout";
import { ScrollView, Text, View, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import ImgDetailTest from "../../../assets/imgs/imgdetailtest.svg";
import { CardDetail } from "../../components/Card";
import { FontAwesome } from "@expo/vector-icons";

function DetailTestScreen({ route, navigation }) {
  const info = {
    id: 1,
    name: "abc",
    code: "ABC",
    quantity: 10,
    grade: 5,
    category: "trắc nghiệm",
  };
  const handleStartTest = () => {
    switch (mode) {
      case "tracnghiem":
        navigation.navigate("MultipleChoice", { mode: mode, id: id });
        break;
      case "tomau":
        break;
      case "demso":
        break;
      default:
        break;
    }
  }

  const { mode, id } = route.params || {}; 
  
  const comments = [
    { id: 1, name: "Học sinh A", question: "(Câu 9)", text: "Câu này làm kiểu gì vậy?", likes: 4, replies: 3, avatar: "https://previews.123rf.com/images/stockgiu/stockgiu1811/stockgiu181105171/127635455-elementary-school-student-boy-smiling-face-cartoon-vector-illustration-graphic-design.jpg" },
    { id: 2, name: "Học sinh B", question: "(Câu 1)", text: "Ai có thể giải thích giúp mình tại sao đáp án lại là D không?", likes: 5, replies: 1, avatar: "https://previews.123rf.com/images/stockgiu/stockgiu1811/stockgiu181105171/127635455-elementary-school-student-boy-smiling-face-cartoon-vector-illustration-graphic-design.jpg" },
  ];

  return (
    <HeaderLayout>
      <ScrollView className=" flex-1" showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} >
        <View className="flex items-center">
          <ImgDetailTest width="328px" />
        </View>
        <Text>Id thật bài test: {id} trò chơi {mode}</Text>
        <CardDetail info={info} onClickEnterExam={handleStartTest} />
        
        
        <View className="mt-5 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
          <Text className="text-lg font-bold mb-3">Comment</Text>
          
          {comments.map((item) => (
            <View key={item.id} className="p-3 mb-2 border-b border-gray-200">
              <View className="flex-row items-center mb-1">
                <Image source={{ uri: item.avatar }} className="w-8 h-8 rounded-full mr-2" />
                <Text className="font-semibold">{item.name} <Text className="text-gray-500">{item.question}</Text></Text>
              </View>
              <Text className="mb-2">{item.text}</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <TouchableOpacity className="mr-2">
                    <FontAwesome name="thumbs-up" size={16} color="gray" />
                  </TouchableOpacity>
                  <Text>{item.likes}</Text>
                  <TouchableOpacity className="ml-4">
                    <FontAwesome name="thumbs-down" size={16} color="gray" />
                  </TouchableOpacity>
                </View>
                <Text className="text-gray-500">{item.replies} trả lời</Text>
              </View>
            </View>
          ))}

          <View className="flex-row items-center mt-3 p-2 border border-gray-400 rounded-md bg-gray-100">
            <Image source={{ uri: "https://via.placeholder.com/40" }} className="w-8 h-8 rounded-full mr-2" />
            <TextInput className="flex-1" placeholder="Tham gia trò chuyện" editable={true} />
            <TouchableOpacity className="ml-2 p-2 bg-blue-500 rounded">
              <Text className="text-white">Gửi</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </HeaderLayout>
  );
}

export default DetailTestScreen;
