import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator, Image } from "react-native";
import { Text } from "react-native";
import HeaderLayout from "../../layouts/HeaderLayout";
import axiosClient from "../../configs/axiosClient";


function RankScreen() {
  const [loading, setLoading] = useState(true);
  const [rankings, setRankings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await axiosClient.get("/api/student/rankings");
        if (response.status === 200) {
          setRankings(response.data.rankings);
          setLoading(false);
        }
      } catch (err) {
        setError(
          err.response
            ? err.response.data
            : "Something went wrong while fetching rankings"
        );
        setLoading(false);
      }
    };

    fetchRankings();
  }, []);

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return {
          badge: require("../../../assets/imgs/goldmedal.svg"),
          color: '#FFD700',
          label: 'Hạng nhất'
        };
      case 2:
        return {
          badge: require("../../../assets/imgs/silvermedal.svg"),
          color: '#C0C0C0',
          label: 'Hạng nhì'
        };
      case 3:
        return {
          badge: require("../../../assets/imgs/bronzemedal.svg"),
          color: '#CD7F32',
          label: 'Hạng ba'
        };
      default:
        return {
          badge: null,
          color: '#9E9E9E',
          label: `Hạng ${rank}`
        };
    }
  };

  if (loading) {
    return (
      <HeaderLayout>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </HeaderLayout>
    );
  }

  if (error) {
    return (
      <HeaderLayout>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg">{error}</Text>
        </View>
      </HeaderLayout>
    );
  }

  return (
    <HeaderLayout>
      <View className="flex-1 bg-white">
        <Text className="font-interBold text-2xl text-center my-5">
          Bảng Xếp Hạng
        </Text>

        <ScrollView className="flex-1">
          {rankings.map((item, index) => (
            <View
              key={item.id}
              className={`flex-row items-center justify-between p-4 mx-4 my-2 rounded-lg ${
                index < 3 ? "bg-yellow-50" : "bg-gray-50"
              }`}
            >
              <View className="flex-row items-center flex-1">
                <View className="w-8 h-8 justify-center items-center mr-3">
                  {index < 3 ? (
                    <Image
                      source={getRankBadge(index + 1)}
                      className="w-6 h-6"
                      resizeMode="contain"
                    />
                  ) : (
                    <Text className="font-interBold text-lg text-gray-600">
                      {index + 1}
                    </Text>
                  )}
                </View>

                <View className="flex-1">
                  <Text className="font-interSemiBold text-base">
                    {item.name}
                  </Text>
                  <Text className="font-interRegular text-sm text-gray-500">
                    Lớp: {item.grade}
                  </Text>
                </View>

                <View className="items-end">
                  <Text className="font-interBold text-lg text-blue-600">
                    {item.score} điểm
                  </Text>
                  {/* <Text className="font-interRegular text-sm text-gray-500">
                    Hoàn thành: {item.completedExercises} bài
                  </Text> */}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </HeaderLayout>
  );
}

export default RankScreen;