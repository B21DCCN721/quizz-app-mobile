import DefaultLayout from "../../layouts/DefaultLayout";
import { View, Text, TextInput, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For search icon

function RankScreen({ navigation }) {
  // Updated data with 8 people, random names, and scores
  const rankingData = [
    { id: "1", rank: 1, name: "Minh Anh", score: 98 },
    { id: "2", rank: 2, name: "Hoàng Nam", score: 95 },
    { id: "3", rank: 3, name: "Thanh Hương", score: 92 },
    { id: "4", rank: 4, name: "Đức Huy", score: 90 },
    { id: "5", rank: 5, name: "Ngọc Linh", score: 88 },
    { id: "6", rank: 6, name: "Bảo Trân", score: 85 },
    { id: "7", rank: 7, name: "Quốc Việt", score: 82 },
    { id: "8", rank: 8, name: "Phương Thảo", score: 80 },
  ];

  // Render each ranking item
  const renderRankItem = ({ item }) => (
    <View className="flex-row items-center bg-teal-100 rounded-lg p-3 m-2">
      <Text className="w-10 text-center text-lg font-bold">{item.rank}</Text>
      <View className="flex-1">
        <Text className="text-lg">{item.name}</Text>
      </View>
      <Text className="text-lg font-bold">{item.score}</Text>
    </View>
  );

  return (
    <DefaultLayout>
      <View className="flex-1 p-4">
        {/* Title */}
        <Text className="text-2xl font-bold text-center mb-4">
          Bảng xếp hạng học sinh lớp 2
        </Text>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-200 rounded-lg p-2 mb-4">
          <TextInput
            className="flex-1 text-lg"
            placeholder="Cần tìm bạn nào?"
            placeholderTextColor="#888"
          />
          <Ionicons name="search" size={24} color="#888" />
        </View>

        {/* Ranking List */}
        <FlatList
          data={rankingData}
          renderItem={renderRankItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </DefaultLayout>
  );
}

export default RankScreen;