import { useEffect, useState } from "react";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ActivityIndicator,
  Picker,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function RankScreen({ navigation }) {
  const [rankingData, setRankingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("all");

  const fetchRankingData = async (grade = "all") => {
    try {
      setLoading(true);
      const url =
        grade === "all"
          ? "http://localhost:8080/btl_mad/api/v1/student/leaderboard"
          : `http://localhost:8080/btl_mad/api/v1/student/leaderboard/grade/${grade}`;
      const response = await fetch(url);
      const data = await response.json();
      const mappedData = data.map((item, index) => ({
        id: item.id,
        name: item.name,
        grade: item.grade,
        score: item.score,
        rank: index + 1,
      }));
      setRankingData(mappedData);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRankingData();
  }, []);

  useEffect(() => {
    fetchRankingData(selectedGrade);
  }, [selectedGrade]);

  const filteredData = rankingData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderRankItem = ({ item }) => (
    <View className="flex-row items-center bg-teal-100 rounded-lg p-3 m-2">
      <Text className="w-10 text-center text-lg font-bold">{item.rank}</Text>
      <View className="flex-1">
        <Text className="text-lg">{item.name}</Text>
        <Text className="text-sm text-gray-600">Lớp: {item.grade}</Text>
      </View>
      <Text className="text-lg font-bold">{item.score}</Text>
    </View>
  );

  return (
    <DefaultLayout>
      <View className="flex-1 p-4">
        {/* Title */}
        <Text className="text-2xl font-bold text-center mb-4">
          Bảng xếp hạng học sinh
        </Text>

        {/* Filter by grade */}
        <View className="mb-4">
          <Text className="mb-1 text-lg font-medium">Chọn lớp:</Text>
          <View className="bg-gray-200 rounded-lg">
            <Picker
              selectedValue={selectedGrade}
              onValueChange={(value) => setSelectedGrade(value)}
              style={Platform.OS === "ios" ? { height: 150 } : {}}
            >
              <Picker.Item label="Tất cả lớp" value="all" />
              <Picker.Item label="Lớp 1" value="1" />
              <Picker.Item label="Lớp 2" value="2" />
              <Picker.Item label="Lớp 3" value="3" />
              <Picker.Item label="Lớp 4" value="4" />
              <Picker.Item label="Lớp 5" value="5" />
            </Picker>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-gray-200 rounded-lg p-2 mb-4">
          <TextInput
            className="flex-1 text-lg"
            placeholder="Cần tìm bạn nào?"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <Ionicons name="search" size={24} color="#888" />
        </View>

        {/* Loading or Ranking List */}
        {loading ? (
          <ActivityIndicator size="large" color="#00bcd4" />
        ) : (
          <FlatList
            data={filteredData}
            renderItem={renderRankItem}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </DefaultLayout>
  );
}

export default RankScreen;
